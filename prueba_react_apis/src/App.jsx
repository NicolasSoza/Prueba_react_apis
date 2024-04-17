
import React, { useState } from 'react';
import MiApi from './components/MiApi';
import './App.css';

function App() {
  const [searchOption, setSearchOption] = useState('opcion');
  const [searchValue, setSearchValue] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchValue) {
      setError('Por favor, ingresa un valor de búsqueda');
      return;
    }
    setError('');
  };

  return (
    <div className="App">
      <h1>Ultimos 15 movimientos teluricos en Chile</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="searchOption"></label>
        <select id="searchOption" value={searchOption} onChange={(e) => setSearchOption(e.target.value)}>
          <option value="opcion">Selecciona una opcion</option>
          <option value="refGeografica">Ref. Geográfica</option>
          <option value="magnitud">Magnitud</option>
          <option value="fecha">Fecha</option>
          <option value="data">Data completa</option>
        </select>
        
        
      </form>
      {error && <p>{error}</p>}
      <MiApi searchOption={searchOption} searchValue={searchValue} />
    </div>
  );
}

export default App;
