import React, { useState, useEffect, useRef } from 'react'
import './Language.css'
import i18n from '../../utils/i18n';
const languageFlags = {
    'English (India) — English': 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png',
    'Hindi(India) — हिंदी': 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png',
    'Bengali(India) — বাংলা': 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png',
    'Malyalam(India) — മലയാളം': 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png'
};

const Language = () => {
    const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('languageName') || 'English (India) — English');
    const [selectedFlag, setSelectedFlag] = useState(languageFlags[selectedLanguage]);
    const [isLanguageListOpen, setIsLanguageListOpen] = useState(false);
    const languageBoxRef = useRef(null);

    const handleLanguageSelect = (language) => {
        setSelectedLanguage(language);
        setSelectedFlag(languageFlags[language]);
        let languageCode = 'en'
        if (language == 'Hindi(India) — हिंदी') {
            languageCode = 'hi'
        }
        else if(language== 'Bengali(India) — বাংলা'){
            languageCode='bn'
        }
        else if(language == 'Malyalam(India) — മലയാളം'){
            languageCode='ml'
        }
        else{
            languageCode='en'
        }
      
        i18n.changeLanguage(languageCode)
        localStorage.setItem('language', languageCode)
        localStorage.setItem('languageName',language)
        setIsLanguageListOpen(false);
    };

    useEffect(() => {
        // Function to close the language list when clicking outside of it
        const handleClickOutside = (event) => {
            if (languageBoxRef.current && !languageBoxRef.current.contains(event.target)) {
                setIsLanguageListOpen(false);
            }
        };

        // Adding event listener to document's click event
        document.addEventListener('click', handleClickOutside);

        return () => {
            // Removing event listener on component unmount
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div ref={languageBoxRef} className='language-box'>
            <button className='language-button' onClick={() => setIsLanguageListOpen(!isLanguageListOpen)}>
                <span className='first-lang'>
                    <span className='flag'>
                        {selectedFlag && <img src={selectedFlag} alt={selectedLanguage} style={{ width: '24px', height: 'auto' }} />}
                    </span>
                    {selectedLanguage}
                </span>
                <span className='up-arrow'>
                    <span className='up-arrow-one'>
                        <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.53803 5.19018C4.50013 5.09883 4.49018 4.99829 4.50942 4.90128C4.52867 4.80427 4.57625 4.71514 4.64616 4.64518L7.64616 1.64518C7.69259 1.59869 7.74774 1.56181 7.80844 1.53665C7.86913 1.51149 7.9342 1.49854 7.99991 1.49854C8.06561 1.49854 8.13068 1.51149 8.19138 1.53665C8.25207 1.56181 8.30722 1.59869 8.35366 1.64518L11.3537 4.64518C11.4237 4.71511 11.4713 4.80423 11.4907 4.90128C11.51 4.99832 11.5001 5.09891 11.4622 5.19032C11.4243 5.28174 11.3602 5.35985 11.2779 5.41479C11.1956 5.46972 11.0989 5.49901 10.9999 5.49893H4.99991C4.90102 5.49891 4.80435 5.46956 4.72214 5.41461C4.63993 5.35965 4.57586 5.28155 4.53803 5.19018ZM10.9999 10.4989H4.99991C4.90096 10.4988 4.80421 10.5281 4.72191 10.5831C4.63962 10.638 4.57547 10.7161 4.53759 10.8075C4.49972 10.8989 4.48982 10.9995 4.50914 11.0966C4.52847 11.1936 4.57615 11.2828 4.64616 11.3527L7.64616 14.3527C7.69259 14.3992 7.74774 14.436 7.80844 14.4612C7.86913 14.4864 7.9342 14.4993 7.99991 14.4993C8.06561 14.4993 8.13068 14.4864 8.19138 14.4612C8.25207 14.436 8.30722 14.3992 8.35366 14.3527L11.3537 11.3527C11.4237 11.2828 11.4713 11.1936 11.4907 11.0966C11.51 10.9995 11.5001 10.8989 11.4622 10.8075C11.4243 10.7161 11.3602 10.638 11.2779 10.5831C11.1956 10.5281 11.0989 10.4988 10.9999 10.4989Z" fill="currentColor"></path></svg>
                    </span>
                </span>
            </button>
            {isLanguageListOpen && (
                <ul className='lang-list'>
                    <li className='lang-list-item' onClick={() => handleLanguageSelect('English (India) — English')}>
                        <span className='lang-list-hin'></span>
                        English (India) — English
                    </li>
                    <li className='lang-list-item' onClick={() => handleLanguageSelect('Hindi(India) — हिंदी')}>
                        <span className='lang-list-hin'></span>
                        Hindi(India) — हिंदी
                    </li>
                    <li className='lang-list-item' onClick={() => handleLanguageSelect('Bengali(India) — বাংলা')}>
                        <span className='lang-list-hin'></span>
                        Bengali(India) — বাংলা
                    </li>
                    
                    <li className='lang-list-item' onClick={() => handleLanguageSelect('Malyalam(India) — മലയാളം')}>
                        <span className='lang-list-hin'></span>
                        Malyalam(India) — മലയാളം
                    </li>
                    
                </ul>
            )}
        </div>
    );
};

export default Language;
