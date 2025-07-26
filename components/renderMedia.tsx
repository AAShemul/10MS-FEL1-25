'use client'

import type { JSX } from 'react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import type { ProductData, Media } from '@/types/interface'
import { FaPlay } from 'react-icons/fa'

export default function RenderMedia({ product }: { product: ProductData }): JSX.Element {
	const [selectedImage, setSelectedImage] = useState<Media | null>(null)
	const [isVideoModalOpen, setIsVideoModalOpen] = useState<string | false>(false)

	useEffect(() => {
		if (product.media?.length > 0 && product.media[0].resource_type === 'image') {
			setSelectedImage(product.media[0])
		} else if (product.media?.length > 0 && product.media[0].resource_type === 'video') {
			setSelectedImage(product.media[0])
		}
	}, [])

	if (!product.media?.length) return <></>

	return (
		<div className="mb-8">
			{isVideoModalOpen && (
				<>
					<div
						onClick={() => setIsVideoModalOpen(false)}
						className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 cursor-pointer"
					>
						<button
							onClick={() => setIsVideoModalOpen(false)}
							className="absolute top-20 right-20 text-white rounded-full text-5xl cursor-pointer"
						>
							&times;
						</button>
					</div>
					<div className="fixed inset-40 bg-black/90 flex items-center justify-center z-60">
						<iframe
							src={`https://www.youtube.com/embed/${isVideoModalOpen}`}
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
							className="w-full h-full rounded-lg"
						/>
					</div>
				</>
			)}

			<div className="relative h-64 md:h-96 bg-gray-200 dark:bg-gray-800 rounded-lg mb-4 overflow-hidden">
				{selectedImage && (
					<Image
						src={
							selectedImage.resource_type === 'image'
								? selectedImage.resource_value
								: selectedImage.thumbnail_url || ''
						}
						alt={product.title}
						fill
						className="object-cover"
					/>
				)}
				{selectedImage?.resource_type === 'video' && (
					<div className="absolute inset-0 flex items-center justify-center">
						<button className="group bg-white/90 dark:bg-gray-900/90 p-4 rounded-full hover:bg-white transition-all duration-300 cursor-pointer">
							<FaPlay
								className="text-gray-800 dark:text-gray-200 group-hover:text-gray-200 dark:group-hover:text-gray-800 text-xl"
								onClick={event => {
									event.preventDefault()
									setIsVideoModalOpen(selectedImage?.resource_value)
								}}
							/>
						</button>
					</div>
				)}
			</div>

			{product.media.length > 1 && (
				<div className="flex space-x-2 overflow-x-auto py-2">
					{product.media.map((media, index) => (
						<button
							key={index}
							onClick={event => {
								event.preventDefault()
								setSelectedImage(media)
							}}
							className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 cursor-pointer ${
								media === selectedImage
									? 'border-primary-600 dark:border-primary-400'
									: 'border-transparent'
							}`}
						>
							<Image
								src={media.resource_type === 'image' ? media.resource_value : media.thumbnail_url || ''}
								alt={`Thumbnail ${index + 1}`}
								width={64}
								height={64}
								className="w-full h-full object-cover"
							/>
						</button>
					))}
				</div>
			)}
		</div>
	)
}
