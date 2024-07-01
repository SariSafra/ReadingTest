import { useState, useEffect, createContext,useContext } from 'react';
import AuditoryProcessing from './AuditoryProcessing.jsx';
import Data from '../../../jsonData/AuditoryProcessingData.json'
import InitExData from '../../../services/readingTest/initExData.js';
import finalDiagnosis from '../../../services/readingTest/finalDiagnosis.js'
import { UserContext } from '../../authentication/UserContext.jsx';
import {postDiagnosis} from '../../../services/api.js'
export { currentExercise };
const currentExercise = createContext(null); // Define the context first

const TestManager = () => {
    const [currentEx, setCurrentEx] = useState(1);
    const [currentData, setCurrentData] = useState(Data.letters);
    const [toRepeat, setToRepet] = useState(false);
    const [toEemphasis, setToEmphasis] = useState(false);
    const [diagnosis, setDiagnosis] = useState([]);
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
      case 3:
          initExData.ex3();
          break;
      case 4:
          initExData.ex4();
          break;
    //   case 5:
    //       initExData.ex5();
    //       break;
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
        const final_diagnosis=finalDiagnosis(diagnosis);
        postDiagnosis(final_diagnosis,user.username);
          //complete !!
          break;
        
    }


    }, [currentEx])
    return (
        <>

            <h1>current exercise: {currentEx}</h1>
            <div> <currentExercise.Provider value={{ currentEx, setCurrentEx }}>
                {console.log("diagnosis from app: " + diagnosis)}

                <AuditoryProcessing data={currentData} setToRepeat={setToRepet} setToEemphasis={setToEmphasis} toRepeat={toRepeat} toEemphasis={toEemphasis} setDiagnosis={setDiagnosis} />
            </currentExercise.Provider>
            </div>
        </>
    )
}

export default TestManager