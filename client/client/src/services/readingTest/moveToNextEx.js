export default moveToNextEx = (Diagnosis, setNextEx, toReapt, setToRepeat, toEmphasis, setToEmphasis,setDiagnosis,currentEx) => {

    console.log("finish");
    console.log("Diagnosis frequencyMap: "+Diagnosis.frequencyMap+" Diagnosis successRate: "+Diagnosis.successRate+" Diagnosis time: "+Diagnosis.time)
    if (Diagnosis.successRate < 80 && (!toEmphasis || !toReapt)){
      if (!toEmphasis)
        setToEmphasis(true);
      else if (!toReapt)
        setToRepeat(true);
    }
    else{
      setNextEx((prev) => {
        const next = prev + 1;
        return next
      });
      setDiagnosis((prev)=>{return [...prev,{ExeNum:currentEx,Diagnosis:Diagnosis,Mediation:{Emphasis:toEmphasis,Repeat:toReapt}}]})
      setToEmphasis(false);
      setToRepeat(false);
    }
  
  }