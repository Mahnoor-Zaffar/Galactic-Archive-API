const API = 'https://galactic-archive-api.onrender.com/api/v1'

async function fetchResource(endpoint, params = {}) {
  const query = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== '')
  ).toString()
  const url = `${API}${endpoint}${query ? `?${query}` : ''}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}

export function getCharacters(params) {
  return fetchResource('/characters', params)
}

export function getCharacter(id) {
  return fetchResource(`/characters/${id}`)
}

export function getPlanets(params) {
  return fetchResource('/planets', params)
}

export function getPlanet(id) {
  return fetchResource(`/planets/${id}`)
}

export function getSpecies(params) {
  return fetchResource('/species', params)
}

export function getSpeciesById(id) {
  return fetchResource(`/species/${id}`)
}

export function getStarships(params) {
  return fetchResource('/starships', params)
}

export function getStarship(id) {
  return fetchResource(`/starships/${id}`)
}

export function getFactions(params) {
  return fetchResource('/factions', params)
}

export function getFaction(id) {
  return fetchResource(`/factions/${id}`)
}

export function getMovies(params) {
  return fetchResource('/movies', params)
}

export function getMovie(id) {
  return fetchResource(`/movies/${id}`)
}
