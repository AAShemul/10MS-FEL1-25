'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import { FaChevronLeft, FaChevronRight, FaPlay } from 'react-icons/fa'
import type { Media } from '@/types/interface'

interface MediaThumbnailsProps {
  media: Media[]
  selectedImage: Media | null
  onSelect: (media: Media) => void
}

export default function MediaThumbnails({ media, selectedImage, onSelect: onMediaSelect }: MediaThumbnailsProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: false, 
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 1024px)': { slidesToScroll: 2 },
      '(min-width: 640px)': { slidesToScroll: 1 },
    },
  })

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true)

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
  }, [emblaApi])

  const handleEmblaSelect = useCallback(() => {
    if (!emblaApi) return
    
    const timer = setTimeout(() => {
      const canScrollPrev = emblaApi.canScrollPrev()
      const canScrollNext = emblaApi.canScrollNext()
      
      setPrevBtnEnabled(canScrollPrev)
      setNextBtnEnabled(canScrollNext)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    
    const timer = setTimeout(() => {
      setPrevBtnEnabled(emblaApi.canScrollPrev())
      setNextBtnEnabled(emblaApi.canScrollNext())
      
      emblaApi.reInit()
      
      emblaApi.on('select', handleEmblaSelect)
      emblaApi.on('reInit', handleEmblaSelect)
      emblaApi.on('resize', handleEmblaSelect)
    }, 100)
    
    return () => {
      clearTimeout(timer)
      if (emblaApi) {
        emblaApi.off('select', handleEmblaSelect)
        emblaApi.off('reInit', handleEmblaSelect)
        emblaApi.off('resize', handleEmblaSelect)
      }
    }
  }, [emblaApi, handleEmblaSelect])

  return (
    <div className="relative mt-4 w-full">
      <div className="overflow-hidden w-full" ref={emblaRef}>
        <div className="flex w-auto">
          {media.map((item, index) => (
            <div key={index} className="flex-[0_0_80px] sm:flex-[0_0_100px] px-2 flex-grow-0 flex-shrink-0">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  onMediaSelect(item)
                }}
                className={`w-full aspect-square rounded-md overflow-hidden border-2 transition-colors ${
                  item === selectedImage
                    ? 'border-primary-600 dark:border-primary-400'
                    : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={item.resource_type === 'image' ? item.resource_value : (item.thumbnail_url || '')}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  {item.resource_type === 'video' && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <FaPlay className="text-white/80 w-4 h-4" />
                    </div>
                  )}
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {media.length > 3 && (
        <>
          <button
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-8 h-8 flex items-center justify-center rounded-full shadow-md transition-colors z-10 ${
              prevBtnEnabled
                ? 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'
                : 'bg-gray-200 dark:bg-gray-700 cursor-not-allowed opacity-0'
            }`}
            aria-label="Previous thumbnails"
          >
            <FaChevronLeft className={`w-4 h-4 ${
              prevBtnEnabled ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'
            }`} />
          </button>
          
          <button
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-8 h-8 flex items-center justify-center rounded-full shadow-md transition-colors z-10 ${
              nextBtnEnabled
                ? 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'
                : 'bg-gray-200 dark:bg-gray-700 cursor-not-allowed opacity-0'
            }`}
            aria-label="Next thumbnails"
          >
            <FaChevronRight className={`w-4 h-4 ${
              nextBtnEnabled ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'
            }`} />
          </button>
        </>
      )}
    </div>
  )
}
