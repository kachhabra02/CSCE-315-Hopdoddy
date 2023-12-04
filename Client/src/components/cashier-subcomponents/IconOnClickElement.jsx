import React, { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';

const IconOnClickElement = ({ Element, children, icon, onClick, ...buttonProps }) => {
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

      setTimeout(() => {
        setIconVisible(false);
      }, 2000); // Icon visibility duration
    }

    // If there's any additional click handler passed in the props
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

  return (
    <div ref={elementRef}>
      <Element {...buttonProps} onClick={() => {
        onClick();
        handleClick();
      }}>
        {children}
      </Element>

      {iconVisible && icon && (
        <Box
          aria-label="feedback"
          style={{
            position: 'absolute',
            top: iconPosition.top,
            left: iconPosition.right,
            zIndex: 10000
          }}
        >
          {icon}
        </Box>
      )}
    </div>
  );
};

export default IconOnClickElement;