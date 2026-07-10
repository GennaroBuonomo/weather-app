import { useState, useEffect } from 'react';
import { CloudSun, Wind, Droplets, CloudLightning, CloudRain } from 'lucide-react';
import './App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('Naples'); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const API_KEY = import.meta.env.VITE_API_KEY; 

  
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setCity(searchTerm);
    }
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error("Errore:", error);
      }
    };
    fetchWeather();
  }, [city]);

  return (
<div className="weather-dashboard">
      <nav className="navbar">
        <input 
         type="text"
         placeholder="Cerca la città"
         value={searchTerm}
         onChange={(e) => setSearchTerm(e.target.value)}
         onKeyDown={handleSearch}
         className="search-input"         
        />
      </nav>
      
      <main className="main-content">
{/* BLOCCO 1: METEO OGGI */}
{weather ? (
  <section className="weather-today">
    <div className="weather-header">
      <p>{weather.name}, {weather.sys.country}</p>
      <h2>{Math.round(weather.main.temp)}°</h2>
    </div>
    
    <div className="weather-details">
      {/* Uso le icone che abbiamo importato */}
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

        {/* BLOCCO: PREVISIONI */}
        <section className="forecast">
          <div className="forecast-nav">
            <span className="nav-item">Today</span>
            <span className="nav-item">Tomorrow</span>
            <span className="nav-item">Next 7 days</span>
          </div>

          <div className="forecast-grid">
            {[
              { day: "Mon", temp: "16°", icon: CloudSun },
              { day: "Tue", temp: "10°", icon: CloudLightning },
              { day: "Wed", temp: "15°", icon: CloudSun },
              { day: "Thu", temp: "11°", icon: CloudRain },
              { day: "Fri", temp: "18°", icon: CloudSun },
              { day: "Sat", temp: "12°", icon: CloudLightning },
              { day: "Sun", temp: "10°", icon: CloudRain }
            ].map((item,index) => (
              <div key={index} className="forecast-card">
                <span className="f-day">{item.day}</span>
                <item.icon size={28} color="#ffffff" strokeWidth={1.5} />
                <span className="f-temp">{item.temp}</span>
              </div>
            ))}
          </div>
        </section>
        {/* BLOCCO: GRAFICO PIOGGIA */}
        <section className="rain-chart">
          <h3>Chance of rain</h3>
          <div className="chart-container">
            {[
              { time: "10 AM", chance: 20 },
              { time: "11 AM", chance: 50 },
              { time: "12 PM", chance: 90 },
              { time: "01 PM", chance: 60 },
              { time: "02 PM", chance: 30 },
              { time: "03 PM", chance: 10 }
            ].map((item, index) => (
              <div key={index} className="bar-wrapper">
                <div className="bar" style={{ height: `${item.chance}%` }}></div>

                <span className="bar-time">{item.time}</span>

              </div>
            ))}
          </div>
        </section>
        {/* BLOCCO: MAPPA GLOBALE */}
        <section 
         className="global-map"
         onClick={() => window.open('https://www.windy.com', '_blank')}         
         >
          <div className="map-overlay-card">
            <h4>Explore global map of wind, weather and oceans condition.</h4>
            <button className="get-started-btn">Get started</button>
          </div>          
        </section>
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
