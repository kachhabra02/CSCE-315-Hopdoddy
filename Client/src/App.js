import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Landing from './Landing';
import Menu from './Menu';
import NavBar from './NavBar';
import NotFound from './NotFound';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/menu" element={<Menu />} />
          <Route element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
