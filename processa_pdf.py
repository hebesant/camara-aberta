import os
import subprocess
import json
import requests
import re
import shutil
import hashlib
from PIL import Image
import pytesseract
from bs4 import BeautifulSoup
import google.generativeai as genai

# --- CONFIGURAÇÃO ---
# Coloque sua chave de API do Google AI Studio aqui
genai.configure(api_key="CHAVE_API")

# --- CONSTANTES ---
URL = "https://www.camarasalto.sp.gov.br/sessoes/atas-das-sessoes/category/337-sessoes-ordinarias?start=20"
DOWNLOAD_FOLDER = "./downloads_pdf"
ORGANIZED_DATA_FOLDER = "./atas_organizadas"
TEMP_IMG_FOLDER = "./temp_images"

# ---------- FUNÇÕES UTILITÁRIAS ----------

def gerar_id_unico(caminho_pdf):
    """Gera um hash SHA256 para o arquivo PDF, servindo como ID único."""
    sha256_hash = hashlib.sha256()
    with open(caminho_pdf, "rb") as f:
        # Lê o arquivo em pedaços para não sobrecarregar a memória
        for byte_block in iter(lambda: f.read(4096), b""):
            sha256_hash.update(byte_block)
    return sha256_hash.hexdigest()

def baixar_atas():
    """Baixa todos os arquivos PDF da URL para uma pasta local."""
    os.makedirs(DOWNLOAD_FOLDER, exist_ok=True)
    try:
        res = requests.get(URL)
        res.raise_for_status()
    except requests.exceptions.RequestException as e:
        print(f"❌ Erro ao acessar a URL: {e}")
        return []

    soup = BeautifulSoup(res.content, "html.parser")
    pdf_links = []
    for a in soup.find_all("a", href=True):
        href = a["href"]
        if href.endswith(".pdf"):
            if href.startswith("/"):
                href = "https://www.camarasalto.sp.gov.br" + href
            pdf_links.append(href)

    arquivos = []
    for link in pdf_links:
        nome = os.path.join(DOWNLOAD_FOLDER, link.split("/")[-1])
        if not os.path.exists(nome):
            print(f"📥 Baixando {link}")
            try:
                with requests.get(link, stream=True, timeout=60) as r:
                    r.raise_for_status()
                    with open(nome, "wb") as f:
                        for chunk in r.iter_content(chunk_size=8192):
                            f.write(chunk)
            except requests.exceptions.RequestException as e:
                print(f"⚠ Erro ao baixar {link}: {e}")
                continue
        arquivos.append(nome)
    return arquivos

def extrair_texto_pdf_com_ocr(caminho_pdf):
    """Converte um PDF em imagens e extrai o texto usando Tesseract OCR."""
    os.makedirs(TEMP_IMG_FOLDER, exist_ok=True)
    # Limpa a pasta de imagens temporárias antes de começar
    for item in os.listdir(TEMP_IMG_FOLDER):
        os.remove(os.path.join(TEMP_IMG_FOLDER, item))
    
    try:
        subprocess.run(
            ["pdftoppm", "-png", caminho_pdf, os.path.join(TEMP_IMG_FOLDER, "pagina")], 
            check=True, capture_output=True
        )
    except (subprocess.CalledProcessError, FileNotFoundError) as e:
        print(f"❌ Erro ao executar 'pdftoppm'. Verifique se o Poppler está instalado e no PATH do sistema.")
        print(e)
        return ""

    imagens = sorted([f for f in os.listdir(TEMP_IMG_FOLDER) if f.startswith("pagina") and f.endswith(".png")])
    textos = []
    for img_nome in imagens:
        caminho_img = os.path.join(TEMP_IMG_FOLDER, img_nome)
        try:
            texto = pytesseract.image_to_string(Image.open(caminho_img), lang="por")
            textos.append(texto)
        except Exception as e:
            print(f"⚠ Erro no Tesseract ao processar a imagem {img_nome}: {e}")
        finally:
            os.remove(caminho_img)
    return "\n".join(textos)

def analisar_ata_com_gemini(texto, ata_id):
    """Envia o texto extraído e o ID da ata para a IA Gemini para estruturação em JSON."""
    model = genai.GenerativeModel("gemini-1.5-flash")
    
    # PROMPT OTIMIZADO - COMBINA O MELHOR DOS DOIS MUNDOS
    prompt = f"""
    Você é um assistente especialista em analisar documentos legislativos, como Atas da Câmara de Vereadores.
    O ID único para esta ata é "{ata_id}".

    Sua tarefa é analisar o texto a seguir e estruturar as informações em um único objeto JSON.
    O objeto deve ter duas chaves principais: "metadata_ata" e "votacoes".

    1.  Na chave "metadata_ata", extraia as seguintes informações sobre a sessão:
        - "ata_id": "{ata_id}" (use o ID fornecido)
        - "titulo_sessao": O título completo da sessão (ex: "ATA DA TRIGÉSIMA SÉTIMA SESSÃO ORDINÁRIA...")
        - "data_sessao": A data da sessão no formato "AAAA-MM-DD".
        - "numero_sessao": O número da sessão (extraia do título, como um inteiro).
        - "tipo_sessao": O tipo da sessão, como "Ordinária" ou "Extraordinária" (extraia do título).

    2.  Na chave "votacoes", crie uma lista de objetos. Para CADA evento de votação encontrado, adicione um objeto com os seguintes campos:
        - "objeto_da_votacao": Uma breve descrição do que foi votado (ex: "Aprovação do Projeto de Lei X", "Pedido de urgência").
        - "resumo": Um resumo claro, objetivo e de fácil entendimento para o público geral sobre o que foi votado.
        - "resultado": O resultado da votação (ex: "Aprovado por unanimidade", "Rejeitado", "Aprovado por 10 votos a 1").
        - "votos": Uma lista detalhada de como cada vereador votou.
          IMPORTANTE: Se um vereador é listado como participante da votação, mas seu voto não é explicitamente declarado como 'contrário' ou 'ausente', você deve inferir que o voto dele foi 'Sim'.

    Se não encontrar nenhuma votação, a lista "votacoes" deve ser um array JSON vazio: [].
    O resultado final deve ser APENAS um único objeto JSON, contido dentro de um bloco de código ```json.

    Texto da ata para análise:
    {texto}
    """
    try:
        resp = model.generate_content(prompt)
        # Regex aprimorado para ser mais robusto
        match = re.search(r'```(?:json)?\s*([\s\S]*?)\s*```', resp.text)
        if match:
            return match.group(1).strip()
        return resp.text.strip() # Fallback
    except Exception as e:
        print(f"❌ Erro na chamada da API Gemini: {e}")
        return "{}"

def salvar_json_individual(dados_str, caminho_final):
    """Tenta analisar e salvar uma string JSON em um arquivo específico."""
    try:
        dados_json = json.loads(dados_str)
        with open(caminho_final, "w", encoding="utf-8") as f:
            json.dump(dados_json, f, ensure_ascii=False, indent=2)
        print(f"✅ JSON salvo em {caminho_final}")
    except json.JSONDecodeError:
        print(f"⚠ Erro: A IA retornou um JSON inválido. Pulando salvamento do JSON.")
        # Salva a resposta inválida para facilitar a depuração
        with open(caminho_final + ".invalid.txt", "w", encoding="utf-8") as f:
            f.write(dados_str)

# ---------- EXECUÇÃO PRINCIPAL ----------
if __name__ == "__main__":
    os.makedirs(ORGANIZED_DATA_FOLDER, exist_ok=True)
    arquivos_pdf_baixados = baixar_atas()

    if not arquivos_pdf_baixados:
        print("Nenhuma ata encontrada para processar. Encerrando.")
    else:
        for pdf_path in arquivos_pdf_baixados:
            print("-" * 50)
            print(f"📂 Processando {os.path.basename(pdf_path)}")

            # 1. Gerar o ID único para a ata
            ata_id = gerar_id_unico(pdf_path)
            print(f"🔑 ID único gerado: {ata_id}")

            # 2. Criar a pasta dedicada para esta ata usando o ID
            pasta_da_ata = os.path.join(ORGANIZED_DATA_FOLDER, ata_id)
            os.makedirs(pasta_da_ata, exist_ok=True)

            # 3. Copiar o PDF para a sua nova pasta
            caminho_pdf_final = os.path.join(pasta_da_ata, "ata.pdf")
            if not os.path.exists(caminho_pdf_final):
                shutil.copy(pdf_path, caminho_pdf_final)

            # 4. Extrair o texto e salvá-lo em um arquivo .txt
            texto_completo = extrair_texto_pdf_com_ocr(pdf_path)
            if texto_completo:
                caminho_txt_final = os.path.join(pasta_da_ata, "texto_completo.txt")
                with open(caminho_txt_final, "w", encoding="utf-8") as f:
                    f.write(texto_completo)
                print(f"📄 Texto extraído e salvo.")

                # 5. Analisar com a IA, passando o ID
                resultado_json_str = analisar_ata_com_gemini(texto_completo, ata_id)

                # 6. Salvar o resultado JSON em um arquivo individual
                caminho_json_final = os.path.join(pasta_da_ata, "dados_completos.json")
                salvar_json_individual(resultado_json_str, caminho_json_final)
            else:
                print("❌ Não foi possível extrair texto do PDF. Pulando para o próximo.")
        print("-" * 50)
        print("🎉 Processo finalizado!")