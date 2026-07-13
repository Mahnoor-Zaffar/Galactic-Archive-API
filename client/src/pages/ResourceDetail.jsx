import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../AuthContext'
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
  movies: 'Movie Appearances', climate: 'Climate', terrain: 'Terrain', population: 'Population',
  language: 'Language', lifespan: 'Lifespan', model: 'Model', manufacturer: 'Manufacturer',
  crewCapacity: 'Crew Capacity', speed: 'Max Speed', alignment: 'Alignment', episode: 'Episode',
  releaseDate: 'Release Date',
}

const imageBg = {
  characters: 'facc15', planets: '22d3ee', species: 'a78bfa',
  starships: 'fb923c', factions: 'f472b6', movies: '34d399',
}

function renderValue(val, key) {
  if (val === null || val === undefined) return '—'
  if (Array.isArray(val) && val.length > 0) {
    return (
      <div className="movie-list">
        {val.map((m, i) => (
          <Link key={i} to={`/movies/${m.id}`} className="related-link-tag">
            {m.episode ? `EP${m.episode}: ` : ''}{m.title || m.name}
          </Link>
        ))}
      </div>
    )
  }
  if (key === 'releaseDate' && typeof val === 'string')
    return new Date(val).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  if (key === 'population' && typeof val === 'number' && val > 1_000_000)
    return `${(val / 1_000_000).toFixed(1)} million`
  if (key === 'crewCapacity' && typeof val === 'number')
    return val.toLocaleString()
  if (key === 'speed' && typeof val === 'number')
    return `${val} km/h`
  if (key === 'height' && typeof val === 'number')
    return `${val} cm`
  if (key === 'age' && typeof val === 'number')
    return `${val} years`
  if (key === 'lifespan' && typeof val === 'number')
    return `${val} years`
  if (typeof val === 'object' && val.name)
    return <Link to={`/${key === 'planet' ? 'planets' : key === 'species' ? 'species' : 'factions'}/${val.id}`} className="related-link">{val.name}</Link>
  if (key === 'alignment')
    return <span className={`align-badge align-${val?.toLowerCase()}`}>{val}</span>
  return val
}

export default function ResourceDetail({ resource }) {
  const { id } = useParams()
  const { isAdmin, token } = useAuth()
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
  const imgUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(title)}&background=${imageBg[resource]}&color=fff&size=200&bold=true&font-size=0.5`

  return (
    <div className="detail-page">
      <Link to={`/${resource}`} className="back-link">← Back to {resource}</Link>
      <div className="detail-card">
        <div className="detail-hero">
          <img src={imgUrl} alt={title} className="detail-img" />
          <div>
            <h1 className="detail-title">{title}</h1>
            {resource === 'characters' && data.faction && (
              <span className={`align-badge align-${data.faction.alignment?.toLowerCase()}`}>
                {data.faction.alignment}
              </span>
            )}
          </div>
        </div>
        <div className="detail-fields">
          {fields.map((f) => {
            const val = data[f]
            const rendered = renderValue(val, f)
            if (rendered === null || rendered === '—' || (Array.isArray(val) && val.length === 0)) return null
            return (
              <div key={f} className="detail-field">
                <span className="detail-label">{fieldLabels[f] || f}</span>
                <span className="detail-value">{rendered}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
