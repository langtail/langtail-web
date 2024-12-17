'use client'

import { useState, useRef, useEffect } from 'react'
import { ImageUploader } from './components/image-uploader'
import { ImagePresets } from './components/image-presets'
import { QueryInput } from './components/query-input'
import { ImageViewer } from './components/image-viewer'
import { JsonViewer } from './components/json-viewer'
import { Card } from '@/components/ui/card'
import type { Annotation } from './types'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { apiFetch } from '@/lib/api-utils'

export function GeminiBoundingBoxesClient() {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [annotations, setAnnotations] = useState<Annotation[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const queryInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (imageUrl && queryInputRef.current) {
      queryInputRef.current.focus()
    }
  }, [imageUrl])

  const handleDetection = async (query: string) => {
    if (!imageUrl) return

    setIsLoading(true)
    try {
      const response = await apiFetch('/api/gemini-bounds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: imageUrl,
          query,
        }),
      })

      if (!response.ok) {
        throw new Error('Detection failed')
      }

      const data = await response.json()
      setAnnotations(data.annotations)
    } catch (error) {
      console.error('Error during detection:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearImage = () => {
    setImageUrl(null)
    setAnnotations([])
  }

  return (
    <div className="p-4 md:p-8 mt-5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Gemini Bounding Boxes</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Upload an image and specify what objects you want to detect. Powered
            by Google&apos;s Gemini 2.0 Flash experimental model.
          </p>
        </div>

        <Card className="p-6 bg-gray-800/50 border-gray-700/50">
          <div className="space-y-6">
            {imageUrl ? (
              <div className="space-y-6">
                <div className="relative">
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute -top-3 -right-3 z-10"
                    onClick={handleClearImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <ImageViewer
                    imageUrl={imageUrl}
                    annotations={annotations}
                    isLoading={isLoading}
                  />
                </div>
                <QueryInput
                  onSubmit={handleDetection}
                  isLoading={isLoading}
                  ref={queryInputRef}
                />
                <JsonViewer annotations={annotations} />
              </div>
            ) : (
              <>
                <ImageUploader onImageUpload={setImageUrl} />
                <ImagePresets onSelect={setImageUrl} selectedUrl={imageUrl} />
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
