import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import D3Page from './d3js';

const App = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/d3" element={<D3Page />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
