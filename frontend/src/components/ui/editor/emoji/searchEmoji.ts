import data, { type EmojiMartData } from '@emoji-mart/data'

const emojiData = data as EmojiMartData

export type EmojiItem = {
  id: string
  name: string
  skins: { native: string }[]
}

export function searchEmojis(query: string, limit = 6): EmojiItem[] {
  const q = query.trim().toLowerCase()
  if (!q) return []

  const emojis = Object.values(emojiData.emojis) as EmojiItem[]

  return emojis
    .filter((emj) => emj.id.includes(q) || emj.name.toLowerCase().includes(q))
    .slice(0, limit)
}
