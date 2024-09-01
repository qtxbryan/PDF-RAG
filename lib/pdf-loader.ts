import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { env } from './config';


export async function getChunkedDocsFromPDF() {
    try {
        const loader = new PDFLoader(env.PDF_PATH);
        const docs = await loader.load();

        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
        });

        const chunkedDocs = await textSplitter.splitDocuments(docs);
        
        return chunkedDocs
    } catch (error) {
        console.log(error);
        throw new Error("PDF docs chunking failed!");
    }
}