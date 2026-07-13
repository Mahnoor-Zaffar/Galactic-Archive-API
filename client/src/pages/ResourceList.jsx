import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import * as api from '../api'

const configs = {
  characters: {
    fetch: api.getCharacters,
    fields: ['name', 'species', 'planet', 'faction'],
    image: (d) => `https://ui-avatars.com/api/?name=${encodeURIComponent(d.name)}&background=facc15&color=fff&size=80&bold=true`,
    filterFields: ['speciesId', 'planetId', 'factionId'],
  },
  planets: {
    fetch: api.getPlanets,
    fields: ['name', 'climate', 'terrain', 'population'],
    image: (d) => `https://ui-avatars.com/api/?name=${encodeURIComponent(d.name)}&background=22d3ee&color=fff&size=80&bold=true`,
    filterFields: ['climate'],
  },
  species: {
    fetch: api.getSpecies,
    fields: ['name', 'language', 'lifespan'],
    image: (d) => `https://ui-avatars.com/api/?name=${encodeURIComponent(d.name)}&background=a78bfa&color=fff&size=80&bold=true`,
    filterFields: ['language'],
  },
  starships: {
    fetch: api.getStarships,
    fields: ['name', 'model', 'manufacturer', 'crewCapacity'],
    image: (d) => `https://ui-avatars.com/api/?name=${encodeURIComponent(d.name)}&background=fb923c&color=fff&size=80&bold=true`,
    filterFields: ['manufacturer'],
  },
  factions: {
    fetch: api.getFactions,
    fields: ['name', 'alignment'],
    image: (d) => `https://ui-avatars.com/api/?name=${encodeURIComponent(d.name)}&background=f472b6&color=fff&size=80&bold=true`,
    filterFields: ['alignment'],
  },
  movies: {
    fetch: api.getMovies,
    fields: ['title', 'episode', 'releaseDate'],
    image: (d) => `https://ui-avatars.com/api/?name=${encodeURIComponent(d.title)}&background=34d399&color=fff&size=80&bold=true`,
    filterFields: [],
  },
}

const alignmentBgs = { LIGHT: '#22c55e', DARK: '#ef4444', NEUTRAL: '#6b7280' }

function fmt(val) {
  if (val === null || val === undefined) return '—'
  if (typeof val === 'object' && val.name) return val.name
  if (typeof val === 'object' && val.title) return val.title
  if (typeof val === 'string' && val.includes('T')) return new Date(val).toLocaleDateString()
  if (typeof val === 'number' && val > 1_000_000) return `${(val / 1_000_000).toFixed(1)}M`
  if (typeof val === 'number' && val > 1_000) return `${(val / 1_000).toFixed(1)}K`
  return val
}

function title(d, r) { return r === 'movies' ? d.title : d.name }

export default function ResourceList({ resource, label, color }) {
  const { isAdmin, token } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [options, setOptions] = useState({})

  const page = searchParams.get('page') || '1'
  const search = searchParams.get('search') || ''
  const cfg = configs[resource]

  useEffect(() => {
    const q = { page, limit: 12, search }
    cfg.filterFields.forEach((f) => {
      const v = searchParams.get(f)
      if (v) q[f] = v
    })
    setLoading(true)
    cfg.fetch(q).then(setData).finally(() => setLoading(false))
  }, [page, search, searchParams.toString()])

  useEffect(() => {
    if (cfg.filterFields.length > 0) {
      api.getCharacters({ limit: 100 }).then((d) => {
        setOptions({ species: d.data || [] })
      })
    }
  }, [])

  const upd = (k, v) => {
    const n = new URLSearchParams(searchParams)
    if (v) n.set(k, v); else n.delete(k)
    if (k !== 'page') n.delete('page')
    setSearchParams(n)
  }

  const filters = cfg.filterFields.map((f) => ({
    key: f,
    label: f.replace('Id', '').replace(/([A-Z])/g, ' $1').trim(),
    value: searchParams.get(f) || '',
  }))

  const filteredData = data?.data || []
  const pagination = data?.pagination

  return (
    <div className="resource-page">
      <div className="resource-header">
        <h1 style={{ color }}>{label}</h1>
        <div className="resource-controls">
          {filters.map((f) => (
            <input
              key={f.key}
              type="text"
              placeholder={`Filter by ${f.label}...`}
              value={f.value}
              onChange={(e) => upd(f.key, e.target.value)}
              className="search-input filter-input"
            />
          ))}
          <input
            type="text"
            placeholder={`Search ${label.toLowerCase()}...`}
            value={search}
            onChange={(e) => upd('search', e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {loading && <div className="loading"><div className="spinner" /></div>}

      {data && (
        <>
          {filteredData.length === 0 ? (
            <div className="empty">No {label.toLowerCase()} found.</div>
          ) : (
            <div className="card-grid">
              {filteredData.map((item) => (
                <Link to={`/${resource}/${item.id}`} key={item.id} className="card" style={{ borderTopColor: color }}>
                  <div className="card-img-wrap">
                    <img src={cfg.image(item)} alt={title(item, resource)} className="card-img" />
                    {resource === 'factions' && item.alignment && (
                      <span className="badge" style={{ backgroundColor: alignmentBgs[item.alignment] || '#6b7280' }}>
                        {item.alignment}
                      </span>
                    )}
                  </div>
                  <h3 className="card-title">{title(item, resource)}</h3>
                  <div className="card-fields">
                    {cfg.fields.slice(1).map((f) =>
                      item[f] ? (
                        <div key={f} className="card-field">
                          <span className="card-field-label">{f.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <span className="card-field-value">{fmt(item[f])}</span>
                        </div>
                      ) : null
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}

          {pagination && (
            <div className="pagination">
              <button
                disabled={!pagination.hasPrevPage}
                onClick={() => upd('page', String(parseInt(page) - 1))}
                className="btn btn-pagination"
              >
                ← Prev
              </button>
              <span className="page-info">Page {pagination.page} of {pagination.totalPages}</span>
              <button
                disabled={!pagination.hasNextPage}
                onClick={() => upd('page', String(parseInt(page) + 1))}
                className="btn btn-pagination"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
