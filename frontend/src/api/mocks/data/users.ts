import type { UserResponse } from '@/api/schemas/user'

export const mockUsers: UserResponse[] = [
  {
    id: '1',
    bio: 'Bom dia',
    username: 'joao',
    displayName: 'João',
    createdAt: new Date(2026, 10, 1, 15, 45, 0).toISOString(),
    updatedAt: new Date(2026, 10, 1, 15, 45, 0).toISOString()
  },
  {
    id: '2',
    bio: 'Estou cansado',
    username: 'Maria',
    displayName: '',
    createdAt: new Date(2026, 10, 1, 21, 15, 0).toISOString(),
    updatedAt: new Date(2026, 10, 1, 21, 15, 0).toISOString()
  }
]
