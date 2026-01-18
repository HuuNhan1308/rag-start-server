import multer from "multer";
import path from "path";
import { ApiError } from "ApiError";

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Store in temp directory
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        // Generate unique filename
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    },
});

// File filter to only accept PDFs
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype === "application/pdf") {
        cb(null, true);
    } else {
        cb(new ApiError(400, "Only PDF files are allowed"));
    }
};

// Create multer upload instance
export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
    },
});
