import React from 'react';
import './App.css';
import Header from './components/Header';
import Table from './components/Table';
import DataProvider from './context/DataContext';

function App() {
  return (
    <DataProvider>
      <Header />
      <Table />
    </DataProvider>
  );
}

export default App;
