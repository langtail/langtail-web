'use client'

import { calculateBox2D } from '../utils/box-calculations'

interface BoundingBoxProps {
  box: number[]
  label: string
}

export function BoundingBox({ box, label }: BoundingBoxProps) {
  const { percentages } = calculateBox2D(box)
  const { top, left, width, height } = percentages

  return (
    <div
      className="absolute border-2 border-primary"
      style={{
        top: `${top}%`,
        left: `${left}%`,
        width: `${width}%`,
        height: `${height}%`,
      }}
    >
      <span className="absolute -top-6 left-0 bg-primary text-primary-foreground px-2 py-0.5 text-sm rounded">
        {label}
      </span>
    </div>
  )
}