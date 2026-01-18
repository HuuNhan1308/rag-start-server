import { Request, Response, NextFunction } from "express";
import knowledgeService from "../services/knowledgeService";
import { apiResponse } from "ApiResponse";
import { ApiError } from "ApiError";
import * as fs from "fs";

const storeWebDocument = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { url, selector } = req.body;
        const response = await knowledgeService.storeWebDocument(url, selector);

        res.status(200).json(
            apiResponse({
                message: "Store web document successful",
                data: response,
            }),
        );
    } catch(error){
        next(error);
    }
}

const storePDFDocument = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { url } = req.body;
        const response = await knowledgeService.storePDFDocument(url);

        res.status(200).json(
            apiResponse({
                message: "Store PDF document successful",
                data: response,
            }),
        );
    } catch(error){
        next(error);
    }
};

const storeUploadedPDFDocument = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.file) {
            throw new ApiError(400, "No file uploaded");
        }

        console.log(req.file);

        const filePath = req.file.path;

        try {
            const response = await knowledgeService.storeUploadedPDFDocument(filePath);

            res.status(200).json(
                apiResponse({
                    message: "Store uploaded PDF document successful",
                    data: response,
                }),
            );
        } finally {
            // Clean up uploaded file after processing
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }
    } catch(error){
        // Clean up file if there's an error
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        next(error);
    }
};

export default { storeWebDocument, storePDFDocument, storeUploadedPDFDocument };
