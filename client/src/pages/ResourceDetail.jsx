import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import * as api from '../api'

const apiMap = {
  characters: { fetch: api.getCharacter },
  planets: { fetch: api.getPlanet },
  species: { fetch: api.getSpeciesById },
  starships: { fetch: api.getStarship },
  factions: { fetch: api.getFaction },
  movies: { fetch: api.getMovie },
}

const displayOrder = {
  characters: ['name', 'height', 'age', 'gender', 'species', 'planet', 'faction', 'description', 'movies'],
  planets: ['name', 'climate', 'terrain', 'population', 'description'],
  species: ['name', 'language', 'lifespan', 'description'],
  starships: ['name', 'model', 'manufacturer', 'crewCapacity', 'speed', 'description'],
  factions: ['name', 'alignment', 'description'],
  movies: ['title', 'episode', 'releaseDate', 'description'],
}

const fieldLabels = {
  name: 'Name', title: 'Title', height: 'Height (cm)', age: 'Age', gender: 'Gender',
  species: 'Species', planet: 'Homeworld', faction: 'Faction', description: 'Description',
  movies: 'Movies', climate: 'Climate', terrain: 'Terrain', population: 'Population',
  language: 'Language', lifespan: 'Lifespan (years)', model: 'Model', manufacturer: 'Manufacturer',
  crewCapacity: 'Crew Capacity', speed: 'Speed', alignment: 'Alignment', episode: 'Episode',
  releaseDate: 'Release Date',
}

const alignmentColors = {
  LIGHT: '#22c55e',
  DARK: '#ef4444',
  NEUTRAL: '#6b7280',
}

function formatValue(val) {
  if (val === null || val === undefined) return '—'
  if (Array.isArray(val)) return val.map((v) => v.name || v.title || v).join(', ') || '—'
  if (typeof val === 'object' && val.name) return <Link to={`/${val.id ? 'species' : 'planets'}/${val.id}`} className="related-link">{val.name}</Link>
  if (typeof val === 'object' && val.title) return <Link to={`/movies/${val.id}`} className="related-link">{val.title}</Link>
  if (typeof val === 'object') return JSON.stringify(val)
  if (typeof val === 'string' && val.includes('T')) return new Date(val).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  return val
}

function renderField(key, value, resource) {
  if (key === 'alignment' && value) {
    return (
      <span className="badge" style={{ backgroundColor: alignmentColors[value] || '#6b7280' }}>
        {value}
      </span>
    )
  }
  if (key === 'movies' && Array.isArray(value) && value.length > 0) {
    return (
      <div className="movie-list">
        {value.map((m, i) => (
          <Link key={i} to={`/movies/${m.id}`} className="related-link-tag">
            EP{m.episode || '—'}: {m.title}
          </Link>
        ))}
      </div>
    )
  }
  if (['species', 'planet', 'faction'].includes(key) && value && value.id) {
    const path = key === 'species' ? 'species' : key === 'planet' ? 'planets' : 'factions'
    return <Link to={`/${path}/${value.id}`} className="related-link">{value.name}</Link>
  }
  return formatValue(value)
}

export default function ResourceDetail({ resource }) {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    apiMap[resource].fetch(id)
      .then((res) => setData(res.data || res))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id, resource])

  if (loading) return <div className="loading"><div className="spinner" /></div>
  if (error) return <div className="error-message">Error: {error}</div>
  if (!data) return <div className="empty">Not found</div>

  const title = data.name || data.title
  const fields = displayOrder[resource]

  return (
    <div className="detail-page">
      <Link to={`/${resource}`} className="back-link">← Back to {resource}</Link>
      <div className="detail-card">
        <h1 className="detail-title">{title}</h1>
        <div className="detail-fields">
          {fields.map((f) => {
            const val = data[f]
            if (val === null || val === undefined || (Array.isArray(val) && val.length === 0)) return null
            return (
              <div key={f} className="detail-field">
                <span className="detail-label">{fieldLabels[f] || f}</span>
                <span className="detail-value">{renderField(f, val, resource)}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
