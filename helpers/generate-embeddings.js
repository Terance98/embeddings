class Embeddings {
  embeddingsModelName;

  constructor(embeddingsModelName) {
    this.embeddingsModelName = embeddingsModelName;
  }

  async generateEmbeddings() {
    const { pipeline } = await import("@xenova/transformers");
    const generateEmbeddingsAIModel = await pipeline(
      "feature-extraction",
      this.embeddingsModelName
    );

    const output = await generateEmbeddingsAIModel(
      "I am interested in the starter plan",
      {
        pooling: "mean",
        normalize: true,
      }
    );

    return output;
  }

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

  async getSimilarityScore(text1, text2) {
    const output1 = await this.generateEmbeddings(text1);

    const output2 = await this.generateEmbeddings(text2);

    return this.dotProduct(output1.data, output2.data);
  }
}

module.exports = Embeddings;
