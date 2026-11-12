import axios, { type InternalAxiosRequestConfig } from 'axios'

import { ApiError, apiErrorPayloadSchema } from './errors'

const AUTH_TOKEN_KEY = 'auth_token'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// ----------------------------------------------------------------
// Request Interceptor
// This runs BEFORE each request is sent
// ----------------------------------------------------------------
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// ----------------------------------------------------------------
// Response Interceptor
// This runs AFTER a response is received
// ----------------------------------------------------------------
apiClient.interceptors.response.use(
  (resp) => resp,
  (error) => {
    if (axios.isAxiosError(error) && error.response) {
      const { status, data } = error.response

      if (status === 401 && !window.location.pathname.startsWith('/login')) {
        console.error('Received 401 response. Redirecting to login page...')
        localStorage.removeItem(AUTH_TOKEN_KEY)
        window.location.href = '/login'
      }

      const parseResult = apiErrorPayloadSchema.safeParse(data)
      if (parseResult.success) {
        return Promise.reject(new ApiError(status, parseResult.data))
      }

      return Promise.reject(
        new ApiError(status, {
          code: 'UNKNOWN_ERROR',
          message: error.message
        })
      )
    }
    return Promise.reject(error)
  }
)

export default apiClient
