import { Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/Home'
import ResourceList from './pages/ResourceList'
import ResourceDetail from './pages/ResourceDetail'

const resources = [
  { path: 'characters', label: 'Characters', color: '#facc15' },
  { path: 'planets', label: 'Planets', color: '#22d3ee' },
  { path: 'species', label: 'Species', color: '#a78bfa' },
  { path: 'starships', label: 'Starships', color: '#fb923c' },
  { path: 'factions', label: 'Factions', color: '#f472b6' },
  { path: 'movies', label: 'Movies', color: '#34d399' },
]

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <NavLink to="/" className="logo">
          <span className="logo-icon">✦</span>
          <span className="logo-text">Galactic Archive</span>
        </NavLink>
        <nav className="nav">
          {resources.map((r) => (
            <NavLink
              key={r.path}
              to={`/${r.path}`}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              style={({ isActive }) => isActive ? { borderBottomColor: r.color, color: r.color } : {}}
            >
              {r.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          {resources.map((r) => (
            <Route key={r.path} path={`/${r.path}`} element={<ResourceList resource={r.path} label={r.label} color={r.color} />} />
          ))}
          {resources.map((r) => (
            <Route key={`${r.path}-detail`} path={`/${r.path}/:id`} element={<ResourceDetail resource={r.path} />} />
          ))}
        </Routes>
      </main>

      <footer className="footer">
        <span>Galactic Archive API</span>
        <a href="https://github.com/Mahnoor-Zaffar/Galactic-Archive-API" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://galactic-archive-api.onrender.com/api-docs" target="_blank" rel="noopener noreferrer">API Docs</a>
      </footer>
    </div>
  )
}
