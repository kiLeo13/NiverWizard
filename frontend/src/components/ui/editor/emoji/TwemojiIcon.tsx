import type { JSX } from 'react/jsx-runtime'

import { TwemojiText } from '@/components/ui/TwemojiText'

type TwemojiIconProps = {
  emoji: string
}

export function TwemojiIcon({ emoji }: TwemojiIconProps): JSX.Element {
  return <TwemojiText text={emoji} />
}
