import type { JSX, ReactElement } from 'react'

import * as Popover from '@radix-ui/react-popover'
import clsx from 'clsx'

import { HexColorInput, HexColorPicker } from 'react-colorful'
import { FiCheck } from 'react-icons/fi'
import { LuBan } from 'react-icons/lu'
import { useEffect, useMemo, useState } from 'react'
import { throttle } from '@/utils/throttle'

import styles from './ColorPicker.module.css'

export type ColorItem = {
  id: string
  color: string
}

const DEFAULT_COLORS: ColorItem[] = [
  { id: 'default', color: 'inherit' },
  { id: 'gray', color: '#9ca3af' },
  { id: 'purple', color: '#c084fc' },
  { id: 'indigo', color: '#818cf8' },
  { id: 'blue', color: '#60a5fa' },
  { id: 'cyan', color: '#22d3ee' },
  { id: 'green', color: '#4ade80' },
  { id: 'yellow', color: '#facc15' },
  { id: 'orange', color: '#fb923c' },
  { id: 'red', color: '#f87171' },
  { id: 'pink', color: '#f472b6' }
]

export type ColorPickerProps = {
  value?: string
  onChange: (color: string) => void
  colors?: ColorItem[]
  allowRgb?: boolean
  throttleMs?: number
  children: ReactElement
}

export function ColorPicker({
  value,
  onChange,
  colors = DEFAULT_COLORS,
  allowRgb = false,
  throttleMs = 80,
  children
}: ColorPickerProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)
  const [dragColor, setDragColor] = useState<string | null>(null)

  const activeColor = dragColor ?? (value && value !== 'inherit' ? value : '#818cf8')

  const throttledOnChange = useMemo(() => {
    return throttle((color: string) => onChange(color), throttleMs)
  }, [onChange, throttleMs])

  useEffect(() => {
    return () => {
      throttledOnChange.cancel()
    }
  }, [throttledOnChange])

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      setDragColor(null)
    }
  }

  const handleSwatchSelect = (color: string) => {
    setDragColor(null)
    onChange(color)
  }

  const handleCustomPickerChange = (color: string) => {
    setDragColor(color)
    throttledOnChange(color)
  }

  const isDefaultSelected = !value || value === 'inherit'

  return (
    <Popover.Root modal open={isOpen} onOpenChange={handleOpenChange}>
      <Popover.Trigger asChild>{children}</Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className={styles.content}
          sideOffset={8}
          align="start"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          {/* Swatches Grid */}
          <div className={styles.grid}>
            {colors.map((item) => {
              const isDefault = item.color === 'inherit'
              const isSelected = isDefault ? isDefaultSelected : value === item.color

              return (
                <button
                  key={item.id}
                  type="button"
                  className={clsx(styles.swatch, isSelected && styles.selected)}
                  style={!isDefault ? { backgroundColor: item.color } : undefined}
                  onClick={() => handleSwatchSelect(item.color)}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {isDefault && <LuBan className={styles.resetIcon} />}
                  {isSelected && !isDefault && <FiCheck className={styles.checkIcon} />}
                </button>
              )
            })}
          </div>

          {/* Optional Palette */}
          {allowRgb && (
            <div className={styles.customSection}>
              <div className={styles.divider} />
              <HexColorPicker
                color={activeColor}
                onChange={handleCustomPickerChange}
                className={styles.picker}
              />
              <div className={styles.inputRow}>
                <span className={styles.hash}>#</span>
                <HexColorInput
                  color={activeColor}
                  onChange={handleCustomPickerChange}
                  className={styles.hexInput}
                  prefixed={false}
                />
              </div>
            </div>
          )}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
