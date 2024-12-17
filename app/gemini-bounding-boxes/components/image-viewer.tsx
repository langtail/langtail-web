'use client'

import { BoundingBox } from './bounding-box'
import { LoadingOverlay } from './loading-overlay'
import type { Annotation } from '../types'

interface ImageViewerProps {
  imageUrl: string | null
  annotations: Annotation[]
  isLoading?: boolean
}

export function ImageViewer({ imageUrl, annotations, isLoading }: ImageViewerProps) {
  if (!imageUrl) {
    return null
  }

  return (
    <div className="relative inline-block">
      <img src={imageUrl} alt="Uploaded" className="max-w-full h-auto rounded-lg" />
      <div className="absolute inset-0">
        {annotations.map((annotation, index) => (
          <BoundingBox
            key={index}
            box={annotation.box_2d}
            label={annotation.label}
          />
        ))}
      </div>
      {isLoading && <LoadingOverlay />}
    </div>
  )
}