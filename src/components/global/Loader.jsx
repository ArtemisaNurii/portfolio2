import React from 'react';
import { useState, useEffect } from 'react';

const ArrowLoader = ({ onComplete, duration = 3000 }) => {
  const [isExiting, setIsExiting] = useState(false);
  
  useEffect(() => {
    // Start exit animation slightly before completing
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, duration - 500);
    
    // Call onComplete after specified duration
    const completeTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, duration);
    
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete, duration]);
  const customStyles = `
    @keyframes blink {
      0% { opacity: 0.1; }
      30% { opacity: 1; }
      100% { opacity: 0.1; }
    }
    
    @keyframes colorPulse {
      0% { border-bottom-color: #87CEEB; }
      50% { border-bottom-color: #00FFFF; }
      100% { border-bottom-color: #87CEEB; }
    }
    
    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }
    
    .loader-container {
      opacity: 1;
      transition: opacity 0.5s ease-out;
    }
    
    .loader-container.exiting {
      opacity: 0;
    }
    
    .arrow {
      width: 0;
      height: 0;
      margin: 0 -6px;
      border-left: 12px solid transparent;
      border-right: 12px solid transparent;
      border-bottom: 21.6px solid #87CEEB;
      animation: blink 1s infinite, colorPulse 3s infinite;
      filter: drop-shadow(0 0 18px #00FFFF);
    }
    
    .arrow.down {
      transform: rotate(180deg);
    }
    
    ${Array.from({ length: 18 }, (_, i) => `
      .outer-${i + 1} {
        animation-delay: -${((1 / 18) * (i + 1)).toFixed(2)}s;
      }
    `).join('')}
    
    ${Array.from({ length: 6 }, (_, i) => `
      .inner-${i + 1} {
        animation-delay: -${((1 / 6) * (i + 1)).toFixed(2)}s;
      }
    `).join('')}
  `;

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-black">
      <style>{customStyles}</style>
      <div className={`loader-container ${isExiting ? 'exiting' : ''} flex flex-col items-center`}>
        <div className="flex">
          <div className="arrow up outer outer-18"></div>
          <div className="arrow down outer outer-17"></div>
          <div className="arrow up outer outer-16"></div>
          <div className="arrow down outer outer-15"></div>
          <div className="arrow up outer outer-14"></div>
        </div>
        <div className="flex">
          <div className="arrow up outer outer-1"></div>
          <div className="arrow down outer outer-2"></div>
          <div className="arrow up inner inner-6"></div>
          <div className="arrow down inner inner-5"></div>
          <div className="arrow up inner inner-4"></div>
          <div className="arrow down outer outer-13"></div>
          <div className="arrow up outer outer-12"></div>
        </div>
        <div className="flex">
          <div className="arrow down outer outer-3"></div>
          <div className="arrow up outer outer-4"></div>
          <div className="arrow down inner inner-1"></div>
          <div className="arrow up inner inner-2"></div>
          <div className="arrow down inner inner-3"></div>
          <div className="arrow up outer outer-11"></div>
          <div className="arrow down outer outer-10"></div>
        </div>
        <div className="flex">
          <div className="arrow down outer outer-5"></div>
          <div className="arrow up outer outer-6"></div>
          <div className="arrow down outer outer-7"></div>
          <div className="arrow up outer outer-8"></div>
          <div className="arrow down outer outer-9"></div>
        </div>
      </div>
    </div>
  );
};

export default ArrowLoader;