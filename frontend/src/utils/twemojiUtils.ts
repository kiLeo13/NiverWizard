import { parse } from 'twemoji-parser'

export const TWEMOJI_SVG_BASE = 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg'

/**
 * Builds the CDN URL for a Twemoji SVG asset.
 */
export function getTwemojiSvgUrl(codePoint: string): string {
  return `${TWEMOJI_SVG_BASE}/${codePoint}.svg`
}

/**
 * Resolves the Twemoji SVG CDN URL for an emoji string using `twemoji-parser`'s
 * VS16 and ZWJ normalization rules.
 */
export function resolveTwemojiSvgUrl(emoji: string): string | undefined {
  const [entity] = parse(emoji, { buildUrl: getTwemojiSvgUrl })
  return entity?.url || undefined
}
