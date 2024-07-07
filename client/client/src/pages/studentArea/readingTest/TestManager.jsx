import { useState, useEffect, createContext, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuditoryProcessing from './AuditoryProcessing.jsx';
import Data from '../../../jsonData/AuditoryProcessingData.json';
import InitExData from '../../../services/readingTest/initExData.js';
import finalDiagnosis from '../../../services/readingTest/finalDiagnosis.js';
import { UserContext } from '../../authentication/UserContext.jsx';
import { postDiagnosis } from '../../../services/api.js';
import AudioPlayer from './AudioPlayer.jsx';
import '../../style/TestManager.css';

export { currentExercise };
const currentExercise = createContext(null);

const audioFiles = {
    1: '/src/assets/audio/12.m4a',
    2: '/src/assets/audio/12.m4a',
    3: '/src/assets/audio/345678.m4a',
    4: '/src/assets/audio/345678.m4a',
    5: '/src/assets/audio/345678.m4a',
    6: '/src/assets/audio/345678.m4a',
    7: '/src/assets/audio/345678.m4a',
    8: '/src/assets/audio/345678.m4a',
    9: '/src/assets/audio/9.m4a',
    10: '/src/assets/audio/10.m4a',
    11: '/src/assets/audio/11.m4a',
};

const TestManager = () => {
    const [currentEx, setCurrentEx] = useState(1);
    const [currentData, setCurrentData] = useState(Data.letters);
    const [toRepeat, setToRepeat] = useState(false);
    const [toEmphasis, setToEmphasis] = useState(false);
    const [diagnosis, setDiagnosis] = useState([]);
    const [showAudioPlayer, setShowAudioPlayer] = useState(true);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const initExData = new InitExData(setCurrentData);
        switch (currentEx) {
            case 1:
                initExData.ex1();
                break;
            case 2:
                initExData.ex2();
                break;
        //      case 3:
        //   initExData.ex3();
        //   break;
        //      case 4:
        //   initExData.ex4();
        //   break;
        //      case 5:
        //   initExData.ex5();
        //   break;
    //   case 6:
    //       initExData.ex6();
    //       break;
    //   case 7:
    //       initExData.ex7();
    //       break;
    //   case 8:
    //       initExData.ex8();
    //       break;
    //   case 9:
    //       initExData.ex9();
    //       break;
    //   case 10:
    //       initExData.ex10();
    //       break;
    //   case 11:
    //       initExData.ex11();
    //       break;    
            default:
                const final_diagnosis = finalDiagnosis(diagnosis);
                postDiagnosis(final_diagnosis, user.username)
                    .then(() => {
                        toast.success("האבחון נקלט בהצלחה במערכת");
                    })
                    .catch((error) => {
                        toast.error("שגיאה בשליחת העדכון");
                        console.error(error);
                    });
                    setCurrentEx(1);
                break;
        }
    }, [currentEx]);

    const handleAudioEnded = () => {
        setShowAudioPlayer(false);
    };

    const handleExerciseComplete = () => {
        setShowAudioPlayer(true);
    };

    return (
        <>
            <div className="test-manager-container">
                <h1 className="exercise-title">תרגיל נוכחי: {currentEx}</h1>
                <ToastContainer className="toast-container" />
                <div className="test-manager-buttons">
                    <currentExercise.Provider value={{ currentEx, setCurrentEx }}>
                        {showAudioPlayer ? (
                            <AudioPlayer 
                                src={audioFiles[currentEx]} 
                                onEnded={handleAudioEnded} 
                                playOnClick={true} 
                                className="test-manager-audio-player"
                            />
                        ) : (
                            <AuditoryProcessing
                                data={currentData}
                                setToRepeat={setToRepeat}
                                setToEmphasis={setToEmphasis}
                                toRepeat={toRepeat}
                                toEmphasis={toEmphasis}
                                setDiagnosis={setDiagnosis}
                                onExerciseComplete={handleExerciseComplete}
                            />
                        )}
                    </currentExercise.Provider>
                </div>
            </div>
        </>
    );
};

export default TestManager;
