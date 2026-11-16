/**
 * Returns the first token/word of a string sequence, or an empty string otherwise.
 *
 * Examples:
 * ```ts
 * firstToken('John Doe') // => 'John'
 * firstToken('Lucia') // => 'Lucia'
 * firstToken(' ') // => ''
 * firstToken(null) // => ''
 * firstToken(undefined) // => ''
 * ```
 *
 * @param str The string containing the name/words.
 * @returns The first argument of the sequence, separated by spaces.
 */
export function firstToken(str: string | null | undefined): string {
  if (!str) return ''

  const words = str.trim().split(' ')
  return words.length === 0 ? '' : words[0]
}
