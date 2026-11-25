import type { UserResponse } from '@/api/schemas/user'

export const mockUsers: UserResponse[] = [
  {
    id: '1',
    bio: 'Bom dia',
    username: 'joao',
    displayName: 'João Pedro',
    createdAt: new Date(2026, 10, 1, 15, 45, 0).toISOString(),
    updatedAt: new Date(2026, 10, 1, 15, 45, 0).toISOString()
  },
  {
    id: '2',
    bio: 'Estou cansada',
    username: 'maria',
    displayName: 'Maria Eduarda',
    createdAt: new Date(2026, 10, 1, 21, 15, 0).toISOString(),
    updatedAt: new Date(2026, 10, 1, 21, 15, 0).toISOString()
  },
  {
    id: '3',
    bio: 'Não gosto de eventos',
    username: 'ariel',
    displayName: 'Ariel Vasconcelos',
    createdAt: new Date(2026, 10, 22, 9, 12, 0).toISOString(),
    updatedAt: new Date(2026, 10, 22, 9, 12, 0).toISOString()
  },
  {
    id: '4',
    bio: 'Gosto muito de eventos',
    username: 'alex',
    displayName: 'Alex Dias',
    createdAt: new Date(2026, 10, 24, 18, 21, 0).toISOString(),
    updatedAt: new Date(2026, 10, 24, 18, 21, 0).toISOString()
  }
]
