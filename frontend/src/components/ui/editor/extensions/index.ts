import StarterKit from '@tiptap/starter-kit'
import Color from '@tiptap/extension-color'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'

import { OVERVIEW_MAX_LENGTH } from '@/api/schemas/event'
import { TextStyle } from '@tiptap/extension-text-style'
import { Extension } from '@tiptap/react'
import { TwemojiNode } from './twemojiNode'
import { emojiSuggestion } from './emojiSuggestion'

export const EmojiSuggestionExtension = Extension.create({
  name: 'emojiSuggestion',

  addProseMirrorPlugins() {
    return [emojiSuggestion(this.editor)]
  }
})

export type ExtensionOptions = {
  placeholder?: string
}

export function getExtensions(options: ExtensionOptions = {}) {
  return [
    StarterKit.configure({
      heading: {
        levels: [1, 2, 3]
      },
      codeBlock: false
    }),

    TextStyle,
    Color,

    Link.configure({
      openOnClick: false,
      autolink: true,
      defaultProtocol: 'https',
      HTMLAttributes: {
        rel: 'noopener noreferrer',
        target: '_blank'
      }
    }),

    Placeholder.configure({
      placeholder: options.placeholder
    }),

    CharacterCount.configure({
      limit: OVERVIEW_MAX_LENGTH
    }),

    TwemojiNode,
    EmojiSuggestionExtension
  ]
}
