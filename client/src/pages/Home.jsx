import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1 className="hero-title">Galactic Archive</h1>
        <p className="hero-subtitle">
          Explore the universe. Browse characters, planets, species, starships, factions, and movies
          from a galaxy far, far away.
        </p>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">25+</span>
            <span className="stat-label">Characters</span>
          </div>
          <div className="stat">
            <span className="stat-number">10</span>
            <span className="stat-label">Planets</span>
          </div>
          <div className="stat">
            <span className="stat-number">10</span>
            <span className="stat-label">Species</span>
          </div>
          <div className="stat">
            <span className="stat-number">9</span>
            <span className="stat-label">Movies</span>
          </div>
        </div>
        <div className="hero-cta">
          <Link to="/characters" className="btn btn-primary">Browse Characters</Link>
          <Link to="/planets" className="btn btn-secondary">Explore Planets</Link>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">🔍</div>
          <h3>Search</h3>
          <p>Find any character, planet, or starship by name or description.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📄</div>
          <h3>Paginated</h3>
          <p>Browse through pages of results with clean navigation.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔗</div>
          <h3>Related Data</h3>
          <p>Characters link to their species, homeworld, faction, and movies.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>Live API</h3>
          <p>Powered by a production REST API built with Node.js and PostgreSQL.</p>
        </div>
      </section>
    </div>
  )
}
