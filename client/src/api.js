const API = 'https://galactic-archive-api.onrender.com/api/v1'

async function apiFetch(endpoint, options = {}) {
  const res = await fetch(`${API}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || `API error: ${res.status}`)
  return json
}

export function getCharacters(params) {
  const q = new URLSearchParams(Object.entries(params).filter(([, v]) => v)).toString()
  return apiFetch(`/characters${q ? `?${q}` : ''}`)
}

export function getCharacter(id) {
  return apiFetch(`/characters/${id}`)
}

export function getPlanets(params) {
  const q = new URLSearchParams(Object.entries(params).filter(([, v]) => v)).toString()
  return apiFetch(`/planets${q ? `?${q}` : ''}`)
}

export function getPlanet(id) {
  return apiFetch(`/planets/${id}`)
}

export function getSpecies(params) {
  const q = new URLSearchParams(Object.entries(params).filter(([, v]) => v)).toString()
  return apiFetch(`/species${q ? `?${q}` : ''}`)
}

export function getSpeciesById(id) {
  return apiFetch(`/species/${id}`)
}

export function getStarships(params) {
  const q = new URLSearchParams(Object.entries(params).filter(([, v]) => v)).toString()
  return apiFetch(`/starships${q ? `?${q}` : ''}`)
}

export function getStarship(id) {
  return apiFetch(`/starships/${id}`)
}

export function getFactions(params) {
  const q = new URLSearchParams(Object.entries(params).filter(([, v]) => v)).toString()
  return apiFetch(`/factions${q ? `?${q}` : ''}`)
}

export function getFaction(id) {
  return apiFetch(`/factions/${id}`)
}

export function getMovies(params) {
  const q = new URLSearchParams(Object.entries(params).filter(([, v]) => v)).toString()
  return apiFetch(`/movies${q ? `?${q}` : ''}`)
}

export function getMovie(id) {
  return apiFetch(`/movies/${id}`)
}

export async function register(email, password) {
  return apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export async function login(email, password) {
  return apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export async function createCharacter(data, token) {
  return apiFetch('/characters', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  })
}

export async function updateCharacter(id, data, token) {
  return apiFetch(`/characters/${id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  })
}

export async function deleteCharacter(id, token) {
  return apiFetch(`/characters/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })
}

export async function createResource(resource, data, token) {
  return apiFetch(`/${resource}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  })
}

export async function updateResource(resource, id, data, token) {
  return apiFetch(`/${resource}/${id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  })
}

export async function deleteResource(resource, id, token) {
  return apiFetch(`/${resource}/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })
}
