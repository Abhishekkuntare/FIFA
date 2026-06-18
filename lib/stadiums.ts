export type Stadium = {
  id: string
  name: string
  city: string
  country: string
  capacity: number
  opened: number
  tint: string
  blurb: string
}

export const STADIUMS: Stadium[] = [
  {
    id: 'metlife',
    name: 'MetLife Stadium',
    city: 'New York / New Jersey',
    country: 'USA',
    capacity: 82500,
    opened: 2010,
    tint: '#22d3ee',
    blurb: 'Host of the 2026 Final. A colossal bowl under the Manhattan skyline.',
  },
  {
    id: 'azteca',
    name: 'Estadio Azteca',
    city: 'Mexico City',
    country: 'MEX',
    capacity: 87000,
    opened: 1966,
    tint: '#34d399',
    blurb: 'The only stadium to host three World Cups. A cathedral of football.',
  },
  {
    id: 'sofi',
    name: 'SoFi Stadium',
    city: 'Los Angeles',
    country: 'USA',
    capacity: 70240,
    opened: 2020,
    tint: '#a78bfa',
    blurb: 'A translucent canopy of light over the Californian coast.',
  },
  {
    id: 'bcplace',
    name: 'BC Place',
    city: 'Vancouver',
    country: 'CAN',
    capacity: 54500,
    opened: 1983,
    tint: '#f472b6',
    blurb: 'A retractable-roof arena framed by the Pacific mountains.',
  },
  {
    id: 'att',
    name: 'AT&T Stadium',
    city: 'Dallas',
    country: 'USA',
    capacity: 80000,
    opened: 2009,
    tint: '#fbbf24',
    blurb: 'The vast Texas megastructure with the largest column-free interior.',
  },
  {
    id: 'estadiobbva',
    name: 'Estadio BBVA',
    city: 'Monterrey',
    country: 'MEX',
    capacity: 53500,
    opened: 2015,
    tint: '#60a5fa',
    blurb: 'The Steel Giant, with Cerro de la Silla rising beyond the stands.',
  },
]
