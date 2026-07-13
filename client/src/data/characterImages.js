const images = {
  'Luke Skywalker': 'https://starwars-visualguide.com/assets/img/characters/1.jpg',
  'Darth Vader': 'https://starwars-visualguide.com/assets/img/characters/4.jpg',
  'Leia Organa': 'https://starwars-visualguide.com/assets/img/characters/5.jpg',
  'Han Solo': 'https://starwars-visualguide.com/assets/img/characters/14.jpg',
  'Obi-Wan Kenobi': 'https://starwars-visualguide.com/assets/img/characters/10.jpg',
  'Yoda': 'https://starwars-visualguide.com/assets/img/characters/20.jpg',
  'Padmé Amidala': 'https://starwars-visualguide.com/assets/img/characters/35.jpg',
  'Chewbacca': 'https://starwars-visualguide.com/assets/img/characters/13.jpg',
  'R2-D2': 'https://starwars-visualguide.com/assets/img/characters/3.jpg',
  'C-3PO': 'https://starwars-visualguide.com/assets/img/characters/2.jpg',
  'Darth Maul': 'https://starwars-visualguide.com/assets/img/characters/44.jpg',
  'Mace Windu': 'https://starwars-visualguide.com/assets/img/characters/12.jpg',
  'Boba Fett': 'https://starwars-visualguide.com/assets/img/characters/22.jpg',
  'Emperor Palpatine': 'https://starwars-visualguide.com/assets/img/characters/21.jpg',
  'Rey': 'https://starwars-visualguide.com/assets/img/characters/85.jpg',
  'Kylo Ren': 'https://starwars-visualguide.com/assets/img/characters/88.jpg',
  'Finn': 'https://starwars-visualguide.com/assets/img/characters/84.jpg',
  'Poe Dameron': 'https://starwars-visualguide.com/assets/img/characters/86.jpg',
  'Jabba the Hutt': 'https://starwars-visualguide.com/assets/img/characters/16.jpg',
  'Lando Calrissian': 'https://starwars-visualguide.com/assets/img/characters/25.jpg',
  'Qui-Gon Jinn': 'https://starwars-visualguide.com/assets/img/characters/32.jpg',
  'Count Dooku': 'https://starwars-visualguide.com/assets/img/characters/46.jpg',
  'General Grievous': 'https://starwars-visualguide.com/assets/img/characters/79.jpg',
  'Ahsoka Tano': 'https://starwars-visualguide.com/assets/img/characters/47.jpg',
  'Jyn Erso': 'https://starwars-visualguide.com/assets/img/characters/77.jpg',
}

const factionStyles = {
  'Jedi Order': { gradient: 'linear-gradient(135deg, #1a3a2a 0%, #0f1f1a 100%)', glow: '#22c55e', badge: '#22c55e' },
  'Sith': { gradient: 'linear-gradient(135deg, #3a0f0f 0%, #1a0505 100%)', glow: '#ef4444', badge: '#ef4444' },
  'Galactic Republic': { gradient: 'linear-gradient(135deg, #1a1a3a 0%, #0f0f1f 100%)', glow: '#3b82f6', badge: '#3b82f6' },
  'Galactic Empire': { gradient: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)', glow: '#6b7280', badge: '#6b7280' },
  'Rebel Alliance': { gradient: 'linear-gradient(135deg, #1a1a2a 0%, #0f0f1a 100%)', glow: '#f97316', badge: '#f97316' },
  'First Order': { gradient: 'linear-gradient(135deg, #1f1f1f 0%, #0a0a0a 100%)', glow: '#a855f7', badge: '#a855f7' },
  'The Resistance': { gradient: 'linear-gradient(135deg, #1a2a2a 0%, #0f1a1a 100%)', glow: '#06b6d4', badge: '#06b6d4' },
  'Neutral': { gradient: 'linear-gradient(135deg, #1a1a1a 0%, #111111 100%)', glow: '#6b7280', badge: '#6b7280' },
}

const alignmentGlows = {
  LIGHT: '#22c55e',
  DARK: '#ef4444',
  NEUTRAL: '#6b7280',
}

const alignmentGradients = {
  LIGHT: 'linear-gradient(135deg, #0a2a1a 0%, #061510 100%)',
  DARK: 'linear-gradient(135deg, #2a0a0a 0%, #150505 100%)',
  NEUTRAL: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)',
}

const factionEmojis = {
  'Jedi Order': '🗡️',
  'Sith': '⚡',
  'Galactic Republic': '🛡️',
  'Galactic Empire': '👑',
  'Rebel Alliance': '⭐',
  'First Order': '☠️',
  'The Resistance': '🔰',
  'Neutral': '💀',
}

export function getCharacterImage(name) {
  return images[name] || null
}

export function getFactionStyle(factionName) {
  if (!factionName) return {
    gradient: 'linear-gradient(135deg, #0f0f1e 0%, #0a0a14 100%)',
    glow: '#facc15',
    badge: '#facc15',
  }
  return factionStyles[factionName] || {
    gradient: 'linear-gradient(135deg, #0f0f1e 0%, #0a0a14 100%)',
    glow: '#facc15',
    badge: '#facc15',
  }
}

export function getAlignmentStyle(alignment) {
  return {
    glow: alignmentGlows[alignment] || '#facc15',
    gradient: alignmentGradients[alignment] || 'linear-gradient(135deg, #0f0f1e 0%, #0a0a14 100%)',
    badge: alignmentGlows[alignment] || '#facc15',
    emoji: alignment === 'LIGHT' ? '☀️' : alignment === 'DARK' ? '🌑' : '⚖️',
  }
}

export { factionEmojis }
