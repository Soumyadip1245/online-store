import React, { useState } from 'react';
import './Brightness.css';

const Brightness = () => {
  const [value, setValue] = useState(50);

  const handleChange = (e) => {
    setValue(e.target.value);
    adjustBrightness(e.target.value);
  };

  const adjustBrightness = (value) => {
    // Calculate brightness percentage
    const brightnessPercentage = value / 100;

    // Apply brightness filter to the document body
    document.body.style.filter = `brightness(${brightnessPercentage})`;
  };

  const sliderStyle = {
    background: `linear-gradient(to right, purple ${value}%, grey ${value}%)`,
  };

  return (
    <div className='bright-control'>
      <div className="slider-container">
        <input
          type="range"
          className="slider"
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
