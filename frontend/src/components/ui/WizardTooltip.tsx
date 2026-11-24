import type { JSX } from 'react/jsx-runtime'
import { useState, type ReactElement, type ReactNode } from 'react'

import * as Tooltip from '@radix-ui/react-tooltip'

import styles from './WizardTooltip.module.css'

type SideOptions = 'top' | 'bottom' | 'left' | 'right'

type WizardTooltipProps = {
  children: ReactElement
  label: ReactNode
  side?: SideOptions
  sideOffset?: number
  canHover?: boolean
  disabled?: boolean
}

export function WizardTooltip({
  children,
  label,
  side = 'top',
  sideOffset = 5,
  canHover,
  disabled
}: WizardTooltipProps): JSX.Element {
  const [open, setOpen] = useState(false)
  const [prevDisabled, setPrevDisabled] = useState(disabled)

  // Avoids unnecessary `useEffect` calls to prevent possible cascading calls
  if (disabled !== prevDisabled) {
    setPrevDisabled(disabled)
    setOpen(false)
  }

  return (
    <Tooltip.Root
      open={open && !disabled}
      onOpenChange={(next) => setOpen(next && !disabled)}
      disableHoverableContent={!canHover}
    >
      <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>

      <Tooltip.Portal>
        <Tooltip.Content side={side} sideOffset={sideOffset} className={styles.content}>
          {label}
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  )
}
