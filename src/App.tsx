import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Calculator from './components/Calculator';
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Calculator />} />
      </Route>
    </Routes>
  );
}

export default App;