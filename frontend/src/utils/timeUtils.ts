/**
 * Returns a Date object from an ISO string, or null if the input is falsy.
 * 
 * @param iso The ISO-8601 string to convert to a Date object.
 * @returns The corresponding Date object, or null.
 */
export function toDate(iso: string | null): Date | null {
  return iso ? new Date(iso) : null
}
