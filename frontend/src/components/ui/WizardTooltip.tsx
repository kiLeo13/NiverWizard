import type { ReactElement, ReactNode } from 'react'
import type { JSX } from 'react/jsx-runtime'

import * as Tooltip from '@radix-ui/react-tooltip'

import styles from './WizardTooltip.module.css'

type SideOptions = 'top' | 'bottom' | 'left' | 'right'

type WizardTooltipProps = {
  children: ReactElement
  label: ReactNode
  side?: SideOptions
  sideOffset?: number
  canHover?: boolean
}

export function WizardTooltip({
  children,
  label,
  side = 'top',
  sideOffset = 5,
  canHover
}: WizardTooltipProps): JSX.Element {
  return (
    <Tooltip.Root disableHoverableContent={!canHover}>
      <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>

      <Tooltip.Portal>
        <Tooltip.Content side={side} sideOffset={sideOffset} className={styles.content}>
          {label}
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  )
}
