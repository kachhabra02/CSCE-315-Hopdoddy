/**
 * Main Application Module
 *
 * This module serves as the entry point for the application and contains the main App component.
 * It includes routing configuration, theme setup, and initialization of essential components and services.
 * The App component handles routing and provides a consistent theme for the entire application.
 *
 * @module App
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';

import Landing from './components/landing/Landing';
import Menu from './components/menu-board/MenuBoard';
import NavBar from './components/navbar/NavBar';
import NotFound from './components/NotFound';
import Cashier from "./components/Cashier.js";
import Customer from './components/Customer.js';

import { AuthProvider } from "./credentials/AuthProvider.js";
import { CashierGuard as CGuard, ManagerGuard as MGuard, AdminGuard as AGuard } from "./credentials/RouteGuards.js";

import AppBar from '@mui/material/AppBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ManagerHome from './components/manager/ManagerHome.js';
import { CssBaseline } from '@mui/material';
import MenuManagment from './components/manager/MenuManagment.js';
import Inventory from './components/manager/Inventory.js';
import PageInput, { routePageInput } from './components/manager/datetime-pages/PageInput.js';
import Restock from './components/manager/Restock.js';

import Sales from './components/manager/datetime-pages/Sales.js';
import Excess from './components/manager/datetime-pages/Excess.js';
import WhatSellsTogether from './components/manager/datetime-pages/WhatSellsTogether.js';
import History from './components/manager/datetime-pages/History.js';
import Usage from './components/manager/datetime-pages/Usage.js';
import { Auth0Provider } from "@auth0/auth0-react";
import Admin from './components/admin/Admin.js';

import { useState } from 'react';
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

/**
 * Creates a theme for Material-UI components.
 * @constant
 * @type {object}
 */
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#15622f',
    },
    secondary: {
      main: '#c74141',
    },
    info: {
      main: '#9021f3',
    },
  },
});

/**
 * Custom route function to handle creation of route guards.
 * @function
 * @param {string} path - The path for the route.
 * @param {React.Component} Element - The component to render for the route.
 * @param {React.Component} [Guard=({children}) => <>{children}</>] - Optional guard component to protect the route.
 * @returns {React.Component} - A Route component with optional guarding.
 */

const route = (path, Element, Guard=({children})=><>{children}</>) => (
  <Route path={path} element={<Guard> <Element /> </Guard>} />
);

/**
 * Loads the Google Translate script dynamically.
 * @function
 */
function loadGoogleTranslateScript() {
  // Check if script is already present
  const existingScript = document.getElementById('googleTranslateScript');
  if (!existingScript) {
    const script = document.createElement('script');
    script.id = 'googleTranslateScript';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(script);
  }
}

/**
 * Initializes the Google Translate component.
 * @function
 */
function googleTranslateElementInit() {
  new window.google.translate.TranslateElement({
    pageLanguage: 'en',
    layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
    autoDisplay: false
  }, 'google_translate_element');
}

/**
 * Main App component, serves as the root for all routing and state in the application.
 * @function
 * @returns {React.Component} The main app component containing all routes and theme providers.
 */
function App() {
  // Google Translate Implementation
  useEffect(() => {
    loadGoogleTranslateScript();
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);
  
  const [, setCart] = useState();
  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Auth0Provider 
        domain = {domain}
        clientId={clientId}
        redirectUri={window.location.origin}>
      <AuthProvider>
        <BrowserRouter>
          <AppBar position = 'fixed'> 
            <NavBar onUpdate={setCart}/>
          </AppBar>
          <Routes>
            {route('/', Landing)}
            {route('/admin', Admin, AGuard)}
            {route('/menu', Menu)}
            {route('*', NotFound)}
            {route('/cashier', Cashier, CGuard)}
            <Route path="/customer" element={<Customer onUpdate={setCart}/>} />
            {/* Weird redering if I use route() for Customer */}
            {/* suggest turning route() into RoutedElement({path, guard, children}) */}
            {/* To use it, do: <RoutedElement path={} guard={}>{children}</RoutedElement> */}
            {/* {route('/customer', () => <Customer onUpdate={setCart}/>)} */}
            {route('/manager', ManagerHome, MGuard)}
            {route('/manager/:inputPathID', PageInput, MGuard)}
            {route('/manager/menu', MenuManagment, MGuard)}
            {route('/manager/restock', Restock, MGuard)}
            {route('/manager/inventory', Inventory, MGuard)}
            {routePageInput(Sales)}
            {routePageInput(Excess)}
            {routePageInput(WhatSellsTogether)}
            {routePageInput(History)}
            {routePageInput(Usage)}
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      </Auth0Provider>
    </ThemeProvider>
  );
}

export default App;
