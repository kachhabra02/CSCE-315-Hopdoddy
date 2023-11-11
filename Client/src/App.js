import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Landing from './components/landing/Landing';
import Menu from './components/menu-board/MenuBoard';
import NavBar from './components/navbar/NavBar';
import NotFound from './components/NotFound';
import Cashier from "./components/Cashier.js";
import Customer from './components/Customer.js';

import { AuthProvider } from "./credentials/AuthProvider.js";
import { CashierGuard } from "./credentials/RouteGuards.js";

import AppBar from '@mui/material/AppBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, grey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
  return (
    <ThemeProvider className="App" theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <AppBar position = 'static'>
            <NavBar />
          </AppBar>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cashier" element={<CashierGuard><Cashier /></CashierGuard>} />
            <Route path="/customer" element={<Customer />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>);
}

export default App;
