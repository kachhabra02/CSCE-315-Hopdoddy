import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Landing from './components/landing/Landing';
import Menu from './components/menu-board/MenuBoard';
import NavBar from './components/navbar/NavBar';
import NotFound from './components/NotFound';
import Cashier from "./components/Cashier.js";

import { AuthProvider } from "./credentials/AuthProvider.js";
import { CashierGuard } from "./credentials/RouteGuards.js";

import AppBar from '@mui/material/AppBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ManagerHome from './components/manager/ManagerHome.js';
import { CssBaseline } from '@mui/material';
import Trends from './components/manager/Trends.js';
import History from './components/manager/History.js';
import MenuManagment from './components/manager/MenuManagment.js';
import Inventory from './components/manager/Inventory.js';
import Reports from './components/manager/Reports.js';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const route = (path, Element, Guard=({children})=><>{children}</>) =>
  <Route path={path} element={<Guard> <Element /> </Guard>} />

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <AppBar position='static'>
            <NavBar />
          </AppBar>
          <Routes>
            {route('/', Landing)}
            {route('/menu', Menu)}
            {route('*', NotFound)}
            {route('/cashier', Cashier, CashierGuard)}
            {route('/manager', ManagerHome)}
            {route('/manager/reports', Reports)}
            {route('/manager/trends', Trends)}
            {route('/manager/history', History)}
            {route('/manager/menu', MenuManagment)}
            {route('/manager/inventory', Inventory)}
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
