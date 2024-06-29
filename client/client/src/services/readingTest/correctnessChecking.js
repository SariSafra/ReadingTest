export default correctnessChecking = (data, input) => {
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
          // Assume a character is missing in inputValue
          resultArray.push({
            output: toWrite[i],
            input: null,
            correctness: false,
          });
          i++; // Skip the current character in toWrite
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
  
    // Handle any remaining characters
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