import { googleApiKey, vectorStoreConfig } from "../config/config";
import { GoogleGenAI } from "@google/genai";
import axios from "axios";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { SelectorType } from "cheerio";
import loaderService from "./loaderService";

const storeWebDocument = async (url: string, selector?: SelectorType) => {
    const ai = new GoogleGenAI({ apiKey: googleApiKey.apiKey });

    const data = await loaderService.loadWeb(url, selector);

    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
    });

    const chunks = await splitter.splitDocuments(data);

    const texts = chunks.map((chunk) => chunk.pageContent);

    const embeddingData = await ai.models.embedContent({
        model: "gemini-embedding-001",
        contents: texts
    })

    const vectors = embeddingData?.embeddings.map((embedding) => embedding.values);

    const response = await axios.post(`${vectorStoreConfig.url}/add_vector`, {
        texts: texts,
        vectors: vectors
    }, {
        headers: {
            'X-API-Key': vectorStoreConfig.apiKey
        }
    })

    return { texts: texts };
}

const storePDFDocument = async (url: string) => {
    const docs = await loaderService.loadUrlPDF(url);

    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
    })

    const chunks = await splitter.splitDocuments(docs);

    const texts = chunks.map((chunk) => chunk.pageContent);

    const ai = new GoogleGenAI({ apiKey: googleApiKey.apiKey });

    const embeddingData = await ai.models.embedContent({
        model: "gemini-embedding-001",
        contents: texts
    })

    const vectors = embeddingData?.embeddings.map((embedding) => embedding.values);

    const response = await axios.post(`${vectorStoreConfig.url}/add_vector`, {
        texts: texts,
        vectors: vectors
    }, {
        headers: {
            'X-API-Key': vectorStoreConfig.apiKey
        }
    })

    return { texts: texts };
}

const storeUploadedPDFDocument = async (filePath: string) => {
    const docs = await loaderService.loadFilePDF(filePath);

    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
    })

    const chunks = await splitter.splitDocuments(docs);

    const texts = chunks.map((chunk) => chunk.pageContent);

    const ai = new GoogleGenAI({ apiKey: googleApiKey.apiKey });

    const embeddingData = await ai.models.embedContent({
        model: "gemini-embedding-001",
        contents: texts
    })

    const vectors = embeddingData?.embeddings.map((embedding) => embedding.values);

    const response = await axios.post(`${vectorStoreConfig.url}/add_vector`, {
        texts: texts,
        vectors: vectors
    }, {
        headers: {
            'X-API-Key': vectorStoreConfig.apiKey
        }
    })

    return { texts: texts };
}

export default { storeWebDocument, storePDFDocument, storeUploadedPDFDocument };
