import type { City } from '../../types/cities';
import type { Product } from '../../types/product';

export const CITIES: City[] = [
  {
    city: 'Tbilisi',
    streets: [
      'Rustaveli Avenue',
      'Agmashenebeli Avenue',
      'Chavchavadze Avenue',
      'Vake Street',
      'Abashidze Street',
      'Melikishvili Street',
      'Tsinamdzgvrishvili Street',
      'Saburtalo Street',
      'Marjanishvili Street',
      'Beliashvili Street',
    ],
  },
  {
    city: 'Milan',
    streets: [
      'Corso Buenos Aires',
      'Via Montenapoleone',
      'Corso Vittorio Emanuele II',
      'Via della Moscova',
      'Via Torino',
      'Via Manzoni',
      'Viale Certosa',
      'Corso Venezia',
      'Via Brera',
      'Corso Magenta',
    ],
  },
  {
    city: 'Chicago',
    streets: [
      'Michigan Avenue',
      'State Street',
      'Wacker Drive',
      'Clark Street',
      'Dearborn Street',
      'LaSalle Street',
      'Madison Street',
      'Randolph Street',
      'Roosevelt Road',
      'Halsted Street',
    ],
  },
];

export const FALLBACK_DATA: Product[] = [
  {
    id: 1,
    name: 'Product name unavailable',
    description: 'Product description is currently unavailable.',
    price: '0.00',
    discountPrice: 0,
    category: 'N/A',
    imageUrl: '/assets/slider-placeholder.svg',
  },
  {
    id: 2,
    name: 'Product name unavailable',
    description: 'Product description is currently unavailable.',
    price: '0.00',
    discountPrice: 0,
    category: 'N/A',
    imageUrl: '/assets/slider-placeholder.svg',
  },
  {
    id: 3,
    name: 'Product name unavailable',
    description: 'Product description is currently unavailable.',
    price: '0.00',
    discountPrice: 0,
    category: 'N/A',
    imageUrl: '/assets/slider-placeholder.svg',
  },
];
