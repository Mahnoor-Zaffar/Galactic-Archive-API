import { useState, useEffect } from 'react'
import * as api from '../api'

const fields = [
  { key: 'name', label: 'Name' },
  { key: 'height', label: 'Height (cm)', unit: 'cm' },
  { key: 'age', label: 'Age (years)', unit: 'yrs' },
  { key: 'gender', label: 'Gender' },
  { key: 'species', label: 'Species', nested: 'name' },
  { key: 'planet', label: 'Homeworld', nested: 'name' },
  { key: 'faction', label: 'Faction', nested: 'name' },
]

export default function Compare() {
  const [all, setAll] = useState([])
  const [selected, setSelected] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getCharacters({ limit: 100 })
      .then((res) => setAll(res.data || []))
      .finally(() => setLoading(false))
  }, [])

  const toggleCharacter = (char) => {
    if (selected.find((c) => c.id === char.id)) {
      setSelected(selected.filter((c) => c.id !== char.id))
    } else if (selected.length < 3) {
      setSelected([...selected, char])
    }
  }

  const getVal = (char, field) => {
    const val = field.nested ? char[field.key]?.[field.nested] : char[field.key]
    return val ?? '—'
  }

  const filtered = all.filter((c) =>
    c.name?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="compare-page">
      <h1 className="page-title">Character Comparison</h1>
      <p className="page-subtitle">Select up to 3 characters to compare side by side.</p>

      {loading ? (
        <div className="loading"><div className="spinner" /></div>
      ) : (
        <>
          <div className="compare-selector">
            <input
              type="text"
              placeholder="Search characters..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
            <div className="compare-chips">
              {filtered.slice(0, 10).map((c) => {
                const isSelected = selected.find((s) => s.id === c.id)
                return (
                  <button
                    key={c.id}
                    onClick={() => toggleCharacter(c)}
                    className={`chip ${isSelected ? 'chip-selected' : ''}`}
                    disabled={!isSelected && selected.length >= 3}
                  >
                    {c.name}
                  </button>
                )
              })}
            </div>
          </div>

          {selected.length === 0 ? (
            <div className="empty">Select characters above to compare.</div>
          ) : (
            <div className="compare-table-wrapper">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th className="compare-label">Attribute</th>
                    {selected.map((c) => (
                      <th key={c.id} className="compare-header">
                        {c.name}
                        <button
                          onClick={() => toggleCharacter(c)}
                          className="compare-remove"
                        >
                          ✕
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fields.map((f) => (
                    <tr key={f.key}>
                      <td className="compare-label">{f.label}</td>
                      {selected.map((c) => (
                        <td key={c.id} className="compare-cell">
                          {f.key === 'height' && typeof c.height === 'number' ? (
                            <span className={c.height > 180 ? 'highlight-green' : 'highlight-yellow'}>
                              {c.height} cm
                            </span>
                          ) : f.key === 'age' && typeof c.age === 'number' ? (
                            <span>{c.age} yrs</span>
                          ) : (
                            getVal(c, f)
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  )
}
