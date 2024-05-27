import React, { createContext, useContext, useState, useEffect } from 'react';

const SpeakContext = createContext();

export const useSpeak = () => useContext(SpeakContext);

export const SpeakProvider = ({ children }) => {
    const [isSpeakingEnabled, setIsSpeakingEnabled] = useState(localStorage.getItem("speak") !== "false");

    useEffect(() => {
        localStorage.setItem("speak", isSpeakingEnabled);
    }, [isSpeakingEnabled]);

    const toggleSpeak = () => {
        setIsSpeakingEnabled(prevState => !prevState);
    };

    const speakMessage = (message) => {
        if (isSpeakingEnabled) {
            const speechSynthesis = window.speechSynthesis;
            const utterance = new SpeechSynthesisUtterance(message);
            utterance.lang = 'hi-IN'
            speechSynthesis.speak(utterance);
        }
    };

    return (
        <SpeakContext.Provider value={{ isSpeakingEnabled, toggleSpeak, speakMessage }}>
            {children}
        </SpeakContext.Provider>
    );
};
