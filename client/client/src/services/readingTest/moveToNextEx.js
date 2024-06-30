const moveToNextEx = (Diagnosis, setNextEx, toRepeat, setToRepeat, toEmphasis, setToEmphasis, setDiagnosis, currentEx) => {
  console.log("Finish");
  console.log(`Diagnosis frequencyMap: ${Diagnosis.frequencyMap}, Diagnosis successRate: ${Diagnosis.successRate}, Diagnosis time: ${Diagnosis.time}`);

  if (Diagnosis.successRate < 80 && (!toEmphasis || !toRepeat)) {
    if (!toEmphasis) {
      setToEmphasis(true);
    } else if (!toRepeat) {
      setToRepeat(true);
    }
  } else {
    setNextEx((prev) => prev + 1);
    setDiagnosis((prev) => [...prev, { ExeNum: currentEx, Diagnosis, Mediation: { Emphasis: toEmphasis, Repeat: toRepeat } }]);
    setToEmphasis(false);
    setToRepeat(false);
  }
};

export default moveToNextEx;