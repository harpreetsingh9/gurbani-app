import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Sikh Gurbani App',
    short_name: 'Gurbani',
    description: 'A mobile-first Sikh Gurbani reading app',
    start_url: '/',
    display: 'standalone',
    background_color: '#f5f5f4', // stone-100
    theme_color: '#d97706',      // amber-600 / deep saffron
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
