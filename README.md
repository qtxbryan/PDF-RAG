# PDF-RAG 💻🔗
An AI-powered PDF chat built with Next.js 13, Vercel's AI SDK, Langchain, and PineconeDB

## Architecture and Feature


## Description
Built with:
- ✅ Next.js
- ✅ Vercel AI SDK
- ✅ Shadcn-ui
- ✅ Langchain
- ✅ Pinecone db

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command               | Action                                          |
| :-------------------- | :-----------------------------------------------|
| `npm install`         | Installs dependencies                           |
| `npm run prepare:data`| Splits your PDF file under the /docs folder into chunks, embeds them, uploads them to Pinecone|
| `npm run dev`         | Starts the local dev server at `localhost:3000` |


## Environment variables

```
OPENAI_API_KEY= Get from openai
PINECONE_API_KEY= Get from pinecone
PINECONE_INDEX_NAME= Create new index 
PDF_PATH=
INDEX_INIT_TIMEOUT=240000
```

## Uploading new document for RAG
- Upload new document into /docs folder 
```
npm run prepare:data
```