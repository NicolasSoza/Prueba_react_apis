// MiApi.js
import React, { useEffect, useState } from 'react';

const MiApi = ({ searchOption, searchValue }) => {
  const [sismos, setSismos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = 'https://api.gael.cloud/general/public/sismos';
        if (searchValue) {
          url += `?${searchOption}=${searchValue}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        setSismos(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching earthquake data:', error);
        setLoading(false);
        setError('Error al obtener los sismos');
      }
    };

    fetchData();
  }, [searchOption, searchValue]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Ordenar los sismos por magnitud de menor a mayor
  sismos.sort((a, b) => a.Fecha - b.Fecha);

  return (
    <div>
      <h2>Sismos</h2>
      <ul>
        {sismos.map((sismo, index) => {
          // Filtrar y mostrar los datos según la opción de búsqueda seleccionada
          let displayData = '';
        
          if (searchOption === 'refGeografica') {
            displayData = sismo.RefGeografica;
          } else if (searchOption === 'magnitud') {
            displayData = sismo.Magnitud;
          }
          else if (searchOption === 'fecha') {
            displayData = sismo.Fecha;
          }
          else if (searchOption === 'data') {
            displayData = JSON.stringify(sismo);
          }
          return (
            <li key={index}>
              {displayData}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MiApi;
