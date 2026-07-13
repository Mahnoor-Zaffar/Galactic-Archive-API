import { Link } from 'react-router-dom'
import { getCharacterImage, getFactionStyle, getAlignmentStyle, factionEmojis } from '../data/characterImages'

function fmt(val) {
  if (val === null || val === undefined) return null
  if (typeof val === 'object' && val.name) return val.name
  if (typeof val === 'object' && val.title) return val.title
  if (typeof val === 'string' && val.includes('T')) return new Date(val).toLocaleDateString()
  if (typeof val === 'number' && val > 1_000_000) return `${(val / 1_000_000).toFixed(1)}M`
  if (typeof val === 'number' && val > 1_000) return `${(val / 1_000).toFixed(1)}K`
  return val
}

export default function EntityCard({ item, resource, color }) {
  const title = resource === 'movies' ? item.title : item.name
  const imageUrl = resource === 'characters' ? getCharacterImage(title) : null
  const factionName = item.faction?.name
  const alignment = resource === 'characters' ? item.faction?.alignment : item.alignment

  const faction = factionName ? getFactionStyle(factionName) : null
  const align = alignment ? getAlignmentStyle(alignment) : null
  const glowColor = faction?.glow || align?.glow || color || '#facc15'
  const cardBg = faction?.gradient || align?.gradient || `linear-gradient(135deg, #0f0f1e 0%, #0a0a14 100%)`

  const fields = {
    characters: ['species', 'planet', 'faction'],
    planets: ['climate', 'terrain', 'population'],
    species: ['language', 'lifespan'],
    starships: ['model', 'manufacturer', 'crewCapacity'],
    factions: ['alignment'],
    movies: ['episode', 'releaseDate'],
  }[resource] || []

  if (resource === 'factions' && item.alignment) {
    item._alignEmoji = align?.emoji || ''
  }

  return (
    <Link to={`/${resource}/${item.id}`} className="entity-card" style={{ background: cardBg }}>
      <div className="entity-card-glow" style={{ boxShadow: `0 0 40px ${glowColor}15` }} />
      <div className="entity-card-border" style={{ borderColor: `${glowColor}30` }} />

      {resource === 'characters' && (
        <div className="entity-card-media">
          {imageUrl ? (
            <img src={imageUrl} alt={title} className="entity-card-img" loading="lazy" />
          ) : (
            <div className="entity-card-img-placeholder" style={{ background: `${glowColor}20` }}>
              <span style={{ color: glowColor, fontSize: '1.5rem' }}>✦</span>
            </div>
          )}
          {alignment && (
            <span className="entity-alignment-badge" style={{
              background: align.glow,
              boxShadow: `0 0 12px ${align.glow}50`,
            }}>
              {alignment}
            </span>
          )}
        </div>
      )}

      {(resource !== 'characters') && (
        <div className="entity-card-icon-wrap">
          {resource === 'planets' && <span className="entity-card-icon" style={{ color: glowColor }}>🌍</span>}
          {resource === 'species' && <span className="entity-card-icon" style={{ color: glowColor }}>🧬</span>}
          {resource === 'starships' && <span className="entity-card-icon" style={{ color: glowColor }}>🚀</span>}
          {resource === 'factions' && <span className="entity-card-icon" style={{ color: glowColor }}>{item._alignEmoji || '⚔️'}</span>}
          {resource === 'movies' && <span className="entity-card-icon" style={{ color: glowColor }}>🎬</span>}
          {alignment && (
            <span className="entity-alignment-badge" style={{
              background: align.glow,
              boxShadow: `0 0 12px ${align.glow}50`,
            }}>
              {alignment}
            </span>
          )}
        </div>
      )}

      <div className="entity-card-body">
        <h3 className="entity-card-title" style={{ color: glowColor }}>{title}</h3>

        <div className="entity-card-stats">
          {fields.map((f) => {
            const val = fmt(item[f])
            if (!val) return null
            const label = f === 'crewCapacity' ? 'Crew' :
              f === 'releaseDate' ? 'Released' :
              f === 'episode' ? 'EP' :
              f.charAt(0).toUpperCase() + f.slice(1)
            return (
              <div key={f} className="entity-stat">
                <span className="entity-stat-label">{label}</span>
                <span className="entity-stat-value">{val}</span>
              </div>
            )
          })}
        </div>

        {factionName && (
          <div className="entity-card-faction" style={{ color: faction?.badge || glowColor }}>
            {factionEmojis[factionName] || ''} {factionName}
          </div>
        )}
      </div>
    </Link>
  )
}
