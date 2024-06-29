const makeAnalysis = (result) => {
  const frequencyMap = analyzeSwaps(result);
  const successRate = calculateSuccessRate(result);
  const time = calculateAverageTime(result);
  return { frequencyMap, successRate, time };
};

const calculateSuccessRate = (dataArray) => {
  let totalAttempts = 0;
  let correctAttempts = 0;

  dataArray.forEach((element) => {
    element.elementAnalysis.forEach((analysis) => {
      totalAttempts++;
      if (analysis.correctness) {
        correctAttempts++;
      }
    });
  });

  const successRate = (correctAttempts / totalAttempts) * 100;
  return successRate.toFixed(2); // Returns the success rate as a percentage with two decimal places
};

export default makeAnalysis;
