import React, { useEffect, useState, useMemo, forwardRef, useRef } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'

import { FiChevronDown, FiCheck, FiSearch } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import { TwemojiText } from '../TwemojiText'

import styles from './WizardDropdown.module.css'

type TriggerProps = Omit<
  React.ComponentPropsWithoutRef<'button'>,
  'children' | 'onChange' | 'value' | 'defaultValue'
>

type DropdownPositionProps = Pick<
  React.ComponentPropsWithoutRef<typeof DropdownMenu.Content>,
  'align' | 'side' | 'sideOffset'
>

type DropdownStateProps = Pick<
  React.ComponentPropsWithoutRef<typeof DropdownMenu.Root>,
  'open' | 'onOpenChange'
>

export type SelectOption = {
  value: string
  label: string
  icon?: React.ReactNode
}

export type WizardDropdownProps = TriggerProps &
  DropdownPositionProps &
  DropdownStateProps & {
    options: SelectOption[]
    value?: string
    onChange: (value: string) => void

    placeholder?: string
    hasSearch?: boolean
    invalid?: boolean

    customTrigger?: React.ReactNode
    contentClassName?: string
    emptyMessage?: string
  }

export const WizardDropdown = forwardRef<HTMLButtonElement, WizardDropdownProps>(
  (
    {
      options,
      value,
      onChange,
      placeholder,
      hasSearch = false,
      className,
      disabled = false,
      invalid = false,
      customTrigger,
      open,
      onOpenChange,
      align = 'start',
      side,
      sideOffset = 5,
      contentClassName,
      emptyMessage,
      ...triggerProps
    },
    ref
  ) => {
    const { t } = useTranslation('common')

    const [searchTerm, setSearchTerm] = useState('')
    const [internalOpen, setInternalOpen] = useState(false)

    const searchInputRef = useRef<HTMLInputElement>(null)
    const isOpen = open !== undefined ? open : internalOpen

    const handleOpenChange = (newOpen: boolean) => {
      if (open === undefined) {
        setInternalOpen(newOpen)
      }

      onOpenChange?.(newOpen)
    }

    useEffect(() => {
      if (!isOpen || !hasSearch) return

      const timeoutId = window.setTimeout(() => {
        searchInputRef.current?.focus()
      }, 0)

      return () => window.clearTimeout(timeoutId)
    }, [hasSearch, isOpen])

    const filteredOptions = useMemo(() => {
      if (!hasSearch || !searchTerm) return options

      return options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }, [options, searchTerm, hasSearch])

    const selectedOption = useMemo(
      () => options.find((option) => option.value === value),
      [options, value]
    )

    const shouldKeepSearchFocus = () =>
      hasSearch && document.activeElement === searchInputRef.current

    const handleSelect = (selectedValue: string) => {
      onChange(selectedValue)
      setSearchTerm('')
      handleOpenChange(false)
    }

    return (
      <DropdownMenu.Root open={isOpen} onOpenChange={handleOpenChange}>
        <DropdownMenu.Trigger asChild disabled={disabled}>
          {customTrigger ? (
            customTrigger
          ) : (
            <button
              ref={ref}
              className={clsx(styles.trigger, invalid && styles.invalid, className)}
              type="button"
              {...triggerProps}
            >
              <div className={styles.valueWrapper}>
                {selectedOption ? (
                  <>
                    {selectedOption.icon && (
                      <span className={styles.itemIcon}>{selectedOption.icon}</span>
                    )}

                    <span className={styles.label}>
                      <TwemojiText text={selectedOption.label} />
                    </span>
                  </>
                ) : (
                  <span className={styles.placeholder}>{placeholder || ''}</span>
                )}
              </div>

              <FiChevronDown className={styles.chevron} />
            </button>
          )}
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className={clsx(styles.content, contentClassName)}
            side={side}
            sideOffset={sideOffset}
            align={align}
            onCloseAutoFocus={(event) => event.preventDefault()}
          >
            {hasSearch && (
              <div className={styles.searchWrapper}>
                <FiSearch className={styles.searchIcon} />

                <input
                  ref={searchInputRef}
                  type="text"
                  className={styles.searchInput}
                  placeholder={t('menus.select.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  onKeyDown={(event) => event.stopPropagation()}
                />
              </div>
            )}

            <div className={styles.viewport}>
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <DropdownMenu.Item
                    key={option.value}
                    className={styles.item}
                    onPointerMove={(event) => {
                      if (shouldKeepSearchFocus()) {
                        event.preventDefault()
                      }
                    }}
                    onSelect={() => handleSelect(option.value)}
                  >
                    <div className={styles.itemLeft}>
                      {option.icon && <span className={styles.itemIcon}>{option.icon}</span>}

                      <span className={styles.label}>
                        <TwemojiText text={option.label} />
                      </span>
                    </div>

                    {value === option.value && <FiCheck className={styles.checkIcon} />}
                  </DropdownMenu.Item>
                ))
              ) : (
                <div className={styles.noResults}>
                  {emptyMessage || t('menus.select.noResults')}
                </div>
              )}
            </div>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    )
  }
)

WizardDropdown.displayName = 'WizardDropdown'
