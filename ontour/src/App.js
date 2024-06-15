import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Artist from './pages/Artist';
import Results from './pages/Results';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/artist" element={<Artist/>} />
          <Route path="/results" element={<Results/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
