import twemoji from 'twemoji'

import { mergeAttributes, Node } from '@tiptap/core'

const CDN_ROUTE = (codePoint: string) =>
  `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${codePoint}.svg`

export const TwemojiNode = Node.create({
  name: 'twemoji',
  group: 'inline',
  inline: true,
  selectable: false,
  atom: true,

  addAttributes() {
    return {
      emoji: {
        default: null,
        parseHTML: (el) => el.getAttribute('data-emoji'),
        renderHTML: (attrs) => ({ 'data-emoji': attrs.emoji })
      }
    }
  },

  parseHTML() {
    return [{ tag: 'img[data-emoji]' }]
  },

  renderText({ node }) {
    return node.attrs.emoji as string
  },

  renderHTML({ HTMLAttributes }) {
    const codePoint = twemoji.convert.toCodePoint(HTMLAttributes['data-emoji'])

    return [
      'img',
      mergeAttributes(HTMLAttributes, {
        class: 'emoji',
        draggable: 'false',
        src: CDN_ROUTE(codePoint),
        alt: HTMLAttributes['data-emoji']
      })
    ]
  }
})
