
export default analyzeSwaps = (dataArray) => {
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