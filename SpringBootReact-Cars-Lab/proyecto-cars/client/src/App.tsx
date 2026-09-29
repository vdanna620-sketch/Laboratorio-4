import React from 'react';
import './App.css';
import CarList from './CarList';
import logo from './logo.svg';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Good Car - Catalogo de Vehiculos</h1>
      </header>

      <CarList />
    </div>
  );
};

export default App;
