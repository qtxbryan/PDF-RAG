import { env } from './config';
import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from '@langchain/openai';
import { PineconeStore } from "@langchain/pinecone";

export async function embedAndStoreDocs(
    client: Pinecone,
    docs: Document<Record<string, any>>[]
) {
    try {
        const embeddings = new OpenAIEmbeddings(); // using "text-ada-002"
        const index = client.Index(env.PINECONE_INDEX_NAME); 

        await PineconeStore.fromDocuments(docs, embeddings, {
            pineconeIndex: index,
            textKey: "text",
        })
    } catch (error) {
        console.log("Error", error)
        throw new Error("Failed to load docs")
    }
}

export async function getVectorStore(client: Pinecone) {
    try {
        const embeddings = new OpenAIEmbeddings(); // using "text-ada-002"
        const index = client.Index(env.PINECONE_INDEX_NAME);

        const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
            pineconeIndex: index,
            textKey: 'text'
        });

        return vectorStore;
    } catch (error) {
        console.log("Error", error)
        throw new Error("Something went wrong while getting vector store!")
    }
}