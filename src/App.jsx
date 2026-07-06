import './App.css'

function App() {

  return (
    <div className="weather-dashboard">
      <nav className="nav-bar">Navbar</nav>
      <main className="main-content">
        <section className="weather-today">
          <div className="weather-header">
            <p>Seattle, Australia</p>
            <h2>16°</h2>
          </div>
          <div className="weather-details">
            <p>Real Feel: 15°</p>
            <p>Wind: 5 km/h</p>
            <p>Humidity: 57%</p>
          </div>
        </section>
        <section className="forecast">Previsioni 7gg</section>
        <section className="rain-chart">Grafico Pioggia</section>
        <section className="global-map">Mappa</section>
        <aside className="other-cities">Altre città</aside>
      </main>
    </div>
  )
}

export default App
