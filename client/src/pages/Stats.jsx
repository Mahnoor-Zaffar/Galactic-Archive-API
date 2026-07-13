import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import * as api from '../api'

const COLORS = ['#facc15', '#22d3ee', '#a78bfa', '#fb923c', '#f472b6', '#34d399', '#ef4444', '#6b7280']

export default function Stats() {
  const [characters, setCharacters] = useState([])
  const [planets, setPlanets] = useState([])
  const [species, setSpecies] = useState([])
  const [factions, setFactions] = useState([])
  const [movies, setMovies] = useState([])
  const [starships, setStarships] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.getCharacters({ limit: 100 }),
      api.getPlanets({ limit: 50 }),
      api.getSpecies({ limit: 50 }),
      api.getFactions({ limit: 50 }),
      api.getMovies({ limit: 50 }),
      api.getStarships({ limit: 50 }),
    ]).then(([c, p, s, f, m, sh]) => {
      setCharacters(c.data || [])
      setPlanets(p.data || [])
      setSpecies(s.data || [])
      setFactions(f.data || [])
      setMovies(m.data || [])
      setStarships(sh.data || [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  if (loading) return <div className="loading"><div className="spinner" /></div>

  const speciesCounts = species.map((s) => ({
    name: s.name,
    count: characters.filter((c) => c.species?.name === s.name).length,
  }))

  const factionCounts = factions.map((f) => ({
    name: f.name,
    count: characters.filter((c) => c.faction?.name === f.name).length,
  }))

  const alignmentCounts = [
    { name: 'Light', value: factions.filter((f) => f.alignment === 'LIGHT').length },
    { name: 'Dark', value: factions.filter((f) => f.alignment === 'DARK').length },
    { name: 'Neutral', value: factions.filter((f) => f.alignment === 'NEUTRAL').length },
  ]

  const stats = [
    { label: 'Characters', value: characters.length, color: '#facc15', icon: '👤' },
    { label: 'Planets', value: planets.length, color: '#22d3ee', icon: '🌍' },
    { label: 'Species', value: species.length, color: '#a78bfa', icon: '🧬' },
    { label: 'Starships', value: starships.length, color: '#fb923c', icon: '🚀' },
    { label: 'Factions', value: factions.length, color: '#f472b6', icon: '⚔️' },
    { label: 'Movies', value: movies.length, color: '#34d399', icon: '🎬' },
  ]

  return (
    <div className="stats-page">
      <h1 className="page-title">Universe Statistics</h1>

      <div className="stats-grid">
        {stats.map((s) => (
          <div key={s.label} className="stat-card" style={{ borderTopColor: s.color }}>
            <span className="stat-card-icon">{s.icon}</span>
            <span className="stat-card-value" style={{ color: s.color }}>{s.value}</span>
            <span className="stat-card-label">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Characters per Species</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={speciesCounts.filter((s) => s.count > 0)} margin={{ top: 10, right: 10, left: 0, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e1e3a" />
              <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 11 }} angle={-35} textAnchor="end" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{ background: '#1a1a2e', border: '1px solid #1e1e3a', borderRadius: 8 }}
                itemStyle={{ color: '#e2e8f0' }}
              />
              <Bar dataKey="count" fill="#a78bfa" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Characters per Faction</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={factionCounts.filter((f) => f.count > 0)} margin={{ top: 10, right: 10, left: 0, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e1e3a" />
              <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 11 }} angle={-35} textAnchor="end" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{ background: '#1a1a2e', border: '1px solid #1e1e3a', borderRadius: 8 }}
                itemStyle={{ color: '#e2e8f0' }}
              />
              <Bar dataKey="count" fill="#f472b6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Faction Alignment Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={alignmentCounts}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {alignmentCounts.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={['#22c55e', '#ef4444', '#6b7280'][index]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: '#1a1a2e', border: '1px solid #1e1e3a', borderRadius: 8 }}
                itemStyle={{ color: '#e2e8f0' }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Movie Episodes</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={[...movies].sort((a, b) => (a.episode || 0) - (b.episode || 0))}
              margin={{ top: 10, right: 10, left: 0, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1e1e3a" />
              <XAxis dataKey="title" stroke="#94a3b8" tick={{ fontSize: 10 }} angle={-35} textAnchor="end" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{ background: '#1a1a2e', border: '1px solid #1e1e3a', borderRadius: 8 }}
                itemStyle={{ color: '#e2e8f0' }}
              />
              <Bar dataKey="episode" fill="#34d399" radius={[4, 4, 0, 0]} name="Episode" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
