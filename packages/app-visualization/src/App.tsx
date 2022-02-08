import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import D3Page from './d3js';
import ECSYPage from './ecsyjs';

const App = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/d3" element={<D3Page />} />
        <Route path="/ecsy" element={<ECSYPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
