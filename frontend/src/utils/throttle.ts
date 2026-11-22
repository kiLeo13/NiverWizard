export type ThrottleOptions = {
  leading?: boolean
  trailing?: boolean
}

export type ThrottledFunction<Args extends unknown[]> = ((...args: Args) => void) & {
  cancel: () => void
}

export function throttle<Args extends unknown[], R>(
  fn: (...args: Args) => R,
  wait: number,
  options: ThrottleOptions = {}
): ThrottledFunction<Args> {
  const { leading = true, trailing = true } = options

  let timeoutId: ReturnType<typeof setTimeout> | null = null
  let lastRan = 0
  let lastArgs: Args | null = null

  const cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
    lastArgs = null
    lastRan = 0
  }

  function throttled(...args: Args) {
    const now = Date.now()

    if (!lastRan && !leading) {
      lastRan = now
    }

    const remaining = wait - (now - lastRan)

    if (remaining <= 0 || remaining > wait) {
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
      lastRan = now
      lastArgs = null
      fn(...args)
    } else if (trailing) {
      lastArgs = args
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          lastRan = leading ? Date.now() : 0
          timeoutId = null
          if (lastArgs) {
            fn(...lastArgs)
            lastArgs = null
          }
        }, remaining)
      }
    }
  }

  throttled.cancel = cancel

  return throttled
}
