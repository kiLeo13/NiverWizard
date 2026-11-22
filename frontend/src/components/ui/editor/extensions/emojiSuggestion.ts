import Suggestion, { type SuggestionKeyDownProps } from '@tiptap/suggestion'

import { Editor, ReactRenderer } from '@tiptap/react'
import { EmojiList } from '../emoji/EmojiList'
import { searchEmojis } from '../emoji/searchEmoji'

type EmojiListRef = {
  onKeyDown: (props: SuggestionKeyDownProps) => boolean
}

export const emojiSuggestion = (editor: Editor) =>
  Suggestion({
    editor: editor,
    char: ':',
    items: ({ query }) => searchEmojis(query, 20),
    command: ({ editor, range, props }) => {
      editor
        .chain()
        .focus()
        .insertContentAt(range, [
          { type: 'twemoji', attrs: { emoji: props.skins[0].native } },
          { type: 'text', text: ' ' }
        ])
        .run()
    },
    render: () => {
      let component: ReactRenderer<EmojiListRef> | undefined
      let unmount: (() => void) | undefined

      return {
        onStart: (props) => {
          component = new ReactRenderer(EmojiList, {
            props,
            editor: props.editor
          })

          unmount = props.mount(component.element)
        },

        onUpdate: (props) => component?.updateProps(props),

        onKeyDown: (props) => component?.ref?.onKeyDown(props) ?? false,

        onExit: () => {
          unmount?.()
          component?.destroy()

          component = undefined
          unmount = undefined
        }
      }
    }
  })
