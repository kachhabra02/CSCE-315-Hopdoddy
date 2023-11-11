import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Landing from './components/landing/Landing';
import Menu from './components/menu-board/MenuBoard';
import NavBar from './components/navbar/NavBar';
import NotFound from './components/NotFound';
import Cashier from "./components/Cashier.js";

import { AuthProvider } from "./credentials/AuthProvider.js";
import { CashierGuard as CGuard, ManagerGuard as MGuard } from "./credentials/RouteGuards.js";

import AppBar from '@mui/material/AppBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ManagerHome from './components/manager/ManagerHome.js';
import { CssBaseline } from '@mui/material';
import Trends from './components/manager/Trends.js';
import History from './components/manager/History.js';
import MenuManagment from './components/manager/MenuManagment.js';
import Inventory from './components/manager/Inventory.js';
import Reports from './components/manager/reports/Reports.js';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const route = (path, Element, Guard=({children})=><>{children}</>) => (
  <Route path={path} element={<Guard> <Element /> </Guard>} />
);

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
            {route('/cashier', Cashier, CGuard)}
            {route('/manager', ManagerHome, MGuard)}
            {route('/manager/reports', Reports, MGuard)}
            {route('/manager/trends', Trends, MGuard)}
            {route('/manager/history', History, MGuard)}
            {route('/manager/menu', MenuManagment, MGuard)}
            {route('/manager/inventory', Inventory, MGuard)}
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
