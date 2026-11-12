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
    const resp = await apiClient.post('/auth/signup', body)
    return voidSchema.parse(resp.data)
  },

  login: async (body: LoginRequest): Promise<LoginResponse> => {
    const resp = await apiClient.post('/auth/login', body)
    return loginResponseSchema.parse(resp.data)
  }
}
