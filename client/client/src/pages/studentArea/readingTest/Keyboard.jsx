import React from "react";

const Keyboard = ({inputRef, setInput }) => {

    const firstRow = ["א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י", "כ", "ל"];
    const secondRow = ["מ", "נ", "ס", "ע", "פ", "צ", "ק", "ר", "ש", "ת"];
    const thirdRow = ["ַ", "ִ", "ֵ", "וֹ", "וּ"];

    const handleClick=(key)=>{
        setInput(prev => `${prev}${key}`);
        inputRef.current.focus();
    }

    return (
        <>
            <div>
                <div className='letters-row'>{firstRow.map(key => (
                    <button key={key} onClick={()=>handleClick(key)}>
                        {key}
                    </button>
                ))}</div>
                <div className='letters-row'>{secondRow.map(key => (
                    <button key={key} onClick={() => setInput(prev => `${prev}${key}`)}>
                        {key}
                    </button>
                ))}</div>
                <div className='vocalization-row'>{thirdRow.map(key => (
                    <button key={key} onClick={() => setInput(prev => `${prev}${key}`)}>
                        {key}
                    </button>
                ))} </div>
            </div>
        </>
    );
}

export default Keyboard;