import apiClient from '../client'

import { namespaceResponseSchema, type NamespaceResponse } from '../schemas/namespace'
import { queryOptions } from '@tanstack/react-query'

export const namespaceKeys = {
  all: ['namespaces'] as const,
  detail: (slug: string) => [...namespaceKeys.all, slug] as const
}

export const namespaceService = {
  getNamespace: async (slug: string): Promise<NamespaceResponse> => {
    const resp = await apiClient.get(`/namespaces/${slug}`)
    return namespaceResponseSchema.parse(resp.data)
  }
}

export const namespaceQueries = {
  detail: (slug: string) =>
    queryOptions({
      queryKey: namespaceKeys.detail(slug),
      queryFn: () => namespaceService.getNamespace(slug)
    })
}
