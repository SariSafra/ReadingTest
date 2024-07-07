const correctnessChecking = (data, input) => {
  let resultArray = [];
  let toWrite = data.toWrite;
  let inputValue = input;

  let i = 0, j = 0;
  while (i < toWrite.length && j < inputValue.length) {
    if (toWrite[i] === inputValue[j]) {
      resultArray.push({
        output: toWrite[i],
        input: inputValue[j],
        correctness: true,
      });
      i++;
      j++;
    } else {
      if (toWrite.length > inputValue.length) {
        resultArray.push({
          output: toWrite[i],
          input: null,
          correctness: false,
        });
        i++; 
      } else {
        resultArray.push({
          output: toWrite[i],
          input: inputValue[j],
          correctness: false,
        });
        i++;
        j++;
      }
    }
  }

  while (i < toWrite.length) {
    resultArray.push({
      output: toWrite[i],
      input: null,
      correctness: false,
    });
    i++;
  }

  if (j < inputValue.length) {
    resultArray.push({
      output: null,
      input: inputValue[j],
      correctness: false,
    });
  }

  return resultArray;
};

export default correctnessChecking;
