'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

interface CarouselImage {
  src: string
  alt: string
  caption?: string
}

export interface BlogCarouselProps {
  images: CarouselImage[]
  autoplayInterval?: number
}

export function BlogCarousel({
  images,
  autoplayInterval = 3000,
}: BlogCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    skipSnaps: false,
  })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const progressRef = useRef<NodeJS.Timeout | null>(null)

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCurrentIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  // Handle slide selection
  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  // Autoplay functionality with progress
  useEffect(() => {
    if (!emblaApi) return

    const play = () => {
      progressRef.current = setInterval(() => {
        if (autoplay) {
          emblaApi.scrollNext()
        }
      }, autoplayInterval)
    }

    play()

    return () => {
      if (progressRef.current) {
        clearInterval(progressRef.current)
      }
    }
  }, [emblaApi, autoplay, autoplayInterval])

  // Cleanup autoplay on mouse events
  const handleMouseEnter = () => setAutoplay(false)
  const handleMouseLeave = () => setAutoplay(true)

  return (
    <div
      className="relative mx-auto mt-10 h-full w-full rounded-lg border border-white/10 bg-black/20 p-8 pb-12"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute bottom-8 left-4 right-4 mx-auto flex max-w-lg space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className="relative h-1 flex-1 cursor-pointer rounded bg-gray-300"
            onClick={() => scrollTo(index)}
          >
            {index === currentIndex && (
              <div
                className="absolute left-0 top-0 h-full rounded bg-indigo-500"
                style={{
                  animation: `progress ${autoplayInterval}ms linear forwards`,
                }}
              ></div>
            )}
            {index < currentIndex && (
              <div className="absolute left-0 top-0 h-full w-full rounded bg-indigo-500"></div>
            )}
          </div>
        ))}
      </div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((image, index) => (
            <div key={index} className="relative flex-[0_0_100%]">
              <img
                src={image.src}
                alt={image.alt}
                className="mx-auto h-auto max-h-[500px] w-auto rounded-lg object-contain"
              />
              {image.caption && (
                <p className="mt-4 text-center text-sm text-gray-400">
                  {image.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 transform rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20"
        onClick={() => emblaApi && emblaApi.scrollPrev()}
      >
        <ChevronLeftIcon size={24} />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 transform rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20"
        onClick={() => emblaApi && emblaApi.scrollNext()}
      >
        <ChevronRightIcon size={24} />
      </button>
      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}
