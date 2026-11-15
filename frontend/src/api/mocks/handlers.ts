import { eventHandlers } from './handlers/event'
import { namespaceHandlers } from './handlers/namespace'

export const handlers = [...eventHandlers, ...namespaceHandlers]
