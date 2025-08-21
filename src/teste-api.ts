import { GoogleGenerativeAI } from "@google/generative-ai";
import PDFParser from "pdf2json";

// ------------------- VOCÊ PRECISA EDITAR AQUI -------------------
// 1. Cole sua Chave de API
const API_KEY = "AIzaSyDKkwdA-AWwtPOWBd187SkyG9KidcNK1A0";

// 2. Coloque o nome EXATO do seu arquivo PDF
const PDF_FILE_PATH = "./data/Ata da 25 Reunio Ordinria - 22-07-2025.pdf"; 
// --------------------------------------------------------------------


async function run() {
  try {
    // --- Parte 1: Ler e extrair o texto do PDF (continua igual) ---
    console.log(`Lendo o arquivo: ${PDF_FILE_PATH}...`);
    
    const textoDoPdf = await new Promise<string>((resolve, reject) => {
      const pdfParser = new PDFParser();
      pdfParser.on("pdfParser_dataReady", _ => {
        resolve(pdfParser.getRawTextContent());
      });
      pdfParser.on("pdfParser_dataError", errData => {
        reject(errData.parserError);
      });
      pdfParser.loadPDF(PDF_FILE_PATH);
    });

    console.log("Texto extraído com sucesso!");

    // --- Parte 2: Chamar a API do Gemini (MÉTODO ATUALIZADO) ---
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Separamos as instruções do texto bruto
    const promptDeInstrucao = `
      Você é um assistente especializado em analisar documentos legislativos.
      O texto a seguir é a ata de uma sessão da câmara de vereadores.

      Analise o texto e, para CADA projeto que foi votado, extraia as seguintes informações:
      1. O nome ou número do projeto.
      2. O resultado da votação (ex: "Aprovado por Unanimidade", "Rejeitado", etc.).
      3. Uma lista detalhada de como cada vereador presente na sessão votou (Sim, Não, Abstenção, Ausente).

      Retorne sua resposta APENAS em formato de um array JSON. Cada objeto no array deve representar uma votação e seguir esta estrutura:
      {
        "id_projeto": "string",
        "resultado": "string",
        "votos": [
          { "vereador": "string", "voto": "string" }
        ]
      }

      Aqui está o texto para análise:
    `;

    console.log("Enviando texto para análise do Gemini... Isso pode levar um momento.");
    
    // Enviamos as instruções e o texto como partes separadas
    const result = await model.generateContent([
      promptDeInstrucao,
      textoDoPdf
    ]);

    const response = result.response;
    const text = response.text();
    
    // --- Parte 3: Mostrar o resultado (continua igual) ---
    console.log("\n--- Resposta do Gemini (JSON) ---");
    console.log(text);
    console.log("---------------------------------");

  } catch (error) {
    console.error("Ocorreu um erro:", error);
  }
}

run();