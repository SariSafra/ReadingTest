const moveToNextEx = (Diagnosis, setNextEx, toRepeat, setToRepeat, toEmphasis, setToEmphasis, setDiagnosis, currentEx) => {
  setDiagnosis((prev) => [...prev, { ExeNum: currentEx, Diagnosis, Mediation: { Emphasis: toEmphasis, Repeat: toRepeat } }]);

  if (Diagnosis.successRate < 80 && (!toEmphasis || !toRepeat)) {
    if (!toEmphasis) {
      setToEmphasis(true);
    } else if (!toRepeat) {
      setToRepeat(true);
    }
  } else {
    setNextEx(currentEx + 1);
    setToEmphasis(false);
    setToRepeat(false);
  }
};

export default moveToNextEx;
