import React, { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';

/**
 * This module provides the `IconOnClickElement` component, which allows you to attach an icon that appears
 * when an element is clicked and fades out after a specified duration.
 * @module IconOnClickElement
 */

/**
 * A component that displays an icon next to a given element when clicked,
 * providing visual feedback to the user.
 *
 * @component
 * @param {object} props - The component's properties.
 * @param {React.ElementType} props.Element - The element to which the click event is attached.
 * @param {React.ReactNode} props.children - The content to be displayed within the element.
 * @param {React.ReactNode} props.icon - The icon to be displayed when the element is clicked.
 * @param {number} props.duration - The duration (in milliseconds) for which the icon is displayed.
 * @param {Function} props.onClick - The click event handler for the element.
 * @param {object} props.buttonProps - Additional props to be passed to the element.
 * @returns {React.Component} The rendered component.
 */
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
      }, duration);
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