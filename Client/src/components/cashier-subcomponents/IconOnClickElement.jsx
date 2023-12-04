import React, { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';

const IconOnClickElement = ({ Element, children, icon, duration, onClick, ...buttonProps }) => {
  const [iconVisible, setIconVisible] = useState(false);
  const [iconPosition, setIconPosition] = useState({ top: 0, left: 0 });
  const elementRef = useRef(null);
  const timeoutRef = useRef();

  const handleClick = () => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      setIconPosition({
        top: rect.top + window.scrollY,
        left: rect.left + rect.width,
      });
      setIconVisible(true);

      timeoutRef.current = setTimeout(() => {
        setIconVisible(false);
      }, duration); // Icon visibility duration
    }

    if (buttonProps.onClick) {
      buttonProps.onClick();
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const iconStyle = {
    position: 'absolute',
    top: iconPosition.top,
    left: iconPosition.right,
    zIndex: 10000,
    opacity: iconVisible ? 1 : 0, // Toggle opacity based on visibility
    transition: 'opacity 0.5s ease-in-out', // Fade effect
  };

  return (
    <div ref={elementRef}>
      <Element {...buttonProps} onClick={() => {
        onClick();
        handleClick();
      }}>
        {children}
      </Element>

      <Box aria-label="feedback" style={iconStyle}>
        {icon}
      </Box>
    </div>
  );
};

export default IconOnClickElement;