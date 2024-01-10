class Embeddings {
  embeddingsModelName;

  constructor(embeddingsModelName) {
    this.embeddingsModelName = embeddingsModelName;
  }

  async generateEmbeddings(texts) {
    const { pipeline } = await import("@xenova/transformers");
    const generateEmbeddingsAIModel = await pipeline(
      "feature-extraction",
      this.embeddingsModelName
    );

    const outputs = await Promise.all(
      texts.map((text) =>
        generateEmbeddingsAIModel(text, {
          pooling: "mean",
          normalize: true,
        })
      )
    );

    const response = outputs.map((item) => [...item.data]);

    return response;
  }

  // Deprecated function - not required when using chroma DB
  dotProduct(a, b) {
    if (a.length !== b.length) {
      throw new Error("Both arguments must have the same length");
    }

    let result = 0;

    for (let i = 0; i < a.length; i++) {
      result += a[i] * b[i];
    }

    return result;
  }

  // Deprecated function - not required when using chroma DB
  async getSimilarityScore(text1, text2) {
    const output1 = await this.generateEmbeddings(text1);

    const output2 = await this.generateEmbeddings(text2);

    return this.dotProduct(output1.data, output2.data);
  }
}

module.exports = Embeddings;
