import type { JSX } from 'react/jsx-runtime'
import type { ReactNode } from 'react'

import { Editor, useEditorState } from '@tiptap/react'
import { ToolbarButton } from './ToolbarButton'
import { FiBold, FiCornerDownLeft, FiItalic, FiList, FiRotateCcw, FiRotateCw } from 'react-icons/fi'
import { LuHeading1, LuHeading2, LuHeading3, LuListOrdered } from 'react-icons/lu'
import { ColorPicker } from '../ColorPicker'
import { MdFormatColorText } from 'react-icons/md'
import { FaCode } from 'react-icons/fa6'
import { ImQuotesRight } from 'react-icons/im'
import { useTranslation } from 'react-i18next'

import styles from './EditorToolbar.module.css'

type EditorToolbarProps = {
  editor: Editor
}

export function EditorToolbar({ editor }: EditorToolbarProps): JSX.Element {
  const { t } = useTranslation('common')

  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor.isActive('bold'),
      isItalic: ctx.editor.isActive('italic'),
      isH1: ctx.editor.isActive('heading', { level: 1 }),
      isH2: ctx.editor.isActive('heading', { level: 2 }),
      isH3: ctx.editor.isActive('heading', { level: 3 }),
      isCode: ctx.editor.isActive('code'),
      isBulletList: ctx.editor.isActive('bulletList'),
      isOrderedList: ctx.editor.isActive('orderedList'),
      isBlockquote: ctx.editor.isActive('blockquote'),
      canUndo: ctx.editor.can().undo(),
      canRedo: ctx.editor.can().redo(),
      canSetColor: ctx.editor.can().setColor(''),
      color: ctx.editor.getAttributes('textStyle').color as string | undefined
    })
  })

  return (
    <header className={styles.toolbar}>
      {/* History */}
      <ToolbarGroup label={t('editor.labels.history')}>
        <ToolbarButton
          title={t('editor.undo')}
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!state.canUndo}
        >
          <FiRotateCcw className={styles.icon} />
        </ToolbarButton>
        <ToolbarButton
          title={t('editor.redo')}
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!state.canRedo}
        >
          <FiRotateCw className={styles.icon} />
        </ToolbarButton>
      </ToolbarGroup>

      {/* Headings */}
      <ToolbarGroup label={t('editor.labels.headings')}>
        <ToolbarButton
          title={t('editor.heading1')}
          isActive={state.isH1}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          <LuHeading1 className={styles.icon} />
        </ToolbarButton>
        <ToolbarButton
          title={t('editor.heading2')}
          isActive={state.isH2}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <LuHeading2 className={styles.icon} />
        </ToolbarButton>
        <ToolbarButton
          title={t('editor.heading3')}
          isActive={state.isH3}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <LuHeading3 className={styles.icon} />
        </ToolbarButton>
      </ToolbarGroup>

      {/* Inline Marks */}
      <ToolbarGroup label={t('editor.labels.styles')}>
        <ToolbarButton
          title={t('editor.bold')}
          isActive={state.isBold}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <FiBold className={styles.icon} />
        </ToolbarButton>
        <ToolbarButton
          title={t('editor.italic')}
          isActive={state.isItalic}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <FiItalic className={styles.icon} />
        </ToolbarButton>

        <ColorPicker
          value={state.color}
          allowRgb
          onChange={(color) => {
            if (color === 'inherit') {
              editor.chain().focus().unsetColor().run()
            } else {
              editor.chain().focus().setColor(color).run()
            }
          }}
        >
          <ToolbarButton
            title={t('editor.color')}
            isActive={!!state.color && state.color !== 'inherit'}
            disabled={!state.canSetColor}
          >
            <MdFormatColorText className={styles.icon} />
          </ToolbarButton>
        </ColorPicker>
      </ToolbarGroup>

      {/* Blocks & Lists */}
      <ToolbarGroup label={t('editor.labels.insert')}>
        <ToolbarButton
          title={t('editor.code')}
          isActive={state.isCode}
          onClick={() => editor.chain().focus().toggleCode().run()}
        >
          <FaCode className={styles.icon} />
        </ToolbarButton>
        <ToolbarButton
          title={t('editor.bulletList')}
          isActive={state.isBulletList}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <FiList className={styles.icon} />
        </ToolbarButton>
        <ToolbarButton
          title={t('editor.orderedList')}
          isActive={state.isOrderedList}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <LuListOrdered className={styles.icon} />
        </ToolbarButton>
        <ToolbarButton
          title={t('editor.blockquote')}
          isActive={state.isBlockquote}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <ImQuotesRight className={styles.icon} />
        </ToolbarButton>
        <ToolbarButton
          title={t('editor.horizontalRule')}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <FiCornerDownLeft className={styles.icon} />
        </ToolbarButton>
      </ToolbarGroup>
    </header>
  )
}

type ToolbarGroupProps = {
  label: string
  children: ReactNode
}

function ToolbarGroup({ label, children }: ToolbarGroupProps): JSX.Element {
  return (
    <div className={styles.group}>
      <div className={styles.groupHeading}>{label}</div>
      <div className={styles.groupTools}>{children}</div>
    </div>
  )
}
