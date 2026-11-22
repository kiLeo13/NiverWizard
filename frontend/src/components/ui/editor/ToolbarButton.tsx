import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import type { JSX } from 'react/jsx-runtime'

import clsx from 'clsx'

import { WizardTooltip } from '../WizardTooltip'
import { forwardRef } from 'react'

import styles from './ToolbarButton.module.css'

export interface ToolbarButtonProps extends ComponentPropsWithoutRef<'button'> {
  title: string
  children: ReactNode
  isActive?: boolean
}

export const ToolbarButton = forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  ({ onClick, onMouseDown, title, children, isActive, disabled, ...props }, ref): JSX.Element => {
    return (
      <WizardTooltip label={title}>
        <button
          ref={ref}
          type="button"
          disabled={disabled}
          onClick={onClick}
          onMouseDown={(e) => {
            e.preventDefault()
            onMouseDown?.(e)
          }}
          className={clsx(styles.button, isActive && styles.active)}
          {...props}
        >
          {children}
        </button>
      </WizardTooltip>
    )
  }
)

ToolbarButton.displayName = 'ToolbarButton'
