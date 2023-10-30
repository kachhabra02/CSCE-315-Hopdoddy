import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Landing from './components/Landing';
import Menu from './components/MenuBoard';
import NavBar from './components/NavBar';
import NotFound from './components/NotFound';

import Cashier from "./components/Cashier.js"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/cashier" element={<Cashier />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
