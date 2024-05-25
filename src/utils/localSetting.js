import { useEffect, useState } from 'react';

const useLocalData = () => {
    const getStoredItem = (key, defaultValue) => {
        const storedValue = localStorage.getItem(key);
        return storedValue !== null ? storedValue : defaultValue;
    };

    const [language, setLanguage] = useState(getStoredItem("language", "en"));
    const [activateVoice, setActivateVoice] = useState(getStoredItem("voice", "true") === "true");
    const [activateJobs, setActivateJobs] = useState(getStoredItem("jobs", "true") === "true");

    useEffect(() => {
        const storedLanguage = getStoredItem("language", "en");
        const storedActivateVoice = getStoredItem("voice", "true") === "true";
        const storedActivateJobs = getStoredItem("jobs", "true") === "true";

        if (language !== storedLanguage) {
            setLanguage(storedLanguage);
        }

        if (activateVoice !== storedActivateVoice) {
            setActivateVoice(storedActivateVoice);
        }
        if (activateJobs !== storedActivateJobs) {
            setActivateJobs(storedActivateJobs);
        }
    }, [language, activateVoice, activateJobs]);

    return { language, activateVoice, activateJobs };
};

export default useLocalData;
