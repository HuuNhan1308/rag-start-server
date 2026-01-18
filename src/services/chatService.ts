import { googleApiKey, vectorStoreConfig } from "../config/config";
import { GoogleGenAI } from "@google/genai";
import axios from "axios";

const chat = async (message: string): Promise<any> => {
    const ai = new GoogleGenAI({ apiKey: googleApiKey.apiKey });

    const embeddingData = await ai.models.embedContent({
        model: "gemini-embedding-001",
        contents: [message]
    })

    const searchResponse = await axios.post(`${vectorStoreConfig.url}/search`, {
        vector: embeddingData?.embeddings[0].values,
        k: 5
    })

    console.log(searchResponse.data);

    const { results, distances, indices } = searchResponse.data;

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        config: {
            systemInstruction: `
            Bạn là một trợ lý hữu ích có thể trả lời câu hỏi dựa trên ngữ cảnh được cung cấp.
            Dựa trên ngữ cảnh sau: ${results}

            Yêu cầu:
            - Trả lời bằng tiếng Việt
            - Chỉ trả về câu trả lời, không có văn bản khác
            - Không bao gồm bất kỳ văn bản thừa nào trong phản hồi của bạn (như "Dựa trên ngữ cảnh dưới đây:", "Câu trả lời là...", "Theo thông tin được cung cấp...")
            - Nếu không có thông tin trong ngữ cảnh, hãy trả lời một cách lịch sự rằng bạn không biết
            - Chỉ trả về câu trả lời, không bao gồm bất kỳ văn bản khác.
        `,
        },
        contents: `${message}`
    })

    return response.text;
}

export default { chat };