import React, { useEffect, useState } from 'react'
import './Setting.css'
import Language from './Language';
import Brightness from './Brightness';
import { useTranslation } from 'react-i18next'
import i18n from '../../utils/i18n';




const themes = [
    {
        name: 'purple',
        className: 'purple-theme'
    },
    {
        name: 'red',
        className: 'red-theme'
    },
    {
        name: 'teal',
        className: 'green-theme'
    },
    {
        name: 'blue',
        className: 'blue-theme'
    },
    {
        name: 'gray',
        className: 'gray-theme'
    }
]
const Setting = () => {
    const {t} = useTranslation()
    const currentApplied = localStorage.getItem('theme-color') || 'red-theme'
    const [selectedColor, setSelectedColor] = useState(themes.find(color => color.className === currentApplied).name || 'red');
    const [isVoiceEnabled, setIsVoiceEnabled] = useState(localStorage.getItem("voice") === "true");
    const [isJobsEnabled, setIsJobsEnabled] = useState(localStorage.getItem("jobs")==="true");
    
    const handleClick = (colorName, className) => {
        document.body.className = className;
        localStorage.setItem('theme-color', className)
        setSelectedColor(colorName);
    };
    useEffect(() => {
        localStorage.setItem("voice", isVoiceEnabled ? "true" : "false");
    }, [isVoiceEnabled]);
    useEffect(() => {
        localStorage.setItem("jobs", isJobsEnabled ? "true" : "false");
    }, [isJobsEnabled]);

    const handleToggle = () => {
        setIsVoiceEnabled(!isVoiceEnabled);
    };
    const handleJobToggle = () => {
        setIsJobsEnabled(!isJobsEnabled);
    };


    useEffect(() => {
        console.log(selectedColor)
    }, [selectedColor])
    return (
        <div className="setting-container">
            <div className="card-design">
                <h5 className="setting-heading">{t('settings.se1')}</h5>
                <div className="theme-container">
                    {
                        themes.map(color =>
                            <div className="grid-color" onClick={() => handleClick(color.name, color.className)}>
                                <div class={`color-container ${color.className} ${selectedColor === color.name ? 'border-applied' : ''}`}>
                                    <div class="left-two-circles">
                                        <div class="circle-overlap-one"></div>
                                        <div class="circle-overlap-two"></div>
                                    </div>
                                    <div class="inside-box">
                                        <div class="headerclass">
                                            <div class="left-header">
                                                <div class="semi-bar"></div>
                                                <div class="circle-bar"></div>
                                                <div class="circle-bar"></div>
                                            </div>
                                            <div class="circle-bar"></div>
                                        </div>
                                        <div class="space-class"></div>
                                        <div class="semi-bar-short-straight"></div>
                                        <div class="semi-bar-straight"></div>

                                        <div class="semi-box"></div>
                                        <div class="space-class"></div>
                                        <div class="circle-semi">
                                            <div class="circle-bar"></div>
                                            <div class="semi-bar-circle"></div>
                                        </div>
                                        <div class="footer-box">
                                            <div class="box-four"></div>
                                            <div class="box-four"></div>
                                            <div class="box-four"></div>
                                            <div class="box-four"></div>
                                        </div>
                                    </div>
                                </div>
                                <p className="theme-text">{color.name.charAt(0).toUpperCase() + color.name.substring(1)}</p>
                            </div>)
                    }

                </div>
            </div>
            <div className="card-design">
                <h5 className="setting-heading">{t('settings.se2')}</h5>
                <div className="input-text">
                    <div className="toggle-card">
                        <input type="checkbox" id="toggle1" className="input-checkbox" checked={isVoiceEnabled}
                    onChange={handleToggle}/>
                
                        <label htmlFor="toggle1" className="toggle-button"></label>
                        <p style={{ color: 'var(--color-text)', fontWeight: 'bold' }}>{t('settings.se3')}</p>
                    </div>
                    <p className="written text-wrap">{t('settings.se4')}</p>
                </div>
            </div>


            <div className="card-design">
                <h5 className="setting-heading">{t('settings.se7')}</h5>
                <div className="input-text">
                    <div className="toggle-card">
                        <input type="checkbox" id="toggle2" className="input-checkbox" checked={isJobsEnabled}
                    onChange={handleJobToggle}/>
                
                        <label htmlFor="toggle2" className="toggle-button"></label>
                        <p style={{ color: 'var(--color-text)', fontWeight: 'bold' }}>{t('settings.se8')}</p>
                    </div>
                    <p className="written text-wrap">{t('settings.se9')}</p>
                </div>
            </div>



            <div className="card-design height-auto">
                <h5 className="setting-heading">{t('settings.se5')}</h5>
                <Language/>
            </div>
        </div>
    )
}

export default Setting