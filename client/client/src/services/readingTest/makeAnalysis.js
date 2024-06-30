//import analyzeSwaps from './analyzeSwaps.js'
//import averageTimeCalculat from './averageTimeCalculat.js'
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
  
        if (!frequencyMap[input]) {
          frequencyMap[input] = { correct: 0, incorrect: 0, swaps: [] };
        }
  
        if (correctness) {
          frequencyMap[input].correct++;
        } else {
          frequencyMap[input].incorrect++;
          const swap = frequencyMap[input].swaps.find(s => s.output === output);
          if (swap) {
            swap.times++;
          } else {
            frequencyMap[input].swaps.push({ output, times: 1 });
          }
        }
      });
    });
  
    return frequencyMap;
  };


  const averageTimeCalculat = (dataArray) => {
    if (dataArray.length === 0) return 0; // Handle the case of an empty array
  
    let totalTime = 0;
  
    dataArray.forEach(element => {
      totalTime += element.time;
    });
  
    const averageTime = totalTime / dataArray.length;
    return averageTime;
  };
  