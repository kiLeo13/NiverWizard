import type { JSX } from 'react/jsx-runtime'
import { Fragment, useState, type ReactNode } from 'react'

import clsx from 'clsx'

import { parse } from 'twemoji-parser'
import { getTwemojiSvgUrl } from '@/utils/twemojiUtils'

import styles from './TwemojiText.module.css'

type TwemojiTextProps = {
  text: string
  imgClassName?: string
}

export function TwemojiText({ text, imgClassName }: TwemojiTextProps): JSX.Element {
  const entities = parse(text, { buildUrl: getTwemojiSvgUrl })

  if (entities.length === 0) {
    return <>{text}</>
  }

  const nodes: ReactNode[] = []
  let cursor = 0

  for (const entity of entities) {
    if (!entity.url) continue

    const [start, end] = entity.indices
    if (start > cursor) {
      nodes.push(text.slice(cursor, start))
    }

    nodes.push(
      <TwemojiImg
        key={`${start}-${entity.url}`}
        src={entity.url}
        emoji={entity.text}
        className={imgClassName}
      />
    )
    cursor = end
  }

  if (cursor < text.length) {
    nodes.push(text.slice(cursor))
  }

  return <Fragment>{nodes}</Fragment>
}

type TwemojiImgProps = {
  src: string
  emoji: string
  className?: string
}

function TwemojiImg({ src, emoji, className }: TwemojiImgProps): JSX.Element {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return <>{emoji}</>
  }

  return (
    <img
      className={clsx('emoji', styles.emoji, className)}
      src={src}
      alt={emoji}
      draggable={false}
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}
