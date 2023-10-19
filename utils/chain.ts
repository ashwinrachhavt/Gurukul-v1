import {OpenAI} from "langchain/llms/openai";
import {pinecone} from "./pinecone-client";
import {PineconeStore} from "langchain/vectorstores/pinecone";
import {OpenAIEmbeddings} from "langchain/embeddings/openai";
import {ConversationalRetrievalQAChain} from "langchain/chains";
import { PineconeClient } from "@pinecone-database/pinecone";


async function initChain() {
    const model = new OpenAI({});

    const client = new PineconeClient();
    await client.init({
        apiKey: process.env.PINECONE_API_KEY,
        environment: process.env.PINECONE_ENVIRONMENT,
    });
    const pineconeIndex = client.Index(process.env.PINECONE_INDEX);

    const vectorStore = await PineconeStore.fromExistingIndex(
        new OpenAIEmbeddings(),
        { pineconeIndex }
    );

    return ConversationalRetrievalQAChain.fromLLM(
        model,
        retriever,
        {returnSourceDocuments: true}
    );
}

export const chain = await initChain();