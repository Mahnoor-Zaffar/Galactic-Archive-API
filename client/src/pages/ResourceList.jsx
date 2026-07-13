import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import * as api from '../api'

const apiMap = {
  characters: { fetch: api.getCharacters, fields: ['name', 'species', 'planet', 'faction'], image: (d) => null },
  planets: { fetch: api.getPlanets, fields: ['name', 'climate', 'terrain', 'population'], image: (d) => null },
  species: { fetch: api.getSpecies, fields: ['name', 'language', 'lifespan'], image: (d) => null },
  starships: { fetch: api.getStarships, fields: ['name', 'model', 'manufacturer', 'crewCapacity'], image: (d) => null },
  factions: { fetch: api.getFactions, fields: ['name', 'alignment', 'description'], image: (d) => null },
  movies: { fetch: api.getMovies, fields: ['title', 'episode', 'releaseDate'], image: (d) => null },
}

const alignmentColors = {
  LIGHT: '#22c55e',
  DARK: '#ef4444',
  NEUTRAL: '#6b7280',
}

function formatValue(val) {
  if (val === null || val === undefined) return '—'
  if (typeof val === 'object' && val.name) return val.name
  if (typeof val === 'object' && val.title) return val.title
  if (typeof val === 'string' && val.includes('T')) return new Date(val).toLocaleDateString()
  if (typeof val === 'number' && val > 1000000) return `${(val / 1000000).toFixed(1)}M`
  if (typeof val === 'number' && val > 1000) return `${(val / 1000).toFixed(1)}K`
  return val
}

function getTitle(data, resource) {
  if (resource === 'movies') return data.title
  return data.name
}

export default function ResourceList({ resource, label, color }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  const page = searchParams.get('page') || '1'
  const search = searchParams.get('search') || ''
  const config = apiMap[resource]

  useEffect(() => {
    setLoading(true)
    config.fetch({ page, limit: 12, search })
      .then(setData)
      .finally(() => setLoading(false))
  }, [page, search])

  const updateParams = (key, value) => {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value)
    else next.delete(key)
    if (key === 'search') next.delete('page')
    setSearchParams(next)
  }

  return (
    <div className="resource-page">
      <div className="resource-header">
        <h1 style={{ color }}>{label}</h1>
        <div className="resource-controls">
          <input
            type="text"
            placeholder={`Search ${label.toLowerCase()}...`}
            value={search}
            onChange={(e) => updateParams('search', e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {loading && <div className="loading"><div className="spinner" /></div>}

      {data && (
        <>
          {data.data?.length === 0 ? (
            <div className="empty">No {label.toLowerCase()} found.</div>
          ) : (
            <div className="card-grid">
              {data.data.map((item) => (
                <Link to={`/${resource}/${item.id}`} key={item.id} className="card" style={{ borderTopColor: color }}>
                  <div className="card-emoji">{resource === 'characters' ? '👤' : resource === 'planets' ? '🌍' : resource === 'species' ? '🧬' : resource === 'starships' ? '🚀' : resource === 'factions' ? '⚔️' : '🎬'}</div>
                  <h3 className="card-title">{getTitle(item, resource)}</h3>
                  {resource === 'factions' && item.alignment && (
                    <span className="badge" style={{ backgroundColor: alignmentColors[item.alignment] || '#6b7280' }}>
                      {item.alignment}
                    </span>
                  )}
                  <div className="card-fields">
                    {config.fields.slice(1).map((f) => (
                      item[f] && (
                        <div key={f} className="card-field">
                          <span className="card-field-label">{f.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <span className="card-field-value">{formatValue(item[f])}</span>
                        </div>
                      )
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="pagination">
            <button
              disabled={!data.pagination?.hasPrevPage}
              onClick={() => updateParams('page', String(parseInt(page) - 1))}
              className="btn btn-pagination"
            >
              ← Prev
            </button>
            <span className="page-info">
              Page {data.pagination?.page} of {data.pagination?.totalPages}
            </span>
            <button
              disabled={!data.pagination?.hasNextPage}
              onClick={() => updateParams('page', String(parseInt(page) + 1))}
              className="btn btn-pagination"
            >
              Next →
            </button>
          </div>
        </>
      )}
    </div>
  )
}
