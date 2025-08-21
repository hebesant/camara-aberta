import os
import subprocess
from PIL import Image
import pytesseract
import sys
import json
import google.generativeai as genai

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

PDF_FILE_PATH = "./data/Ata da 25 Reunio Ordinria - 22-07-2025.pdf"
OUTPUT_JSON_PATH = "./src/dados_votacoes.json"
TEMP_IMG_FOLDER = "./temp_images"

def extrair_texto_pdf_com_ocr(caminho_pdf, pasta_temp=TEMP_IMG_FOLDER):
    if not os.path.exists(pasta_temp):
        os.makedirs(pasta_temp)

    # Converter PDF em imagens PNG
    subprocess.run(['pdftoppm', '-png', caminho_pdf, os.path.join(pasta_temp, 'pagina')], check=True)

    imagens = sorted([f for f in os.listdir(pasta_temp) if f.startswith('pagina') and f.endswith('.png')])
    textos_paginas = []

    for img_nome in imagens:
        caminho_img = os.path.join(pasta_temp, img_nome)
        imagem = Image.open(caminho_img)
        texto = pytesseract.image_to_string(imagem, lang='por')
        textos_paginas.append(texto)

    texto_completo = "\n".join(textos_paginas)
    return texto_completo

def analisar_ata_com_gemini(texto_da_ata):
    model = genai.GenerativeModel("gemini-1.5-flash")

    prompt = f"""
Você é um assistente especializado em analisar documentos legislativos.
O texto a seguir é a ata de uma sessão da câmara de vereadores.

Analise o texto e, para CADA evento de votação, extraia as seguintes informações:

1.  'data_votacao': A data da ata.
2.  `objeto_da_votacao`: Uma breve descrição do que foi votado (ex: "Aprovação do Projeto de Lei", "Pedido de urgência referente ao Ofício X").
3.  `projetos_relacionados`: Uma lista contendo o ID de TODOS os Projetos de Lei (PLs), Projetos de Decreto Legislativo (PDLs) ou similares que são mencionados em relação a essa votação.
4.  'resumo': Um pequeno resumo claro, objetivo e de fácil entendimento geral sobre o assunto a ser votado.
5.  `resultado`: O resultado da votação (ex: "Aprovado", "Rejeitado").
6.  `votos`: Uma lista detalhada de como cada vereador votou. IMPORTANTE: Se um vereador é listado como participante da votação, mas seu voto não é explicitamente declarado como 'contrário' ou 'ausente', você deve inferir que o voto dele foi 'Sim'.

Retorne sua resposta APENAS em formato de um array JSON. A estrutura deve ser:
{{
  "data_votacao": "YYYY-MM-DD",
  "objeto_da_votacao": "string",
  "projetos_relacionados": ["string"],
  "resumo": "string",
  "resultado": "string",
  "votos": [
    {{ "vereador": "string", "voto": "string" }}
  ]
}}

Aqui está o texto para análise:
{texto_da_ata}
    """

    print("Enviando texto para análise do Gemini...", file=sys.stderr)
    response = model.generate_content(prompt)
    cleaned_text = response.text.replace("```json", "").replace("```", "").strip()
    return cleaned_text

def salvar_json_em_arquivo(dados_json, caminho_arquivo):
    try:
        print(f"Salvando JSON no arquivo: {caminho_arquivo}...", file=sys.stderr)
        dados = json.loads(dados_json)
        with open(caminho_arquivo, 'w', encoding='utf-8') as f:
            json.dump(dados, f, ensure_ascii=False, indent=2)
        print("Arquivo JSON salvo com sucesso!", file=sys.stderr)
    except Exception as e:
        print(f"Erro ao salvar o arquivo JSON: {e}", file=sys.stderr)

def salvar_texto_em_arquivo(texto, caminho_arquivo):
    try:
        print(f"Salvando texto extraído no arquivo: {caminho_arquivo}...", file=sys.stderr)
        with open(caminho_arquivo, 'w', encoding='utf-8') as f:
            f.write(texto)
        print("Arquivo de texto salvo com sucesso!", file=sys.stderr)
    except Exception as e:
        print(f"Erro ao salvar o arquivo de texto: {e}", file=sys.stderr)


if __name__ == "__main__":
    texto_extraido = extrair_texto_pdf_com_ocr(PDF_FILE_PATH)
    if texto_extraido:
        # Salva o texto extraído para comparação
        salvar_texto_em_arquivo(texto_extraido, "./src/texto_extraido_ocr.txt")

        resultado_json_texto = analisar_ata_com_gemini(texto_extraido)
        if resultado_json_texto:
            salvar_json_em_arquivo(resultado_json_texto, OUTPUT_JSON_PATH)
