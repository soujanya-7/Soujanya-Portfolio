import React from 'react';
import './ShinyText.css';

const ShinyText = ({ children, className = '', speed = '2s', color = '#fff' }) => {
  return (
    <span 
      className={`shiny-text ${className}`}
      style={{
        '--shiny-speed': speed,
        '--shiny-color': color
      }}
    >
      {children}
    </span>
  );
};

export default ShinyText;
