import type { EventResponse } from '@/api/schemas/event'

export const mockEvents: EventResponse[] = [
  {
    id: '1',
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
    ownerId: '2',
    userRole: 'owner'
  },
  {
    id: '2',
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
    ownerId: '1',
    userRole: 'member'
  }
]
