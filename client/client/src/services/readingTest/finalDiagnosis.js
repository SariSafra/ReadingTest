const createCombinedFrequencyMap = (diagnosisesArray) => {
    return diagnosisesArray.reduce((acc, diagnosis) => {
        if (diagnosis.Diagnosis && diagnosis.Diagnosis.frequencyMap) { // Check if frequencyMap exists under Diagnosis
            for (const [key, value] of Object.entries(diagnosis.Diagnosis.frequencyMap)) {
                if (!acc[key]) {
                    acc[key] = { correct: 0, incorrect: 0, swaps: [] };
                }
                acc[key].correct += value.correct || 0; // Ensure value.correct exists
                acc[key].incorrect += value.incorrect || 0; // Ensure value.incorrect exists
  
                value.swaps.forEach(swap => {
                    const existingSwap = acc[key].swaps.find(s => s.input === swap.input);
                    if (existingSwap) {
                      const index=acc[key].swaps.findIndex(t=>t==existingSwap);
                      //check how to enter it to acc
                        acc[key].swaps[index].times+=swap.times;
                    } else {
                        acc[key].swaps.push({ ...swap });
                    }
                });
            }
        }
        return acc;
    }, {});


};

  
  // Function to determine final emphasis and repeat settings
  const determineFinalSettings = (diagnosisesArray) => {
    const emphasisCount = diagnosisesArray.filter(diagnosis => diagnosis.Mediation.Emphasis).length;
    const repeatCount = diagnosisesArray.filter(diagnosis => diagnosis.Mediation.Repeat).length;
    const totalCount = diagnosisesArray.length;
  
    return {
      toEmphasis: emphasisCount > totalCount / 6,
      toRepeat: repeatCount > totalCount / 6,
    };
  };
  
  // Function to calculate swap consistency
  const calculateSwapConsistency = (combinedFrequencyMap) => {
    const swapConsistency = {};
    for (const [key, value] of Object.entries(combinedFrequencyMap)) {
      const totalSwaps = value.incorrect; // Only consider incorrect attempts for consistency
      if (totalSwaps > 0) {
        value.swaps.forEach(swap => {
          if (!swapConsistency[key]) {
            swapConsistency[key] = { consistent: 0, total: 0 };
          }
          swapConsistency[key].consistent += swap.times;
          swapConsistency[key].total += totalSwaps;
        });
      }
    }
  
    return Object.entries(swapConsistency).reduce((acc, [key, value]) => {
      acc[key] = ((value.consistent / value.total) * 100).toFixed(2);
      return acc;
    }, {});
  };
  
  // Function to calculate the total success rate
  const calculateTotalSuccessRate = (diagnosisesArray) => {
    const totalSuccessRate = diagnosisesArray.reduce((acc, diagnosis) => acc + parseFloat(diagnosis.Diagnosis.successRate), 0) / diagnosisesArray.length;
    return totalSuccessRate.toFixed(2);
  };
  
  // Function to calculate the total time
  const calculateTotalTime = (diagnosisesArray) => {
    return diagnosisesArray.reduce((acc, diagnosis) => acc + diagnosis.Diagnosis.time, 0);
  };
  
  // Final diagnosis function
   const finalDiagnosis = (diagnosisesArray) => {
    const combinedFrequencyMap = createCombinedFrequencyMap(diagnosisesArray);
    const finalSettings = determineFinalSettings(diagnosisesArray);
    const consistentSwappingPercentageObj = calculateSwapConsistency(combinedFrequencyMap);
    const consistentSwappingPercentage=Object.values(consistentSwappingPercentageObj).reduce((sum, value) => sum + parseFloat(value), 0)/Object.keys(consistentSwappingPercentageObj).length;
    const successRate = calculateTotalSuccessRate(diagnosisesArray);
    const time = calculateTotalTime(diagnosisesArray);
  
    return {
      frequencyMap: combinedFrequencyMap,
      Emphasis: finalSettings.toEmphasis,
      Repeat: finalSettings.toRepeat,
      successRate:successRate,
      time:time,
      consistentSwappingPercentage:consistentSwappingPercentage,
    };
  };
  export default finalDiagnosis;
  