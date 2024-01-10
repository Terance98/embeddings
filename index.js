const ChromaDB = require("./helpers/chroma-client");
const { readAndSplitFile } = require("./helpers/get-documents");

const dbName = "test-db-5";
const chromadb = new ChromaDB(dbName);

async function addDocuments() {
  const filePath = "./kb/hamlet.txt";
  const docs = readAndSplitFile(filePath);

  console.log({ docs });
  const additionStatus = await chromadb.addDocuments(docs);
  console.log(
    `Added ${filePath} to the kb. ${docs.length} docs have been created in ${dbName} `,
    { additionStatus }
  );
}

async function queryDocument() {
  const matchingDocument = await chromadb.queryVector("who is hamlet");
  console.log(JSON.stringify({ matchingDocument }));
}

// addDocuments();
queryDocument();
