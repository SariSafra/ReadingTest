const moveToNextEx = (Diagnosis, setNextEx, toRepeat, setToRepeat, toEmphasis, setToEmphasis, setDiagnosis, currentEx, setIsExerciseReady) => {
  console.log("Finish");
  console.log(`Diagnosis frequencyMap: ${Diagnosis.frequencyMap}, Diagnosis successRate: ${Diagnosis.successRate}, Diagnosis time: ${Diagnosis.time}`);
  setDiagnosis((prev) => [...prev, { ExeNum: currentEx, Diagnosis, Mediation: { Emphasis: toEmphasis, Repeat: toRepeat } }]);

  if (Diagnosis.successRate < 80 && (!toEmphasis || !toRepeat)) {
    if (!toEmphasis) {
      setToEmphasis(true);
    } else if (!toRepeat) {
      setToRepeat(true);
    }
  } else {
    setNextEx((prev) => prev + 1);
    setToEmphasis(false);
    setToRepeat(false);
  }
  setIsExerciseReady(true); // Ensure the button appears for the new exercise
};

export default moveToNextEx;
