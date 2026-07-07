import { useState, useEffect } from 'react';
import { CloudSun, Wind, Droplets } from 'lucide-react';
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
      {/* Usiamo le icone che abbiamo importato */}
      <div className="detail-item">
        <Droplets size={20} color="#a0a0a0" />
        <p>Umidità: {weather.main.humidity}%</p>
      </div>
      <div className="detail-item">
        <Wind size={20} color="#a0a0a0" />
        <p>Vento: {weather.wind.speed} km/h</p>
      </div>
    </div>
  </section>
) : <p>Caricamento...</p>}

        {/* BLOCCHI AGGIUNTIVI (da riempire dopo) */}
        <section className="forecast">Previsioni 7 giorni</section>
        <section className="rain-chart">Grafico Pioggia</section>
        <section className="global-map">Mappa</section>
        <aside className="other-cities">
          <h3>Other Large Cities</h3>
  <div className="city-list">
    {[
      { name: "California", temp: "29°", desc: "Sunny" },
      { name: "Beijing", temp: "19°", desc: "Cloudy" },
      { name: "Jerusalem", temp: "31°", desc: "Sunny" }
    ].map((city, index) => (
      <div key={index} className="city-item">
        <div>
          <p className="city-name">{city.name}</p>
          <p className="city-desc">{city.desc}</p>
        </div>
        <span className="city-temp">{city.temp}</span>
      </div>
    ))}
  </div>
        </aside>
      </main>
    </div>
  );
}

export default App;
