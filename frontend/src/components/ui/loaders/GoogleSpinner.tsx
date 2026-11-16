import type { CSSProperties, JSX, SVGProps } from 'react'

import clsx from 'clsx'

import styles from './GoogleSpinner.module.css'

const DEFAULT_SIZE = 24
const DEFAULT_COLOR = '#7d64c0'
const DEFAULT_STROKE_WIDTH = '10%'

type GoogleSpinnerProps = {
  size?: CSSProperties['width']
  color?: CSSProperties['color']
  className?: string
}

export function GoogleSpinner({ size, color, className }: GoogleSpinnerProps): JSX.Element {
  const realSize = size || DEFAULT_SIZE
  return (
    <span
      className={clsx(styles.spinner, className)}
      style={{ width: realSize, height: realSize, color: color || DEFAULT_COLOR }}
      role="progressbar"
      aria-label="Loading"
    >
      <span className={styles.container}>
        <span className={styles.layer}>
          <span className={clsx(styles.clipper, styles.left)}>
            <CircleGraphic />
          </span>

          <span className={styles.gapPatch}>
            <CircleGraphic strokeWidth="8%" />
          </span>

          <span className={clsx(styles.clipper, styles.right)}>
            <CircleGraphic />
          </span>
        </span>
      </span>
    </span>
  )
}

type CircleGraphicProps = {
  className?: string
  strokeWidth?: SVGProps<SVGCircleElement>['strokeWidth']
}

function CircleGraphic({ className, strokeWidth }: CircleGraphicProps): JSX.Element {
  return (
    <svg
      className={clsx(styles.graphic, className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16.4 16.4"
      focusable="false"
      aria-hidden="true"
    >
      <circle
        cx="50%"
        cy="50%"
        r="7"
        strokeDasharray="43.9823"
        strokeDashoffset="21.9911"
        strokeWidth={strokeWidth || DEFAULT_STROKE_WIDTH}
      />
    </svg>
  )
}
