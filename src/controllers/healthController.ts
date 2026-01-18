import { Request, Response } from "express";
import { apiResponse } from "ApiResponse";

const healthCheck = async (req: Request, res: Response) => {
    res.status(200).json(
        apiResponse({
            message: "Server is running",
            data: {
                status: "ok",
                timestamp: new Date().toISOString(),
                uptime: process.uptime(),
            },
        }),
    );
};

export default { healthCheck };
