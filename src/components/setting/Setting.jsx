import React, { useEffect, useState } from 'react'
import './Setting.css'
const themes = [
    {
        name: 'red',
        className: 'red-theme'
    },
    {
        name: 'teal',
        className: 'green-theme'
    }
]
const Setting = () => {
    const currentApplied = localStorage.getItem('theme-color') || 'red-theme'
    const [selectedColor, setSelectedColor] = useState(themes.find(color => color.className === currentApplied).name || 'red');
 
    const handleClick = (colorName, className) => {
        document.body.className = className;
        localStorage.setItem('theme-color', className)
        setSelectedColor(colorName);
    };
    useEffect(()=>{
        console.log(selectedColor)
    },[selectedColor])
    return (
        <div className="setting-container">
            <div className="card-design">
                <h5 className="setting-heading">Theme</h5>
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
        </div>
    )
}

export default Setting