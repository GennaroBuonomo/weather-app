import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const API_KEY = import.meta.env.VITE_API_KEY; 
  const city = 'Naples';

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();
        setWeather(data);
        console.log(data); 
      } catch (error) {
        console.error("Errore nel recupero dati:", error);
      }
    };

    fetchWeather();
  }, []);

  return (
<div className="weather-dashboard">
      <nav className="navbar">Cerca città...</nav>
      
      <main className="main-content">
        {/* BLOCCO 1: METEO OGGI */}
        {weather ? (
          <section className="weather-today">
            <div className="weather-header">
              <p>{weather.name}, {weather.sys.country}</p>
              <h2>{Math.round(weather.main.temp)}°</h2>
            </div>
            <div className="weather-details">
              <p>Real Feel: {Math.round(weather.main.feels_like)}°</p>
              <p>Wind: {weather.wind.speed} km/h</p>
              <p>Humidity: {weather.main.humidity}%</p>
            </div>
          </section>
        ) : <p>Caricamento...</p>}

        {/* BLOCCHI AGGIUNTIVI (da riempire dopo) */}
        <section className="forecast">Previsioni 7 giorni</section>
        <section className="rain-chart">Grafico Pioggia</section>
        <section className="global-map">Mappa</section>
        <aside className="other-cities">Altre città</aside>
      </main>
    </div>
  );
}

export default App;
