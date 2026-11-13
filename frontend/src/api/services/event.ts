import type { ApiError } from '../errors'

import apiClient from '../client'

import { z } from 'zod'
import { queryOptions } from '@tanstack/react-query'
import { eventResponseSchema, type EventResponse } from '../schemas/event'

export const eventKeys = {
  all: ['events'] as const,
  lists: () => [...eventKeys.all, 'list'] as const,
  list: (namespace: string) => [...eventKeys.lists(), namespace] as const,
  details: () => [...eventKeys.all, 'detail'] as const,
  detail: (eventId: string) => [...eventKeys.details(), eventId] as const
}

export const eventService = {
  getEvent: async (namespace: string, eventId: string): Promise<EventResponse> => {
    const resp = await apiClient.get(`/namespaces/${namespace}/events/${eventId}`)
    return eventResponseSchema.parse(resp.data)
  },

  getEventsByNamespace: async (namespace: string): Promise<EventResponse[]> => {
    const resp = await apiClient.get(`/namespaces/${namespace}/events`)
    return z.array(eventResponseSchema).parse(resp.data)
  }
}

type EventDetailOptions = ReturnType<
  typeof queryOptions<EventResponse, ApiError, EventResponse, ReturnType<typeof eventKeys.detail>>
>
type EventListOptions = ReturnType<
  typeof queryOptions<EventResponse[], ApiError, EventResponse[], ReturnType<typeof eventKeys.list>>
>

export const eventQueries = {
  detail: (namespace: string, eventId: string): EventDetailOptions =>
    queryOptions({
      queryKey: eventKeys.detail(eventId),
      queryFn: () => eventService.getEvent(namespace, eventId)
    }),

  listByNamespace: (namespace: string): EventListOptions =>
    queryOptions({
      queryKey: eventKeys.list(namespace),
      queryFn: () => eventService.getEventsByNamespace(namespace)
    })
}
