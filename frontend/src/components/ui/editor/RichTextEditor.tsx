import type { JSX } from 'react/jsx-runtime'
import type { SuggestionKeyDownProps } from '@tiptap/suggestion'

import { EditorContent, useEditor } from '@tiptap/react'
import { EditorToolbar } from './EditorToolbar'
import { getExtensions } from './extensions'

import styles from './RichTextEditor.module.css'

type RichTextEditorProps = {
  content?: object
  editable?: boolean
  placeholder?: string
  onChange?: (json: object) => void
  onKeyDown?: (props: SuggestionKeyDownProps) => boolean
}

export function RichTextEditor({
  content,
  editable = true,
  placeholder,
  onChange
}: RichTextEditorProps): JSX.Element | null {
  const editor = useEditor({
    extensions: getExtensions({ placeholder }),
    content,
    editable,
    onUpdate: ({ editor }) => onChange?.(editor.getJSON())
  })

  if (!editor) return null

  return (
    <div className={styles.container}>
      {editable && <EditorToolbar editor={editor} />}
      <EditorContent editor={editor} className={styles.editorContent} />
    </div>
  )
}
