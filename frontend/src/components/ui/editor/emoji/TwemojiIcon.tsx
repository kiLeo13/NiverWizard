import twemoji from 'twemoji'

export function TwemojiIcon({ emoji }: { emoji: string }) {
  const html = twemoji.parse(emoji, {
    folder: 'svg',
    ext: '.svg'
  })

  return <span dangerouslySetInnerHTML={{ __html: html }} />
}
