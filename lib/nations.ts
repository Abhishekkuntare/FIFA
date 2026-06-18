export type Nation = {
  code: string
  name: string
  confederation: 'UEFA' | 'CONMEBOL' | 'CONCACAF' | 'CAF' | 'AFC' | 'OFC'
  group: string
  /** kit / brand colors as hex */
  primary: string
  secondary: string
  accent: string
  /** flag stripe colors, rendered as bars */
  flag: string[]
  rank: number
  star: { name: string; pos: string; num: number }
  titles: number
  nickname: string
}

// FIFA World Cup 2026 — 48-nation field (representative qualified + projected)
export const NATIONS: Nation[] = [
  { code: 'ARG', name: 'Argentina', confederation: 'CONMEBOL', group: 'A', primary: '#6cb4e4', secondary: '#ffffff', accent: '#f4c430', flag: ['#6cb4e4', '#ffffff', '#6cb4e4'], rank: 1, star: { name: 'L. Messi', pos: 'FWD', num: 10 }, titles: 3, nickname: 'La Albiceleste' },
  { code: 'FRA', name: 'France', confederation: 'UEFA', group: 'A', primary: '#1e3a8a', secondary: '#ffffff', accent: '#ef4444', flag: ['#1e3a8a', '#ffffff', '#ef4444'], rank: 2, star: { name: 'K. Mbappé', pos: 'FWD', num: 10 }, titles: 2, nickname: 'Les Bleus' },
  { code: 'BRA', name: 'Brazil', confederation: 'CONMEBOL', group: 'B', primary: '#facc15', secondary: '#16a34a', accent: '#1d4ed8', flag: ['#16a34a', '#facc15', '#1d4ed8'], rank: 3, star: { name: 'Vinícius Jr.', pos: 'FWD', num: 7 }, titles: 5, nickname: 'Seleção' },
  { code: 'ENG', name: 'England', confederation: 'UEFA', group: 'B', primary: '#ffffff', secondary: '#1e3a8a', accent: '#ef4444', flag: ['#ffffff', '#ef4444'], rank: 4, star: { name: 'J. Bellingham', pos: 'MID', num: 10 }, titles: 1, nickname: 'Three Lions' },
  { code: 'ESP', name: 'Spain', confederation: 'UEFA', group: 'C', primary: '#dc2626', secondary: '#facc15', accent: '#1e3a8a', flag: ['#dc2626', '#facc15', '#dc2626'], rank: 5, star: { name: 'Lamine Yamal', pos: 'FWD', num: 19 }, titles: 1, nickname: 'La Roja' },
  { code: 'POR', name: 'Portugal', confederation: 'UEFA', group: 'C', primary: '#15803d', secondary: '#dc2626', accent: '#facc15', flag: ['#15803d', '#dc2626'], rank: 6, star: { name: 'C. Ronaldo', pos: 'FWD', num: 7 }, titles: 0, nickname: 'A Seleção' },
  { code: 'NED', name: 'Netherlands', confederation: 'UEFA', group: 'D', primary: '#f97316', secondary: '#ffffff', accent: '#1e3a8a', flag: ['#ef4444', '#ffffff', '#1e3a8a'], rank: 7, star: { name: 'V. van Dijk', pos: 'DEF', num: 4 }, titles: 0, nickname: 'Oranje' },
  { code: 'BEL', name: 'Belgium', confederation: 'UEFA', group: 'D', primary: '#1f2937', secondary: '#facc15', accent: '#dc2626', flag: ['#1f2937', '#facc15', '#dc2626'], rank: 8, star: { name: 'K. De Bruyne', pos: 'MID', num: 7 }, titles: 0, nickname: 'Red Devils' },
  { code: 'GER', name: 'Germany', confederation: 'UEFA', group: 'E', primary: '#1f2937', secondary: '#ffffff', accent: '#facc15', flag: ['#1f2937', '#dc2626', '#facc15'], rank: 9, star: { name: 'J. Musiala', pos: 'MID', num: 10 }, titles: 4, nickname: 'Die Mannschaft' },
  { code: 'CRO', name: 'Croatia', confederation: 'UEFA', group: 'E', primary: '#dc2626', secondary: '#ffffff', accent: '#1e3a8a', flag: ['#dc2626', '#ffffff', '#1e3a8a'], rank: 10, star: { name: 'L. Modrić', pos: 'MID', num: 10 }, titles: 0, nickname: 'Vatreni' },
  { code: 'ITA', name: 'Italy', confederation: 'UEFA', group: 'F', primary: '#1d4ed8', secondary: '#ffffff', accent: '#16a34a', flag: ['#16a34a', '#ffffff', '#dc2626'], rank: 11, star: { name: 'F. Chiesa', pos: 'FWD', num: 14 }, titles: 4, nickname: 'Azzurri' },
  { code: 'URU', name: 'Uruguay', confederation: 'CONMEBOL', group: 'F', primary: '#38bdf8', secondary: '#1f2937', accent: '#facc15', flag: ['#38bdf8', '#ffffff'], rank: 12, star: { name: 'F. Valverde', pos: 'MID', num: 15 }, titles: 2, nickname: 'La Celeste' },
  { code: 'USA', name: 'United States', confederation: 'CONCACAF', group: 'G', primary: '#1e3a8a', secondary: '#ffffff', accent: '#dc2626', flag: ['#1e3a8a', '#ffffff', '#dc2626'], rank: 13, star: { name: 'C. Pulisic', pos: 'FWD', num: 10 }, titles: 0, nickname: 'USMNT' },
  { code: 'MEX', name: 'Mexico', confederation: 'CONCACAF', group: 'G', primary: '#15803d', secondary: '#ffffff', accent: '#dc2626', flag: ['#15803d', '#ffffff', '#dc2626'], rank: 14, star: { name: 'S. Giménez', pos: 'FWD', num: 9 }, titles: 0, nickname: 'El Tri' },
  { code: 'CAN', name: 'Canada', confederation: 'CONCACAF', group: 'H', primary: '#dc2626', secondary: '#ffffff', accent: '#1f2937', flag: ['#dc2626', '#ffffff', '#dc2626'], rank: 15, star: { name: 'A. Davies', pos: 'DEF', num: 19 }, titles: 0, nickname: 'Les Rouges' },
  { code: 'COL', name: 'Colombia', confederation: 'CONMEBOL', group: 'H', primary: '#facc15', secondary: '#1d4ed8', accent: '#dc2626', flag: ['#facc15', '#1d4ed8', '#dc2626'], rank: 16, star: { name: 'L. Díaz', pos: 'FWD', num: 7 }, titles: 0, nickname: 'Los Cafeteros' },
  { code: 'MAR', name: 'Morocco', confederation: 'CAF', group: 'I', primary: '#b91c1c', secondary: '#15803d', accent: '#ffffff', flag: ['#b91c1c', '#15803d'], rank: 17, star: { name: 'A. Hakimi', pos: 'DEF', num: 2 }, titles: 0, nickname: 'Atlas Lions' },
  { code: 'JPN', name: 'Japan', confederation: 'AFC', group: 'I', primary: '#1d4ed8', secondary: '#ffffff', accent: '#dc2626', flag: ['#ffffff', '#dc2626', '#ffffff'], rank: 18, star: { name: 'T. Kubo', pos: 'MID', num: 11 }, titles: 0, nickname: 'Samurai Blue' },
  { code: 'SEN', name: 'Senegal', confederation: 'CAF', group: 'J', primary: '#15803d', secondary: '#facc15', accent: '#dc2626', flag: ['#15803d', '#facc15', '#dc2626'], rank: 19, star: { name: 'S. Mané', pos: 'FWD', num: 10 }, titles: 0, nickname: 'Lions of Teranga' },
  { code: 'SUI', name: 'Switzerland', confederation: 'UEFA', group: 'J', primary: '#dc2626', secondary: '#ffffff', accent: '#1f2937', flag: ['#dc2626', '#ffffff'], rank: 20, star: { name: 'G. Xhaka', pos: 'MID', num: 10 }, titles: 0, nickname: 'Nati' },
  { code: 'DEN', name: 'Denmark', confederation: 'UEFA', group: 'K', primary: '#dc2626', secondary: '#ffffff', accent: '#1f2937', flag: ['#dc2626', '#ffffff'], rank: 21, star: { name: 'C. Eriksen', pos: 'MID', num: 10 }, titles: 0, nickname: 'Danish Dynamite' },
  { code: 'KOR', name: 'South Korea', confederation: 'AFC', group: 'K', primary: '#dc2626', secondary: '#1d4ed8', accent: '#ffffff', flag: ['#dc2626', '#1d4ed8'], rank: 22, star: { name: 'Son Heung-min', pos: 'FWD', num: 7 }, titles: 0, nickname: 'Taegeuk Warriors' },
  { code: 'AUS', name: 'Australia', confederation: 'AFC', group: 'L', primary: '#facc15', secondary: '#15803d', accent: '#1f2937', flag: ['#15803d', '#facc15'], rank: 23, star: { name: 'M. Leckie', pos: 'FWD', num: 7 }, titles: 0, nickname: 'Socceroos' },
  { code: 'ECU', name: 'Ecuador', confederation: 'CONMEBOL', group: 'L', primary: '#facc15', secondary: '#1d4ed8', accent: '#dc2626', flag: ['#facc15', '#1d4ed8', '#dc2626'], rank: 24, star: { name: 'M. Caicedo', pos: 'MID', num: 23 }, titles: 0, nickname: 'La Tri' },
  { code: 'AUT', name: 'Austria', confederation: 'UEFA', group: 'A', primary: '#dc2626', secondary: '#ffffff', accent: '#1f2937', flag: ['#dc2626', '#ffffff', '#dc2626'], rank: 25, star: { name: 'M. Sabitzer', pos: 'MID', num: 7 }, titles: 0, nickname: 'Das Team' },
  { code: 'TUR', name: 'Türkiye', confederation: 'UEFA', group: 'B', primary: '#dc2626', secondary: '#ffffff', accent: '#1f2937', flag: ['#dc2626', '#ffffff'], rank: 26, star: { name: 'A. Güler', pos: 'MID', num: 10 }, titles: 0, nickname: 'Ay-Yıldızlılar' },
  { code: 'NGA', name: 'Nigeria', confederation: 'CAF', group: 'C', primary: '#15803d', secondary: '#ffffff', accent: '#1f2937', flag: ['#15803d', '#ffffff', '#15803d'], rank: 27, star: { name: 'V. Osimhen', pos: 'FWD', num: 9 }, titles: 0, nickname: 'Super Eagles' },
  { code: 'EGY', name: 'Egypt', confederation: 'CAF', group: 'D', primary: '#dc2626', secondary: '#1f2937', accent: '#facc15', flag: ['#dc2626', '#ffffff', '#1f2937'], rank: 28, star: { name: 'M. Salah', pos: 'FWD', num: 10 }, titles: 0, nickname: 'The Pharaohs' },
  { code: 'WAL', name: 'Wales', confederation: 'UEFA', group: 'E', primary: '#dc2626', secondary: '#15803d', accent: '#ffffff', flag: ['#ffffff', '#15803d'], rank: 29, star: { name: 'B. Johnson', pos: 'FWD', num: 11 }, titles: 0, nickname: 'The Dragons' },
  { code: 'SWE', name: 'Sweden', confederation: 'UEFA', group: 'F', primary: '#1d4ed8', secondary: '#facc15', accent: '#ffffff', flag: ['#1d4ed8', '#facc15'], rank: 30, star: { name: 'A. Isak', pos: 'FWD', num: 11 }, titles: 0, nickname: 'Blågult' },
  { code: 'POL', name: 'Poland', confederation: 'UEFA', group: 'G', primary: '#ffffff', secondary: '#dc2626', accent: '#1f2937', flag: ['#ffffff', '#dc2626'], rank: 31, star: { name: 'R. Lewandowski', pos: 'FWD', num: 9 }, titles: 0, nickname: 'Biało-czerwoni' },
  { code: 'SRB', name: 'Serbia', confederation: 'UEFA', group: 'H', primary: '#b91c1c', secondary: '#1e3a8a', accent: '#ffffff', flag: ['#b91c1c', '#1e3a8a', '#ffffff'], rank: 32, star: { name: 'D. Vlahović', pos: 'FWD', num: 9 }, titles: 0, nickname: 'Orlovi' },
  { code: 'UKR', name: 'Ukraine', confederation: 'UEFA', group: 'I', primary: '#1d4ed8', secondary: '#facc15', accent: '#ffffff', flag: ['#1d4ed8', '#facc15'], rank: 33, star: { name: 'M. Mudryk', pos: 'FWD', num: 10 }, titles: 0, nickname: 'Zbirna' },
  { code: 'GHA', name: 'Ghana', confederation: 'CAF', group: 'J', primary: '#dc2626', secondary: '#facc15', accent: '#15803d', flag: ['#dc2626', '#facc15', '#15803d'], rank: 34, star: { name: 'M. Kudus', pos: 'MID', num: 20 }, titles: 0, nickname: 'Black Stars' },
  { code: 'CIV', name: "Côte d'Ivoire", confederation: 'CAF', group: 'K', primary: '#f97316', secondary: '#ffffff', accent: '#15803d', flag: ['#f97316', '#ffffff', '#15803d'], rank: 35, star: { name: 'S. Haller', pos: 'FWD', num: 9 }, titles: 0, nickname: 'Les Éléphants' },
  { code: 'CMR', name: 'Cameroon', confederation: 'CAF', group: 'L', primary: '#15803d', secondary: '#dc2626', accent: '#facc15', flag: ['#15803d', '#dc2626', '#facc15'], rank: 36, star: { name: 'A. Onana', pos: 'GK', num: 24 }, titles: 0, nickname: 'Indomitable Lions' },
  { code: 'IRN', name: 'Iran', confederation: 'AFC', group: 'A', primary: '#15803d', secondary: '#ffffff', accent: '#dc2626', flag: ['#15803d', '#ffffff', '#dc2626'], rank: 37, star: { name: 'M. Taremi', pos: 'FWD', num: 9 }, titles: 0, nickname: 'Team Melli' },
  { code: 'KSA', name: 'Saudi Arabia', confederation: 'AFC', group: 'B', primary: '#15803d', secondary: '#ffffff', accent: '#166534', flag: ['#15803d', '#ffffff'], rank: 38, star: { name: 'S. Al-Dawsari', pos: 'FWD', num: 10 }, titles: 0, nickname: 'Green Falcons' },
  { code: 'QAT', name: 'Qatar', confederation: 'AFC', group: 'C', primary: '#7f1d1d', secondary: '#ffffff', accent: '#991b1b', flag: ['#7f1d1d', '#ffffff'], rank: 39, star: { name: 'A. Afif', pos: 'FWD', num: 11 }, titles: 0, nickname: 'The Maroon' },
  { code: 'NOR', name: 'Norway', confederation: 'UEFA', group: 'D', primary: '#dc2626', secondary: '#1e3a8a', accent: '#ffffff', flag: ['#dc2626', '#ffffff', '#1e3a8a'], rank: 40, star: { name: 'E. Haaland', pos: 'FWD', num: 9 }, titles: 0, nickname: 'Løvene' },
  { code: 'SCO', name: 'Scotland', confederation: 'UEFA', group: 'E', primary: '#1e3a8a', secondary: '#ffffff', accent: '#60a5fa', flag: ['#1e3a8a', '#ffffff'], rank: 41, star: { name: 'A. Robertson', pos: 'DEF', num: 3 }, titles: 0, nickname: 'Tartan Army' },
  { code: 'PER', name: 'Peru', confederation: 'CONMEBOL', group: 'F', primary: '#dc2626', secondary: '#ffffff', accent: '#b91c1c', flag: ['#dc2626', '#ffffff', '#dc2626'], rank: 42, star: { name: 'G. Lapadula', pos: 'FWD', num: 9 }, titles: 0, nickname: 'La Blanquirroja' },
  { code: 'CHI', name: 'Chile', confederation: 'CONMEBOL', group: 'G', primary: '#dc2626', secondary: '#1e3a8a', accent: '#ffffff', flag: ['#ffffff', '#dc2626', '#1e3a8a'], rank: 43, star: { name: 'A. Sánchez', pos: 'FWD', num: 7 }, titles: 0, nickname: 'La Roja' },
  { code: 'CRC', name: 'Costa Rica', confederation: 'CONCACAF', group: 'H', primary: '#dc2626', secondary: '#1e3a8a', accent: '#ffffff', flag: ['#1e3a8a', '#ffffff', '#dc2626'], rank: 44, star: { name: 'K. Navas', pos: 'GK', num: 1 }, titles: 0, nickname: 'Los Ticos' },
  { code: 'JAM', name: 'Jamaica', confederation: 'CONCACAF', group: 'I', primary: '#facc15', secondary: '#15803d', accent: '#1f2937', flag: ['#15803d', '#facc15', '#1f2937'], rank: 45, star: { name: 'M. Antonio', pos: 'FWD', num: 9 }, titles: 0, nickname: 'Reggae Boyz' },
  { code: 'NZL', name: 'New Zealand', confederation: 'OFC', group: 'J', primary: '#1f2937', secondary: '#ffffff', accent: '#dc2626', flag: ['#1f2937', '#ffffff'], rank: 46, star: { name: 'C. Wood', pos: 'FWD', num: 9 }, titles: 0, nickname: 'All Whites' },
  { code: 'TUN', name: 'Tunisia', confederation: 'CAF', group: 'K', primary: '#dc2626', secondary: '#ffffff', accent: '#b91c1c', flag: ['#dc2626', '#ffffff'], rank: 47, star: { name: 'H. Skhiri', pos: 'MID', num: 12 }, titles: 0, nickname: 'Eagles of Carthage' },
  { code: 'PAN', name: 'Panama', confederation: 'CONCACAF', group: 'L', primary: '#dc2626', secondary: '#1e3a8a', accent: '#ffffff', flag: ['#dc2626', '#ffffff', '#1e3a8a'], rank: 48, star: { name: 'I. Jiménez', pos: 'FWD', num: 9 }, titles: 0, nickname: 'La Marea Roja' },
]

export const CONFEDERATIONS = [
  'UEFA',
  'CONMEBOL',
  'CONCACAF',
  'CAF',
  'AFC',
  'OFC',
] as const

export const HOSTS = ['USA', 'MEX', 'CAN']
