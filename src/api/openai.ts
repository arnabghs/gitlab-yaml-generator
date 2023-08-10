import {Configuration, OpenAIApi} from "openai";

// Controller function to handle chat conversation
export const generateResponse = async (inputText: string) => {
    const openai = new OpenAIApi(new Configuration({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    }));

    try {
        const modelId = "gpt-3.5-turbo";

        const result = await openai.createChatCompletion({
            model: modelId,
            temperature: 0,
            messages: [
                {
                    "role": "system",
                    "content": "You are a helpful assistant."
                },
                {
                    "role": "user",
                    "content": inputText
                }
            ],
        });

        return result?.data
    } catch (err) {
        console.error(err);
    }
};
