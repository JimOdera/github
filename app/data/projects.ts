// app/data/projects.ts
export interface Project {
  id: number;
  lat: number;
  lng: number;
  title: string;
  updated: string;
  description: string[];
  county: string;
  population: string;
  image: string;
}

export const projects: Project[] = [
  {
    id: 1,
    lat: -1.284,
    lng: 36.812,
    title: 'Green Horizon Project',
    updated: 'June 2025',
    description: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis viverra, aliquet mi non, gravida risus. Suspendisse potenti. In hac habitasse platea dictumst. Proin sed finibus mauris. Aliquam erat volutpat. Aenean blandit magna at sem sagittis, sed pretium mauris tincidunt. Integer ac dolor a turpis cursus tempor nec vel magna.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis viverra, aliquet mi non, gravida risus. Suspendisse potenti. In hac habitasse platea dictumst. Proin sed finibus mauris. Aliquam erat volutpat. Aenean blandit magna at sem sagittis, sed pretium mauris tincidunt. Integer ac dolor a turpis cursus tempor nec vel magna.',
    ],
    county: 'Kiambu County',
    population: '~5,000 people',
    image: '/images/forest1.jpg',
  },
  {
    id: 2,
    lat: -1.292,
    lng: 36.825,
    title: 'Riverbank Restoration',
    updated: 'July 2025',
    description: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis viverra, aliquet mi non, gravida risus. Suspendisse potenti. In hac habitasse platea dictumst. Proin sed finibus mauris. Aliquam erat volutpat. Aenean blandit magna at sem sagittis, sed pretium mauris tincidunt. Integer ac dolor a turpis cursus tempor nec vel magna.',
      'Community-led planting of native trees.',
    ],
    county: 'Nairobi County',
    population: '~12,000 people',
    image: '/images/forest2.jpg',
  },
  {
    id: 3,
    lat: -1.275,
    lng: 36.805,
    title: 'Urban Forest Canopy',
    updated: 'May 2025',
    description: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis viverra, aliquet mi non, gravida risus. Suspendisse potenti. In hac habitasse platea dictumst.',
      'Collaborating with local schools.',
    ],
    county: 'Nairobi County',
    population: '~8,000 people',
    image: '/images/forest3.jpg',
  },
  {
    id: 4,
    lat: -1.300,
    lng: 36.830,
    title: 'Eco-Village Initiative',
    updated: 'August 2025',
    description: [
      'Sustainable housing with green roofs.',
      'Rainwater harvesting systems.',
    ],
    county: 'Kajiado County',
    population: '~3,500 people',
    image: '/images/forest4.jpg',
  },
  {
    id: 5,
    lat: -1.280,
    lng: 36.790,
    title: 'Biodiversity Corridor',
    updated: 'April 2025',
    description: [
      'Connecting fragmented forest patches.',
      'Wildlife monitoring program.',
    ],
    county: 'Kiambu County',
    population: '~6,200 people',
    image: '/images/forest5.jpg',
  },
  {
    id: 6,
    lat: -1.295,
    lng: 36.840,
    title: 'Carbon Sink Plantation',
    updated: 'September 2025',
    description: [
      'High-density fast-growing species.',
      'Carbon credit certification.',
    ],
    county: 'Machakos County',
    population: '~4,800 people',
    image: '/images/forest6.jpg',
  },
  {
    id: 7,
    lat: -1.270,
    lng: 36.800,
    title: 'Community Agroforestry',
    updated: 'March 2025',
    description: [
      'Intercropping fruit trees with crops.',
      'Training farmers on sustainable practices.',
    ],
    county: 'Nairobi County',
    population: '~7,100 people',
    image: '/images/forest7.jpg',
  },
  {
    id: 8,
    lat: -1.305,
    lng: 36.815,
    title: 'Wetland Revival',
    updated: 'October 2025',
    description: [
      'Restoring degraded wetlands.',
      'Bird habitat rehabilitation.',
    ],
    county: 'Kajiado County',
    population: '~2,900 people',
    image: '/images/forest8.jpg',
  },
  {
    id: 9,
    lat: -1.285,
    lng: 36.835,
    title: 'School Green Spaces',
    updated: 'February 2025',
    description: [
      'Planting shade trees in school compounds.',
      'Environmental education curriculum.',
    ],
    county: 'Kiambu County',
    population: '~5,500 people',
    image: '/images/forest9.jpg',
  },
  {
    id: 10,
    lat: -1.290,
    lng: 36.820,
    title: 'City Park Expansion',
    updated: 'January 2025',
    description: [
      'Expanding Uhuru Park with native flora.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis viverra, aliquet mi non, gravida risus. Suspendisse potenti. In hac habitasse platea dictumst. Proin sed finibus mauris. Aliquam erat volutpat. Aenean blandit magna at sem sagittis, sed pretium mauris tincidunt. Integer ac dolor a turpis cursus tempor nec vel magna.',
    ],
    county: 'Nairobi County',
    population: '~15,000 people',
    image: '/images/forest10.jpg',
  },
];