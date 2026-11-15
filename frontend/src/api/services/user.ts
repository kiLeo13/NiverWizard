import apiClient from '../client'

import { userResponseSchema, type UserResponse } from '../schemas/user'
import { queryOptions } from '@tanstack/react-query'

export const userKeys = {
  all: ['users'] as const,
  byId: (userId: string) => [...userKeys.all, userId] as const
}

export const userService = {
  getUser: async (userId: string): Promise<UserResponse> => {
    const resp = await apiClient.get(`/users/${userId}`)
    return userResponseSchema.parse(resp.data)
  }
}

export const eventQueries = {
  getById: (userId: string) =>
    queryOptions({
      queryKey: userKeys.byId(userId),
      queryFn: () => userService.getUser(userId)
    })
}
