import type { NamespaceResponse } from '@/api/schemas/namespace'

export const mockNamespaces: NamespaceResponse[] = [
  {
    id: '1',
    ownerId: '1',
    slug: 'joao',
    createdAt: new Date(2026, 10, 10, 10, 35, 0).toISOString(),
    updatedAt: new Date(2026, 10, 10, 10, 35, 0).toISOString()
  },
  {
    id: '2',
    ownerId: '2',
    slug: 'maria',
    createdAt: new Date(2026, 10, 12, 8, 5, 0).toISOString(),
    updatedAt: new Date(2026, 10, 12, 8, 5, 0).toISOString()
  },
  {
    id: '3',
    ownerId: '3',
    slug: 'ariel',
    createdAt: new Date(2026, 10, 24, 17, 20, 0).toISOString(),
    updatedAt: new Date(2026, 10, 24, 17, 20, 0).toISOString()
  },
  {
    id: '4',
    ownerId: '4',
    slug: 'alex',
    createdAt: new Date(2026, 10, 24, 18, 57, 0).toISOString(),
    updatedAt: new Date(2026, 10, 24, 18, 57, 0).toISOString()
  }
]
