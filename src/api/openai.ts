import {Configuration, OpenAIApi} from "openai";
import {addTrainingMessages} from "./inContextTraining";

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
            messages: addTrainingMessages(inputText),
        });

        return result?.data
    } catch (err) {
        console.error("There is some error :", err);
    }
};
