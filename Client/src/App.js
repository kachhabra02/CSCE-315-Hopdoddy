import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Landing from './components/landing/Landing';
import Menu from './components/menu-board/MenuBoard';
import NavBar from './components/navbar/NavBar';
import NotFound from './components/NotFound';

import Cashier from "./components/Cashier.js"

import AppBar from '@mui/material/AppBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, grey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider className="App" theme={theme}>
      <BrowserRouter>
        <AppBar position = 'static'>
          <NavBar />
        </AppBar>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/cashier" element={<Cashier />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
