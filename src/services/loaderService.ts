import "cheerio";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { SelectorType } from "cheerio";
import axios from "axios";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { ApiError } from "ApiError";

const loadWeb = async (url: string, selector?: SelectorType) => {
    const cheerioLoader = new CheerioWebBaseLoader(
        url,
        selector ? { selector: selector } : undefined
    );
    const docs = await cheerioLoader.load();
    return docs;
}

const loadUrlPDF = async (url: string, splitPages: boolean = false) => {
    // Kiểm tra xem filePath là URL hay file path local
    const isUrl = url.startsWith('http://') || url.startsWith('https://');

    if (isUrl) {
        // Nếu là URL, download về file tạm thời
        const response = await axios.get(url, {
            responseType: 'arraybuffer',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });

        // Tạo file tạm thời
        const tempDir = os.tmpdir();
        const tempFileName = `pdf_${Date.now()}_${Math.random().toString(36).substring(7)}.pdf`;
        const tempFilePath = path.join(tempDir, tempFileName);

        // Lưu PDF vào file tạm
        fs.writeFileSync(tempFilePath, response.data);

        try {
            // Load PDF từ file tạm
            const pdfLoader = new PDFLoader(tempFilePath, { splitPages });
            const docs = await pdfLoader.load();

            // Thêm URL gốc vào metadata
            docs.forEach(doc => {
                doc.metadata.sourceUrl = url;
            });

            return docs;
        } finally {
            // Xóa file tạm sau khi load xong
            if (fs.existsSync(tempFilePath)) {
                fs.unlinkSync(tempFilePath);
            }
        }
    }
    else {
        throw new ApiError(400, "URL is not valid or not found");
    }
}

const loadFilePDF = async (filePath: string, splitPages: boolean = false) => {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
        throw new ApiError(404, "File not found");
    }

    // Load PDF from local file
    const pdfLoader = new PDFLoader(filePath, { splitPages });
    const docs = await pdfLoader.load();

    // Add file path to metadata
    docs.forEach(doc => {
        doc.metadata.sourceFile = filePath;
    });

    return docs;
}

export default { loadWeb, loadUrlPDF, loadFilePDF };
