import { voidSchema } from '../schemas/common'

import apiClient from '../client'

import {
  loginResponseSchema,
  type LoginRequest,
  type LoginResponse,
  type SignupRequest
} from '../schemas/auth'

export const authService = {
  signup: async (body: SignupRequest): Promise<void> => {
    const res = await apiClient.post('/auth/signup', body)
    return voidSchema.parse(res.data)
  },

  login: async (body: LoginRequest): Promise<LoginResponse> => {
    const res = await apiClient.post('/auth/login', body)
    return loginResponseSchema.parse(res.data)
  }
}
