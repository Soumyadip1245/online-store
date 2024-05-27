import React, { createContext, useContext, useState, useEffect } from 'react';
import './Speak.css';

const SpeakContext = createContext();

export const useSpeak = () => useContext(SpeakContext);

export const SpeakProvider = ({ children }) => {
    const [isSpeakingEnabled, setIsSpeakingEnabled] = useState(localStorage.getItem("speak") !== "false");

    useEffect(() => {
        localStorage.setItem("speak", isSpeakingEnabled ? "true" : "false");
    }, [isSpeakingEnabled]);

    const toggleSpeak = () => {
        setIsSpeakingEnabled(prevState => !prevState);
    };

    const speakMessage = (message) => {
        if (localStorage.getItem("speak") === "true") {
            const speechSynthesis = window.speechSynthesis;
            const utterance = new SpeechSynthesisUtterance(message);
            utterance.lang = 'hi-IN'
            speechSynthesis.speak(utterance);
        }
    };

    return (
        <SpeakContext.Provider value={{ isSpeakingEnabled, toggleSpeak, speakMessage }}>
            <div className="speaker" onClick={toggleSpeak}>
                {isSpeakingEnabled ? <i className="fa-solid fa-volume-low"></i> : <i className="fa-solid fa-volume-xmark"></i>}
            </div>
            {children}
        </SpeakContext.Provider>
    );
};