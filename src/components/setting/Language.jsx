import React, { useState } from 'react'
import './Language.css'
const languageFlags = {
    'English (United States) — English': 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg',
    'Hindi(India) — हिंदी': 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png',
    'French(France) — Français': 'https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg',
    'German (Germany) — Deutsch': 'https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg'
};
const Language = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('English (United States) — English');
    const [selectedFlag, setSelectedFlag] = useState(languageFlags['English (United States) — English']);
    const handleLanguageSelect = (language) => {
        setSelectedLanguage(language);
        setSelectedFlag(languageFlags[language]);
    };
    return (
        <div className='language-box'>
        <button className='language-button' onClick={() => handleLanguageSelect(selectedLanguage)}>
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
        <ul className='lang-list'>
            <li className='lang-list-item' onClick={() => handleLanguageSelect('English (United States) — English')}>
                <span className='lang-list-eng'></span>
                English (United States) — English
            </li>
            <li className='lang-list-item' onClick={() => handleLanguageSelect('Hindi(India) — हिंदी')}>
                <span className='lang-list-hin'></span>
                Hindi(India) — हिंदी
            </li>
            <li className='lang-list-item' onClick={() => handleLanguageSelect('French(France) — Français')}>
                <span className='lang-list-fre'></span>
                French(France) — Français
            </li>
            <li className='lang-list-item' onClick={() => handleLanguageSelect('German (Germany) — Deutsch')}>
                <span className='lang-list-ger'></span>
                German (Germany) — Deutsch
            </li>
        </ul>
    </div>
  )
}

export default Language