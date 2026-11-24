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
  detail: (namespace: string, eventSlug: string) =>
    [...eventKeys.byNamespace(namespace), 'detail', eventSlug] as const
}

export const eventService = {
  getEvent: async (namespace: string, eventSlug: string): Promise<EventResponse> => {
    const resp = await apiClient.get(`/namespaces/${namespace}/events/${eventSlug}`)
    return eventResponseSchema.parse(resp.data)
  },

  getEventsByNamespace: async (namespace: string): Promise<ListEventsResponse> => {
    const resp = await apiClient.get(`/namespaces/${namespace}/events`)
    return listEventsResponseSchema.parse(resp.data)
  }
}

export const eventQueries = {
  detail: (namespace: string, eventSlug: string) =>
    queryOptions({
      queryKey: eventKeys.detail(namespace, eventSlug),
      queryFn: () => eventService.getEvent(namespace, eventSlug)
    }),

  listByNamespace: (namespace: string) =>
    queryOptions({
      queryKey: eventKeys.list(namespace),
      queryFn: () => eventService.getEventsByNamespace(namespace)
    })
}
