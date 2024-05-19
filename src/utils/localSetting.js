import { useEffect, useState } from 'react';

const useLocalData = () => {
    const [language, setLanguage] = useState(localStorage.getItem("language"));
    const [activateVoice, setActivateVoice] = useState(localStorage.getItem("voice") === "true");
    const [activateJobs, setActivateJobs] = useState(localStorage.getItem("jobs") === "true");


    useEffect(() => {
        const storedLanguage = localStorage.getItem("language");
        const storedActivateVoice = localStorage.getItem("voice") === "true";
        const storedActivateJobs = localStorage.getItem("jobs") === "true";


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
