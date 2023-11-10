import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Landing from './components/landing/Landing';
import Menu from './components/menu-board/MenuBoard';
import NavBar from './components/navbar/NavBar';
import NotFound from './components/NotFound';

import Cashier from "./components/Cashier.js"

import AppBar from '@mui/material/AppBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ManagerHome from './components/manager/ManagerHome.js';
import { CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider className="App" theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppBar position = 'static'>
          <NavBar />
        </AppBar>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/cashier" element={<Cashier />} />
          <Route path='/manager' element={<ManagerHome />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
