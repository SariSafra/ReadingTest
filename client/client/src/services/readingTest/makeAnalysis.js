const makeAnalysis = (result) => {
  const frequencyMap = analyzeSwaps(result);
  const successRate = calculateSuccessRate(result);
  const time = averageTimeCalculat(result);
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


const analyzeSwaps = (dataArray) => {
    const frequencyMap = {};
  
    dataArray.forEach(element => {
      element.elementAnalysis.forEach(analysis => {
        const { output, input, correctness } = analysis;
  
        if (!frequencyMap[output]) {
          frequencyMap[output] = { correct: 0, incorrect: 0, swaps: [] };
        }
  
        if (correctness) {
          frequencyMap[output].correct++;
        } else {
          frequencyMap[output].incorrect++;
          const swap = frequencyMap[output].swaps.find(s => s.input === input);
          if (swap) {
            frequencyMap[output].swaps[frequencyMap[output].swaps.findIndex(t=>t===swap)].times++;
          } else {
            frequencyMap[output].swaps.push({ input:input, times: 1 });
          }
        }
      });
    });
  
    return frequencyMap;
  };


  const averageTimeCalculat = (dataArray) => {
    if (dataArray.length === 0) return 0; 
    let totalTime = 0;
  
    dataArray.forEach(element => {
      totalTime += element.time;
    });
  
    const averageTime = totalTime / dataArray.length;
    return averageTime;
  };
  