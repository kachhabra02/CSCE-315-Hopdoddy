/**
 * @fileoverview Entry point for the React application. 
 * Imports necessary modules and components, and renders the App component into the root of the HTML document.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Create a root element where the React application will be attached.
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside the root element in strict mode.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/**
 * Measures and reports web vitals for performance analysis. 
 * Currently, it's set up to log results to the console, but can be configured to report to an analytics endpoint.
 * More information: https://bit.ly/CRA-vitals
 */
reportWebVitals();