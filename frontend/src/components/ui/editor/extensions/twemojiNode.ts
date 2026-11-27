import { mergeAttributes, Node } from '@tiptap/core'
import { resolveTwemojiSvgUrl } from '@/utils/twemojiUtils'

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
    const emoji = String(HTMLAttributes['data-emoji'] ?? '')
    const src = resolveTwemojiSvgUrl(emoji)

    if (!src) {
      return ['span', mergeAttributes(HTMLAttributes), emoji]
    }

    return [
      'img',
      mergeAttributes(HTMLAttributes, {
        class: 'emoji',
        draggable: 'false',
        src,
        alt: emoji
      })
    ]
  }
})
