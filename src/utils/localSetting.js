import { useEffect, useState } from 'react';

const useLocalData = () => {
    const [language, setLanguage] = useState(localStorage.getItem("language"));
    const [activateVoice, setActivateVoice] = useState(localStorage.getItem("voice") === "true");

    useEffect(() => {
        const storedLanguage = localStorage.getItem("language");
        const storedActivateVoice = localStorage.getItem("voice") === "true";

        if (language !== storedLanguage) {
            setLanguage(storedLanguage);
        }

        if (activateVoice !== storedActivateVoice) {
            setActivateVoice(storedActivateVoice);
        }
    }, [language, activateVoice]);

    return { language, activateVoice };
};

export default useLocalData;
