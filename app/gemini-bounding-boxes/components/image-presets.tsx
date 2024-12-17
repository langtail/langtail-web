'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { assetPrefix } from '@/lib/utils'
import type { readAndCompressImage as ReadAndCompressImageType } from 'browser-image-resizer'

interface ImagePreset {
  id: string
  url: string
  label: string
  thumbnail: string
}

const presets: ImagePreset[] = [
  {
    id: 'apples',
    url: `${assetPrefix}/images/gemini-bounds/apples.jpg`,
    label: 'Apples',
    thumbnail: `${assetPrefix}/images/gemini-bounds/apples.jpg`,
  },
  {
    id: 'llammas',
    url: `${assetPrefix}/images/gemini-bounds/llammas.jpg`,
    label: 'Llammas',
    thumbnail: `${assetPrefix}/images/gemini-bounds/llammas.jpg`,
  },
  {
    id: 'fish',
    url: `${assetPrefix}/images/gemini-bounds/fish.jpg`,
    label: 'Fish',
    thumbnail: `${assetPrefix}/images/gemini-bounds/fish.jpg`,
  },
]

async function convertImageToBase64(imageUrl: string): Promise<string> {
  try {
    if (typeof window === 'undefined') {
      return imageUrl
    }

    const response = await fetch(imageUrl)
    const blob = await response.blob()
    const file = new File([blob], 'image.jpg', { type: blob.type })

    const { readAndCompressImage } = await import('browser-image-resizer')
    const config = {
      quality: 0.7,
      maxWidth: 800,
      maxHeight: 600,
      autoRotate: true,
      debug: false,
    }

    const compressedImage = await readAndCompressImage(file, config)
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(compressedImage)
    })
  } catch (error) {
    console.error('Error converting image to base64:', error)
    throw error
  }
}

interface ImagePresetsProps {
  onSelect: (imageUrl: string) => void
  selectedUrl: string | null
}

export function ImagePresets({ onSelect, selectedUrl }: ImagePresetsProps) {
  const handlePresetSelect = async (imageUrl: string) => {
    try {
      const base64Image = await convertImageToBase64(imageUrl)
      onSelect(base64Image)
    } catch (error) {
      console.error('Error selecting preset image:', error)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-muted-foreground">
        Or try with an example image:
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {presets.map((preset) => (
          <Card
            key={preset.id}
            className={cn(
              'relative overflow-hidden cursor-pointer transition-all hover:ring-2 hover:ring-primary/50 group',
              selectedUrl === preset.url && 'ring-2 ring-primary'
            )}
            onClick={() => handlePresetSelect(preset.url)}
          >
            <img
              src={preset.thumbnail}
              alt={preset.label}
              className="w-full aspect-[4/3] object-cover"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button variant="secondary" size="sm" className="text-xs">
                Use this image
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
