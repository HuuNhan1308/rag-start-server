import { Request, Response, NextFunction } from "express";
import chatService from "../services/chatService";
import { apiResponse } from "ApiResponse";

const chat = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { message } = req.body;
        const response = await chatService.chat(message);

        res.status(200).json(
            apiResponse({
                message: "Chat successful",
                data: response,
            }),
        );
    } catch(error){
        next(error);
    }
}

export default { chat };