import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Landing from './components/Landing';
import Menu from './components/Menu';
import NavBar from './components/NavBar';
import NotFound from './components/NotFound';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
