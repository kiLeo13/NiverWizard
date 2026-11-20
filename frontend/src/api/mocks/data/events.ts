import type { EventResponse } from '@/api/schemas/event'

export const mockEvents: EventResponse[] = [
  {
    id: '1',
    ownerId: '2',
    namespace: 'maria',
    slug: '2026',
    name: 'Niver 2026',
    overview: 'Vai ser meu aniversário em 01/12!!!',
    playlist: {
      provider: 'spotify',
      url: 'https://open.spotify.com/playlist/086ph5MEzxyORHaF4F7zE0'
    },
    startsAt: new Date(2026, 11, 1, 18, 0, 0).toISOString(),
    rsvpDeadline: new Date(2026, 11, 1, 17, 0, 0).toISOString(),
    createdAt: new Date(2026, 10, 10, 15, 54, 18).toISOString(),
    updatedAt: new Date(2026, 10, 10, 15, 54, 18).toISOString(),
    location: {
      name: 'Shopping Eldourado',
      address: {
        city: 'São Paulo',
        state: 'São Paulo',
        street: 'Av. Rebouças',
        number: '3970',
        zipCode: '05402600'
      },
      mapsUrl: 'https://maps.app.goo.gl/PPgD8ksWJCPJfHZX6',
      instructions: null,
      photos: []
    },
    galleryProvider: 'internal',
    userRole: 'owner'
  },
  {
    id: '2',
    ownerId: '1',
    namespace: 'joao',
    slug: 'halloween2025',
    name: '🎃 Halloween Casita',
    overview: null,
    playlist: {
      provider: 'deezer',
      url: 'https://www.deezer.com/mx/playlist/13211475023'
    },
    startsAt: new Date(2025, 9, 31, 20, 0, 0).toISOString(),
    rsvpDeadline: new Date(2025, 9, 25, 0, 0, 0).toISOString(),
    createdAt: new Date(2025, 9, 3, 13, 35, 27).toISOString(),
    updatedAt: new Date(2025, 9, 3, 13, 35, 27).toISOString(),
    location: {
      name: 'Bosque Ribeirão',
      address: {
        city: 'Ribeirão Preto',
        state: 'São Paulo',
        street: 'Rua Tamandaré',
        number: '390',
        zipCode: '14085070'
      },
      mapsUrl: 'https://maps.app.goo.gl/AR83eNXXjrMysL4j8',
      instructions: null,
      photos: []
    },
    galleryProvider: 'internal',
    userRole: 'member'
  }
]
