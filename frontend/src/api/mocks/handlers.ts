import { eventHandlers } from './handlers/event'
import { namespaceHandlers } from './handlers/namespace'
import { userHandlers } from './handlers/user'

export const handlers = [...eventHandlers, ...namespaceHandlers, ...userHandlers]
