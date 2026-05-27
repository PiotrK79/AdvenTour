export interface Destination {
  id: string;
  title: string;
  description: string;
  image: string;
  rating: number;
  price: number;
  duration: string;
  vibe: string;
  tags: string[];
}

export const destinations: Destination[] = [
  {
    id: 'krakow',
    title: 'Kraków',
    description: 'Weekend pełen historii, świetnej kuchni i spacerów po najpiękniejszych uliczkach Starego Miasta.',
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=900&q=80',
    rating: 4.8,
    price: 1200,
    duration: '3 dni',
    vibe: 'Kultura',
    tags: ['miasto', 'jedzenie', 'historia'],
  },
  {
    id: 'baltyk',
    title: 'Bałtyk',
    description: 'Luźniejszy wyjazd nad morze z plażą, zachodami słońca i spokojnym tempem dla całej grupy.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
    rating: 4.5,
    price: 800,
    duration: '5 dni',
    vibe: 'Relaks',
    tags: ['plaża', 'spacer', 'odpoczynek'],
  },
  {
    id: 'tatry',
    title: 'Tatry',
    description: 'Aktywna wyprawa z trekkingiem, widokami i górskim klimatem dla osób, które lubią ruch.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80',
    rating: 4.9,
    price: 1500,
    duration: '4 dni',
    vibe: 'Aktywnie',
    tags: ['góry', 'trekking', 'widoki'],
  },
  {
    id: 'mazury',
    title: 'Mazury',
    description: 'Jeziora, kajaki i spokojne wieczory przy wodzie, dobre dla grupy szukającej balansu.',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    rating: 4.6,
    price: 980,
    duration: '4 dni',
    vibe: 'Natura',
    tags: ['jeziora', 'kajaki', 'cisza'],
  },
];
