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

const route = (path, Element, Guard=({children})=><>{children}</>) => (
  <Route path={path} element={<Guard> <Element /> </Guard>} />
);

// Loads the script
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

// Initializes the google translate component
function googleTranslateElementInit() {
  new window.google.translate.TranslateElement({
    pageLanguage: 'en',
    layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
    autoDisplay: false
  }, 'google_translate_element');
}

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
