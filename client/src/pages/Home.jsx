import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-badge">✦ Public API Platform</div>
        <h1 className="hero-title">Galactic Archive</h1>
        <p className="hero-subtitle">
          A production-grade REST API and interactive dashboard for exploring a fictional universe.
          Browse characters, planets, species, starships, factions, and movies.
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
            <span className="stat-number">10</span>
            <span className="stat-label">Starships</span>
          </div>
          <div className="stat">
            <span className="stat-number">8</span>
            <span className="stat-label">Factions</span>
          </div>
          <div className="stat">
            <span className="stat-number">9</span>
            <span className="stat-label">Movies</span>
          </div>
        </div>
        <div className="hero-cta">
          <Link to="/characters" className="btn btn-primary">Browse Characters</Link>
          <Link to="/planets" className="btn btn-secondary">Explore Planets</Link>
          <Link to="/stats" className="btn btn-secondary">View Stats</Link>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">🔍</div>
          <h3>Search & Filter</h3>
          <p>Find any entity by name, species, faction, or homeworld with instant results.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3>Universe Stats</h3>
          <p>Interactive charts showing character distribution, faction alignment, and more.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">⚖️</div>
          <h3>Compare</h3>
          <p>Select up to 3 characters and compare their attributes side by side.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔗</div>
          <h3>Related Data</h3>
          <p>Every character links to their species, homeworld, faction, and movie appearances.</p>
        </div>
      </section>

      <section className="quick-links">
        <h2 className="section-title">Explore the Universe</h2>
        <div className="resource-links">
          {[
            { path: 'characters', label: 'Characters', desc: '25+ heroes, villains, and droids', color: '#facc15', icon: '👤' },
            { path: 'planets', label: 'Planets', desc: 'From Tatooine to Coruscant', color: '#22d3ee', icon: '🌍' },
            { path: 'species', label: 'Species', desc: 'Humans, Wookiees, Droids & more', color: '#a78bfa', icon: '🧬' },
            { path: 'starships', label: 'Starships', desc: 'X-Wings, Star Destroyers & the Falcon', color: '#fb923c', icon: '🚀' },
            { path: 'factions', label: 'Factions', desc: 'Jedi, Sith, Empire & Rebellion', color: '#f472b6', icon: '⚔️' },
            { path: 'movies', label: 'Movies', desc: 'All 9 saga episodes', color: '#34d399', icon: '🎬' },
          ].map((r) => (
            <Link key={r.path} to={`/${r.path}`} className="resource-link-card" style={{ borderLeftColor: r.color }}>
              <span className="rl-icon">{r.icon}</span>
              <div>
                <h4 style={{ color: r.color }}>{r.label}</h4>
                <p>{r.desc}</p>
              </div>
              <span className="rl-arrow" style={{ color: r.color }}>→</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
