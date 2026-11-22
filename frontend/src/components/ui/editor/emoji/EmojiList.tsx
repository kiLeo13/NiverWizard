import type { SuggestionKeyDownProps, SuggestionProps } from '@tiptap/suggestion'
import type { EmojiItem } from './searchEmoji'

import clsx from 'clsx'

import { TwemojiIcon } from './TwemojiIcon'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import styles from './EmojiList.module.css'

export type EmojiListRef = {
  onKeyDown: (props: SuggestionKeyDownProps) => boolean
}

export const EmojiList = forwardRef<EmojiListRef, SuggestionProps<EmojiItem>>((props, ref) => {
  const { t } = useTranslation('common')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const activeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setSelectedIndex(0)
  }, [props.items])

  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: 'nearest' })
  }, [selectedIndex])

  const selectItem = (index: number) => {
    const item = props.items[index]
    if (item) {
      props.command(item)
    }
  }

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (event.key === 'ArrowUp') {
        setSelectedIndex((i) => (i + props.items.length - 1) % props.items.length)
        return true
      }
      if (event.key === 'ArrowDown') {
        setSelectedIndex((i) => (i + 1) % props.items.length)
        return true
      }
      if (event.key === 'Enter' || event.key === 'Tab') {
        event.preventDefault()
        selectItem(selectedIndex)
        return true
      }
      return false
    }
  }))

  if (!props.items.length) return null

  return (
    <div className={styles.popup}>
      {props.items.map((item, index) => (
        <button
          key={item.id}
          ref={index === selectedIndex ? activeRef : undefined}
          type="button"
          className={clsx(styles.item, index === selectedIndex && styles.selected)}
          onClick={() => selectItem(index)}
        >
          <div className={styles.itemInfos}>
            <span className={styles.icon}>
              <TwemojiIcon emoji={item.skins[0].native} />
            </span>
            <span className={styles.name}>:{item.id}:</span>
          </div>
          {index === selectedIndex && <div className={styles.tabKey}>{t('keys.tab')}</div>}
        </button>
      ))}
    </div>
  )
})

EmojiList.displayName = 'EmojiList'
