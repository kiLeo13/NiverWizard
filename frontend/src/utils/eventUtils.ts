import type { EventSummaryResponse } from '@/api/schemas/event'

export function findUpcoming(events: EventSummaryResponse[]): EventSummaryResponse {
  const now = Date.now()

  return events.reduce((best, current) => {
    const bestTime = Date.parse(best.startsAt)
    const currTime = Date.parse(current.startsAt)

    const bestIsUpcoming = bestTime >= now
    const currIsUpcoming = currTime >= now

    if (currIsUpcoming && !bestIsUpcoming) {
      return current
    }

    if (currIsUpcoming && bestIsUpcoming && currTime < bestTime) {
      return current
    }

    if (!currIsUpcoming && !bestIsUpcoming && currTime > bestTime) {
      return current
    }
    return best
  })
}
