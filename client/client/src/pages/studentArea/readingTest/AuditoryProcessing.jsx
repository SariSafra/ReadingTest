import { useEffect, useRef, useState, useContext } from 'react';
import Keyboard from './Keyboard';
import makeAnalysis from '../../../services/readingTest/makeAnalysis.js';
import moveToNextEx from '../../../services/readingTest/moveToNextEx.js';
import correctnessChecking from '../../../services/readingTest/correctnessChecking.js';
import { currentExercise } from './TestManager.jsx';

const AuditoryProcessing = ({ data, setToRepeat, setToEmphasis, toRepeat, toEmphasis, setDiagnosis, onExerciseComplete }) => {
  const [buttonClickTime, setButtonClickTime] = useState(null);
  const [inputStartTime, setInputStartTime] = useState(null);
  const [index, setIndex] = useState(0);
  const [utterance, setUtterance] = useState({});
  const [result, setResult] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
  const { currentEx, setCurrentEx } = useContext(currentExercise);

  console.log("AuditoryProcessing render" + JSON.stringify(data) + "\nindex: " + index);

  useEffect(() => {
    console.log("data: " + data + "\n");
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(data[index].toSpeak.repeat(toRepeat ? 2 : 1));
    const voices = synth.getVoices();
    u.voice = voices[0];
    setUtterance(u);
    inputRef.current.focus();
  }, []);

  const handleStart = () => {
    utterance.rate = toEmphasis ? 0.3 : 1;
    utterance.text = data[index].toSpeak.repeat(toRepeat ? 2 : 1);
    play();
  };

  const play = () => {
    const synth = window.speechSynthesis;
    const clickTime = Date.now();
    setButtonClickTime(clickTime);
    setInputStartTime(null); // Reset input start time
    synth.speak(utterance);
    inputRef.current.focus();
  };

  const handleSend = () => {
    if (buttonClickTime && !inputStartTime) {
      const inputTime = Date.now();
      setInputStartTime(inputTime);
      const difference = inputTime - buttonClickTime;
      console.log("towrite: " + data[index].toWrite + " the input: " + inputValue);
      const newResult = { time: difference, elementAnalysis: correctnessChecking(data[index], inputValue) };
      if (index < data.length - 1) {
        setInputValue("");
        setResult([...result, newResult]);
        utterance.text = data[index + 1].toSpeak.repeat(toRepeat ? 2 : 1);
        setIndex(index + 1);
        play();
      } else {
        onExerciseComplete(true);
        setIndex(0);
        setInputValue("");
        setResult([...result, newResult]);
        const diagnosis = makeAnalysis([...result, newResult]);
        setResult([]);
        setIndex(0);
        moveToNextEx(diagnosis, setCurrentEx, toRepeat, setToRepeat, toEmphasis, setToEmphasis, setDiagnosis, currentEx); // Indicate that the process is finished
      }
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="auditory-processing-container">
      <div className="button-container">
        <button onClick={handleStart} className="start-button">התחלה</button>
        <button onClick={handleSend} className="next-button">הבא</button>
      </div>
      <br />
      <input
        type="text"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        className="input-field"
      />
      <Keyboard inputRef={inputRef} setInput={setInputValue} />
    </div>
  );
};

export default AuditoryProcessing;
