import { getChunkedDocsFromPDF } from "@/lib/pdf-loader";
import { getPineconeClient } from "@/lib/pinecone-client";
import { embedAndStoreDocs } from "@/lib/vector-store";

(async () => {
    try {
        const pineconeClient = await getPineconeClient();
        console.log('Preparing chunks from PDF file');
        const docs = await getChunkedDocsFromPDF();
        console.log(`Loading ${docs.length} chunks into pinecone....`);
        await embedAndStoreDocs(pineconeClient, docs);
        console.log("Data embedded and stored in pine-cone index");

    } catch (error) {
        console.log("Init client script failed", error)
    }
})();