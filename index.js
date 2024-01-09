const Embeddings = require("./helpers/generate-embeddings");

async function runIt() {
  const embeddings = new Embeddings("Xenova/all-MiniLM-L6-v2");

  const text1 = "Hello, how are you?";
  const text2 = `How's you doing?`;

  const similarityScore = await embeddings.getSimilarityScore(text1, text2);

  console.log({ similarityScore });
}

runIt();
