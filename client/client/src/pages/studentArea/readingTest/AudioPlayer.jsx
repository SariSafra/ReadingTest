import React, { useRef, useState } from 'react';

const AudioPlayer = ({ src, onEnded, playOnClick }) => {
    const audioRef = useRef(null);
    const [audioEnded, setAudioEnded] = useState(false);

    const handlePlay = () => {
        if (audioRef.current) {
            const playPromise = audioRef.current.play();

            if (playPromise !== undefined) {
                playPromise
                    .then(_ => {
                        // Playback started
                    })
                    .catch(error => {
                        console.error('Auto-play was prevented:', error);
                    });
            }
        }
    };

    const handleAudioEnded = () => {
        setAudioEnded(true);
        if (typeof onEnded === 'function') {
            onEnded(false);
        }
    };

    return (
        <div>
            <audio
                ref={audioRef}
                src={src}
                preload="auto"
                onError={(e) => console.error("Audio Error: ", e)}
                onEnded={handleAudioEnded}
            />
            {playOnClick && !audioEnded && (
                <button onClick={handlePlay}>Play Audio</button>
            )}
        </div>
    );
};

export default AudioPlayer;
