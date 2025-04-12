import fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

const MODEL = "gemini-2.0-flash";

const ai = new GoogleGenerativeAI(apiKey);

const aiService = {
    prompt: async (message) => {
        return await parsePrompt(message);
    },
    longContext: async (prompt) => {
        const formattedData = await getFormattedData();
        
        const configPrompt = `Você é um assistente de inteligência artificial especializado em atendimento para uma loja online, especificamente um *outlet de Hot Wheels*. Sua única fonte de verdade são os dados que serão fornecidos a seguir, extraídos diretamente do banco de dados da loja.

        Ignore qualquer contexto externo, histórico de conversa, ou conhecimento geral que não esteja explicitamente presente nos dados a seguir. Foque apenas nas informações disponíveis entre as marcações [INÍCIO DOS DADOS DO BANCO] e [FIM DOS DADOS DO BANCO].

        Seu objetivo é ajudar os clientes da loja a:
        - Encontrar produtos (modelos de Hot Wheels) com base em descrições, categorias, coleções ou nomes.
        - Informar preços, disponibilidade e outros detalhes específicos dos produtos, se estiverem disponíveis nos dados.
        - Esclarecer dúvidas com base **apenas** no que está contido nos dados fornecidos.

        Aqui estão os dados relevantes extraídos do banco de dados:

        [INÍCIO DOS DADOS DO BANCO]
        ${formattedData}
        [FIM DOS DADOS DO BANCO]

        Agora, com base nesses dados, responda de forma clara, útil e objetiva a qualquer pergunta relacionada à loja ou aos produtos disponíveis.`;

        const chatBody = {
            contents: [
              {
                role: 'user',
                parts: [
                  { text: configPrompt }
                ]
              },
              {
                role: 'user',
                parts: [
                  { text: prompt }
                ]
              }
            ]
          };

        try {
            const result = await model.generateContent(chatBody);
            const response = result.response;
            const text = response.text();

            if (response.usageMetadata) {
                console.log("Uso de Tokens:");
                console.log(
                    ` - Prompt: ${response.usageMetadata.promptTokenCount}`
                );
                console.log(
                    ` - Total: ${response.usageMetadata.totalTokenCount}`
                );
            }

            return text;
        } catch (error) {
            console.error("\n--- Erro ao chamar a API Gemini ---");
            console.error(error);
            if (
                error.message.includes("400 Bad Request") ||
                error.message.includes("Quota")
            ) {
                console.error(
                    "Verifique se o arquivo não é muito grande ou se você atingiu os limites de uso da API."
                );
            }
            if (error.message.includes("API key not valid")) {
                console.error(
                    "Verifique se sua GEMINI_API_KEY está correta e ativa."
                );
            }
            console.error("-----------------------------------\n");
            return 'Erro ao chamar a API Gemini';
        }
    },
};

async function getFormattedData() {
    const products = fs.readFileSync('./src/context/products.txt', 'utf8');
    const orders = fs.readFileSync('./src/context/orders.txt', 'utf8');
    const users = fs.readFileSync('./src/context/users.txt', 'utf8');

    const formattedData = `
    === PRODUTOS ===
    ${products}

    === PEDIDOS ===
    ${orders}

    === USUÁRIOS ===
    ${users}`;

    return formattedData;
}

async function parsePrompt(prompt) {
    const response = await ai.generateContent({
        model: MODEL,
        contents: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: prompt },
        ],
    });
    return response;
}

const instructions = `Você é um assistente de consulta de banco de dados. Sua tarefa é responder perguntas com base EXCLUSIVAMENTE nos dados fornecidos a seguir, que foram extraídos de um banco de dados de produtos. Seja preciso e refira-se apenas às informações presentes no contexto.`;

const model = ai.getGenerativeModel({
    model: MODEL,
    systemInstruction: instructions,

});

export default aiService;
