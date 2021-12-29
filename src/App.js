import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Home from './components/Home'
import Parking from './components/Parking';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="parking" element={<Parking />} />
      </Routes>
    </div>
  );
}

export default App;
