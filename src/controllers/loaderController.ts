import { Request, Response, NextFunction } from "express";
import loaderService from "../services/loaderService";
import { apiResponse } from "ApiResponse";

const loadWeb = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { url, selector } = req.body;
        const response = await loaderService.loadWeb(url, selector);

        res.status(200).json(
            apiResponse({
                message: "Load web successful",
                data: response,
            }),
        );
    } catch(error){
        next(error);
    }
};

const loadUrlPDF = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { url } = req.body;
        const response = await loaderService.loadUrlPDF(url);

        res.status(200).json(
            apiResponse({
                message: "Load PDF successful",
                data: response,
            }),
        );
    } catch(error){
        next(error);
    }
};

export default { loadWeb, loadUrlPDF };
