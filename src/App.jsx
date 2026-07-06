import './App.css'

function App() {

  return (
    <div className="weather-dashboard">
      <nav className="nav-bar">Navbar</nav>
      <main className="main-content">
        <section className="weather-today">Meteo Oggi</section>
        <section className="forecast">Previsioni 7gg</section>
        <section className="rain-chart">Grafico Pioggia</section>
        <section className="global-map">Mappa</section>
        <aside className="other-cities">Altre città</aside>
      </main>
    </div>
  )
}

export default App
