import apiClient from '../client'

import { queryOptions } from '@tanstack/react-query'
import {
  eventResponseSchema,
  listEventsResponseSchema,
  type EventResponse,
  type ListEventsResponse
} from '../schemas/event'

export const eventKeys = {
  all: ['events'] as const,
  byNamespace: (namespace: string) => [...eventKeys.all, namespace] as const,
  list: (namespace: string) => [...eventKeys.byNamespace(namespace), 'list'] as const,
  detail: (namespace: string, eventDir: string) =>
    [...eventKeys.byNamespace(namespace), 'detail', eventDir] as const
}

export const eventService = {
  getEvent: async (namespace: string, eventDir: string): Promise<EventResponse> => {
    const resp = await apiClient.get(`/namespaces/${namespace}/events/${eventDir}`)
    return eventResponseSchema.parse(resp.data)
  },

  getEventsByNamespace: async (namespace: string): Promise<ListEventsResponse> => {
    const resp = await apiClient.get(`/namespaces/${namespace}/events`)
    return listEventsResponseSchema.parse(resp.data)
  }
}

export const eventQueries = {
  detail: (namespace: string, eventDir: string) =>
    queryOptions({
      queryKey: eventKeys.detail(namespace, eventDir),
      queryFn: () => eventService.getEvent(namespace, eventDir)
    }),

  listByNamespace: (namespace: string) =>
    queryOptions({
      queryKey: eventKeys.list(namespace),
      queryFn: () => eventService.getEventsByNamespace(namespace)
    })
}
