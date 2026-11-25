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
  },
  {
    id: '3',
    ownerId: '1',
    namespace: 'joao',
    slug: 'mequi1000',
    name: '🍔 Méqui 1000',
    overview: 'Nadaki',
    playlist: null,
    startsAt: new Date(2027, 0, 5, 16, 0, 0).toISOString(),
    rsvpDeadline: new Date(2027, 0, 4, 0, 0, 0).toISOString(),
    createdAt: new Date(2026, 10, 24, 14, 50, 0).toISOString(),
    updatedAt: new Date(2026, 10, 24, 14, 50, 0).toISOString(),
    location: {
      name: 'Méqui 1000',
      address: {
        city: 'São Paulo',
        state: 'São Paulo',
        street: 'Av. Paulista',
        number: '1811',
        zipCode: '01311-200'
      },
      mapsUrl: 'https://maps.app.goo.gl/Te3FhhmaFCNDmJTE9',
      instructions: null,
      photos: []
    },
    galleryProvider: 'internal',
    userRole: 'owner'
  },
  {
    id: '4',
    ownerId: '4',
    namespace: 'alex',
    slug: 'lespresidents',
    name: 'Les Présidents',
    overview: 'Vamos comer no restaurante do Jacquin.',
    playlist: null,
    startsAt: new Date(2027, 1, 20, 20, 0, 0).toISOString(),
    rsvpDeadline: new Date(2027, 1, 19, 0, 0, 0).toISOString(),
    createdAt: new Date(2026, 10, 24, 18, 48, 0).toISOString(),
    updatedAt: new Date(2026, 10, 24, 18, 48, 0).toISOString(),
    location: {
      name: 'Les Présidents',
      address: {
        city: 'São Paulo',
        state: 'São Paulo',
        street: 'Rua da Consolação',
        number: '3527',
        zipCode: '01416-001'
      },
      mapsUrl: 'https://maps.app.goo.gl/hzg6fvMqMCHGjdqK9',
      instructions: null,
      photos: []
    },
    galleryProvider: 'internal',
    userRole: 'owner'
  },
  {
    id: '5',
    ownerId: '4',
    namespace: 'alex',
    slug: 'nonnogrill',
    name: 'Churrascaria Nonno Grill',
    overview: 'Não sei mais o que colocar nessa descrição, sinceramente.',
    playlist: null,
    startsAt: new Date(2027, 3, 10, 19, 0, 0).toISOString(),
    rsvpDeadline: new Date(2027, 3, 9, 0, 0, 0).toISOString(),
    createdAt: new Date(2026, 10, 25, 1, 55, 0).toISOString(),
    updatedAt: new Date(2026, 10, 25, 1, 55, 0).toISOString(),
    location: {
      name: 'NONNO GRILL CHURRASCARIA FRANCA SP',
      address: {
        city: 'Franca',
        state: 'São Paulo',
        street: 'Rua dos Pracinhas',
        number: '375',
        zipCode: '14400-120'
      },
      mapsUrl: 'https://maps.app.goo.gl/b5rbUeiV5HJLmGuY7',
      instructions: null,
      photos: []
    },
    galleryProvider: 'internal',
    userRole: 'owner'
  },
  {
    id: '6',
    ownerId: '4',
    namespace: 'alex',
    slug: 'amazonbowling',
    name: 'Amazon Bowling (Boliche)',
    overview: '🎳 Vamos  conhecer como é jogar um pouco de boliche?',
    playlist: null,
    startsAt: new Date(2026, 11, 20, 19, 0, 0).toISOString(),
    rsvpDeadline: new Date(2026, 11, 19, 0, 0, 0).toISOString(),
    createdAt: new Date(2026, 10, 25, 2, 5, 0).toISOString(),
    updatedAt: new Date(2026, 10, 25, 2, 5, 0).toISOString(),
    location: {
      name: 'Amazon Bowling - Adrianópolis (Boliche)',
      address: {
        city: 'Manaus',
        state: 'Amazonas',
        street: 'Rua Belo Horizonte',
        number: '97',
        zipCode: '69057-060'
      },
      mapsUrl: 'https://maps.app.goo.gl/b2dhE9zux1Q1iVmx6',
      instructions: null,
      photos: []
    },
    galleryProvider: 'internal',
    userRole: 'owner'
  },
  {
    id: '7',
    ownerId: '4',
    namespace: 'alex',
    slug: 'sesc2026',
    name: 'Passear no SESC',
    overview: '🍴 Passear e comer cositas no SESC?',
    playlist: null,
    startsAt: new Date(2026, 10, 28, 13, 0, 0).toISOString(),
    rsvpDeadline: new Date(2026, 10, 28, 12, 0, 0).toISOString(),
    createdAt: new Date(2026, 10, 25, 2, 11, 0).toISOString(),
    updatedAt: new Date(2026, 10, 25, 2, 11, 0).toISOString(),
    location: {
      name: 'SESC Franca',
      address: {
        city: 'Franca',
        state: 'São Paulo',
        street: 'Av. Alonso Y Alonso',
        number: '3071',
        zipCode: '14401-426'
      },
      mapsUrl: 'https://maps.app.goo.gl/1iKYUvJC9qDfttd19',
      instructions: null,
      photos: []
    },
    galleryProvider: 'internal',
    userRole: 'owner'
  },
  {
    id: '8',
    ownerId: '4',
    namespace: 'alex',
    slug: 'shoppingestacao2026',
    name: '🛍 Shopping Estação',
    overview: 'Fazer compritas e conhecer o shopping temático 💞',
    playlist: null,
    startsAt: new Date(2026, 5, 20, 19, 0, 0).toISOString(),
    rsvpDeadline: null,
    createdAt: new Date(2026, 5, 1, 2, 19, 0).toISOString(),
    updatedAt: new Date(2026, 5, 1, 2, 19, 0).toISOString(),
    location: {
      name: 'Shopping Estação',
      address: {
        city: 'Curitiba',
        state: 'Paraná',
        street: 'Av. Sete de Setembro',
        number: '2775',
        zipCode: '80230-010'
      },
      mapsUrl: 'https://maps.app.goo.gl/RJKwkGpvXwRWtCdb7',
      instructions: null,
      photos: []
    },
    galleryProvider: 'internal',
    userRole: 'owner'
  }
]
