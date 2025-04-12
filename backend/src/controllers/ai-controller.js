import aiService from "../service/ai-service.js";

async function defaultPrompt(req, res) {
    const { prompt } = req.body;
    const response = await aiService.prompt(prompt);

    if (response === 'Erro ao chamar a API Gemini') {
        return res.status(500).json({ error: 'Erro ao chamar a API Gemini' });
    }

    return res.status(200).json(response);
}

async function longContext(req, res) {  
    const { prompt } = req.body;
    const response = await aiService.longContext(prompt);

    if (response === 'Erro ao chamar a API Gemini') {
        return res.status(500).json({ error: 'Erro ao chamar a API Gemini' });
    }

    return res.status(200).json(response);
}

export default {
    defaultPrompt,
    longContext,
}