
import { env } from './config';
import { Pinecone } from "@pinecone-database/pinecone";
import { delay } from './utils'; 

let pineconeClientInstance: Pinecone | null = null

async function createIndex(client: Pinecone, indexName: string) {
    try {
        await client.createIndex({
            name: indexName,
            dimension: 1536,
            metric: 'cosine',
            spec: {
                serverless: {
                    cloud: 'aws',
                    region: 'us-east-1'
                }
            }
        });
    
        console.log(`Waiting for ${env.INDEX_INIT_TIMEOUT} seconds for index initialization to complete ... `);
        await delay(env.INDEX_INIT_TIMEOUT);
        console.log("Index created successfully!!");
    } catch (error) {
        console.error("error", error);
        throw new Error("Index creation failed");
    }
    
}
async function initPinecone() {
    try {
        
        const pc = new Pinecone({ apiKey: env.PINECONE_API_KEY })
    
        const indexName = env.PINECONE_INDEX_NAME;  
        const indexLists = await pc.listIndexes();

        if (indexLists.indexes?.some(index => index.name === indexName)) {
            console.log("Your index already exist")
    } else {
        createIndex(pc, indexName)
    }

    return pc;
    } catch (error) {
        console.error('error', error);
        throw new Error("Failed to initialize Pinecone Client")
    }
}

export async function getPineconeClient() {
    if (!pineconeClientInstance) {
        pineconeClientInstance = await initPinecone();
    }

    return pineconeClientInstance;
}
