import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import * as api from '../api'
import EntityCard from '../components/EntityCard'

const configs = {
  characters: { fetch: api.getCharacters, filterFields: ['speciesId', 'planetId', 'factionId'] },
  planets: { fetch: api.getPlanets, filterFields: ['climate'] },
  species: { fetch: api.getSpecies, filterFields: ['language'] },
  starships: { fetch: api.getStarships, filterFields: ['manufacturer'] },
  factions: { fetch: api.getFactions, filterFields: ['alignment'] },
  movies: { fetch: api.getMovies, filterFields: [] },
}

export default function ResourceList({ resource, label, color }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

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

  const items = data?.data || []
  const pagination = data?.pagination

  return (
    <div className="resource-page">
      <div className="resource-header">
        <h1 className="resource-title" style={{ color }}>{label}</h1>
        <div className="resource-controls">
          {filters.map((f) => (
            <input
              key={f.key}
              type="text"
              placeholder={`Filter ${f.label}...`}
              value={f.value}
              onChange={(e) => upd(f.key, e.target.value)}
              className="search-input filter-input"
            />
          ))}
          <div className="search-wrap">
            <span className="search-icon">⌕</span>
            <input
              type="text"
              placeholder={`Search ${label.toLowerCase()}...`}
              value={search}
              onChange={(e) => upd('search', e.target.value)}
              className="search-input search-main"
            />
          </div>
        </div>
      </div>

      {loading && <div className="loading"><div className="spinner" /></div>}

      {data && (
        <>
          {items.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">⟡</span>
              <p>No {label.toLowerCase()} found matching your criteria.</p>
              <button onClick={() => setSearchParams({})} className="btn btn-pagination">Clear Filters</button>
            </div>
          ) : (
            <>
              <div className="entity-grid">
                {items.map((item) => (
                  <EntityCard key={item.id} item={item} resource={resource} color={color} />
                ))}
              </div>

              {pagination && (
                <div className="pagination">
                  <button
                    disabled={!pagination.hasPrevPage}
                    onClick={() => upd('page', String(parseInt(page) - 1))}
                    className="btn btn-pagination"
                  >
                    ← Prev
                  </button>
                  <div className="page-info">
                    <span className="page-current">{pagination.page}</span>
                    <span className="page-sep">/</span>
                    <span className="page-total">{pagination.totalPages}</span>
                    <span className="page-count">({pagination.total} total)</span>
                  </div>
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
        </>
      )}
    </div>
  )
}
