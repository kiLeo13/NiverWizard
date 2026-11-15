import camelcaseKeys from 'camelcase-keys'

function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const prototype = Object.getPrototypeOf(value)
  return prototype === Object.prototype || prototype === null
}

function isPlainObjectArray(value: unknown): value is Record<string, unknown>[] {
  return Array.isArray(value) && value.every(isPlainObject)
}

export function normalizeApiPayload(value: unknown): unknown {
  if (isPlainObject(value) || isPlainObjectArray(value)) {
    return camelcaseKeys(value, { deep: true })
  }

  return value
}
