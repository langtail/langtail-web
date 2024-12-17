'use client'

import { ChangeEvent } from 'react'
import { Upload } from 'lucide-react'
import type { readAndCompressImage as ReadAndCompressImageType } from 'browser-image-resizer'

interface ImageUploaderProps {
  onImageUpload: (imageUrl: string) => void
}

export function ImageUploader({ onImageUpload }: ImageUploaderProps) {
  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        if (typeof window === 'undefined') {
          return
        }

        const { readAndCompressImage } = await import('browser-image-resizer')
        const config = {
          quality: 0.7,
          maxWidth: 800,
          maxHeight: 600,
          autoRotate: true,
          debug: false,
        }

        const compressedImage = await readAndCompressImage(file, config)
        const reader = new FileReader()
        reader.onloadend = () => {
          const base64String = reader.result as string
          onImageUpload(base64String)
        }
        reader.readAsDataURL(compressedImage)
      } catch (error) {
        console.error('Error compressing image:', error)
      }
    }
  }

  return (
    <div className="flex items-center justify-center w-full">
      <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted/70 border-border">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
          <p className="mb-2 text-sm text-muted-foreground">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-muted-foreground">PNG, JPG or JPEG</p>
        </div>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </label>
    </div>
  )
}
