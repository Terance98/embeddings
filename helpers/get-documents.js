const fs = require("fs");

// Function to split a text into sentences
function splitSentences(text) {
  const sentenceRegex = /[^.!?]+[.!?]+/g;
  return text.match(sentenceRegex) || [];
}

// Function to read a text file and split it into minor documents (every sentence)
function readAndSplitFile(filePath) {
  try {
    // Read the content of the file synchronously
    const fileContent = fs.readFileSync(filePath, "utf-8");

    // Split the content into an array of lines
    const lines = fileContent.split("\n");

    // Split each line into sentences and further split into minor documents
    const minorDocuments = lines.reduce((acc, line) => {
      const sentences = splitSentences(line);

      // Check if the number of sentences is more than 3
      if (sentences.length > 3) {
        // Further split into minor documents
        const minorSentences = sentences.reduce((minorAcc, sentence) => {
          if (
            minorAcc.length === 0 ||
            minorAcc[minorAcc.length - 1].length < 3
          ) {
            minorAcc.push([sentence]);
          } else {
            minorAcc[minorAcc.length - 1].push(sentence);
          }
          return minorAcc;
        }, []);
        acc.push(...minorSentences.map((minor) => minor.join(" ")));
      } else {
        // Keep the line as a minor document
        acc.push(line);
      }

      return acc;
    }, []);

    return minorDocuments.filter(Boolean);
  } catch (error) {
    console.error("Error reading or splitting the file:", error.message);
    return [];
  }
}

module.exports = { readAndSplitFile };
