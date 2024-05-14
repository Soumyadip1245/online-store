import React, { useState, useEffect } from 'react';
import './Brightness.css';

const Brightness = () => {
  // Retrieve the brightness value from local storage, default to 50 if not present
  const initialValue = localStorage.getItem('brightness') || 50;
  const [value, setValue] = useState(parseInt(initialValue));

  // Update brightness value in local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('brightness', value);
    adjustBrightness(value);
  }, [value]);

  const handleChange = (e) => {
    setValue(parseInt(e.target.value));
  };

  const adjustBrightness = (value) => {
    // Calculate brightness percentage
    const brightnessPercentage = value / 100;

    // Apply brightness filter to the document body
    document.body.style.filter = `brightness(${brightnessPercentage})`;
  };

  const sliderStyle = {
    background: `linear-gradient(to right, var(--button-background) ${value}%, grey ${value}%)`
  };

  return (
    <div className='bright-control'>
      <div className="slider-container">
        <input
          type="range"
          className="sliderb"
          min="0"
          max="100"
          value={value}
          onChange={handleChange}
          style={sliderStyle}
        />
      </div>
      <div className="brightness-value">
        <button className='bright-button'>{value} %</button>
      </div>
    </div>
  );
}

export default Brightness;
