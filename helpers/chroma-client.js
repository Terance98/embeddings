const { ChromaClient } = require("chromadb");
const { v4: uuidv4 } = require("uuid");
const Embeddings = require("./generate-embeddings");

class ChromaDB {
  collectionName;
  static client = new ChromaClient();
  static embeddingClient = new Embeddings("Xenova/all-MiniLM-L6-v2");
  static nResults = 3;
  static embedder = {
    generate: (texts) => {
      return ChromaDB.embeddingClient.generateEmbeddings(texts);
    },
  };

  constructor(collectionName) {
    this.collectionName = collectionName;
  }

  async queryVector(query) {
    const collection = await ChromaDB.client.getOrCreateCollection({
      name: this.collectionName,
      embeddingFunction: ChromaDB.embedder,
    });

    const results = await collection.query({
      queryTexts: query,
      nResults: ChromaDB.nResults,
    });

    return results;
  }

  async addDocuments(docs) {
    const collection = await ChromaDB.client.getOrCreateCollection({
      name: this.collectionName,
      embeddingFunction: ChromaDB.embedder,
    });

    const chromaDocs = docs.reduce(
      (acc, item) => {
        acc.ids.push(uuidv4());
        acc.metadatas.push({ source: "my_source" });
        acc.documents.push(item);
        return acc;
      },
      { ids: [], metadatas: [], documents: [] }
    );

    return collection.add(chromaDocs);
  }
}

module.exports = ChromaDB;
