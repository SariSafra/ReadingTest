const averageTimeCalculat = (dataArray) => {
  if (dataArray.length === 0) return 0; 
  let totalTime = 0;

  dataArray.forEach(element => {
    totalTime += element.time;
  });

  const averageTime = totalTime / dataArray.length;
  return averageTime;
};
export default averageTimeCalculat;
