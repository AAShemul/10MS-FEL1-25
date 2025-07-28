'use client'

import type { Testimonial } from '@/types/interface'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { FaChevronLeft, FaChevronRight, FaRegStar, FaStar } from 'react-icons/fa'

export default function TestimonialCarousel({ testimonials, title }: { testimonials: Testimonial[]; title: string }) {
	const [emblaRef, emblaApi] = useEmblaCarousel({
		loop: true,
		align: 'start',
		breakpoints: {
			'(min-width: 1024px)': { axis: 'x', slidesToScroll: 2.5 },
		},
	})

	const [selectedIndex, setSelectedIndex] = useState(0)
	const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

	const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi])

	const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])

	const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

	const onSelect = useCallback(() => {
		if (!emblaApi) return
		setSelectedIndex(emblaApi.selectedScrollSnap())
	}, [emblaApi])

	useEffect(() => {
		if (!emblaApi) return

		setScrollSnaps(emblaApi.scrollSnapList())

		emblaApi.on('select', onSelect)
		emblaApi.on('reInit', onSelect)

		return () => {
			emblaApi.off('select', onSelect)
			emblaApi.off('reInit', onSelect)
		}
	}, [emblaApi, onSelect])

	return (
		<section className="mb-12">
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
				<div className="flex space-x-2">
					<button
						onClick={scrollPrev}
						className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
						aria-label="Previous testimonial"
					>
						<FaChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
					</button>
					<button
						onClick={scrollNext}
						className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
						aria-label="Next testimonial"
					>
						<FaChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
					</button>
				</div>
			</div>

			<div className="relative">
				<div
					className="overflow-hidden"
					ref={emblaRef}
				>
					<div className="flex -mx-3">
						{testimonials?.map((testimonial, idx) => (
							<div
								key={idx}
								className="flex-[0_0_calc(100%-1.5rem)] sm:flex-[0_0_calc(50%-1.5rem)] lg:flex-[0_0_calc(40%-1.5rem)] px-3"
							>
								<div className="h-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
									<div className="flex items-center space-x-4 mb-4">
										<div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden">
											<Image
												src={testimonial.profile_image}
												alt={testimonial.name}
												width={48}
												height={48}
												className="w-full h-full object-cover"
											/>
										</div>
										<div>
											<h4 className="font-medium text-gray-900 dark:text-white">
												{testimonial.name}
											</h4>
											<p className="text-sm text-gray-500 dark:text-gray-400">
												{testimonial.description}
											</p>
										</div>
									</div>
									<div className="flex items-center text-yellow-400 mb-2">
										{[...Array(5)].map((_, i) =>
											i < Math.floor(testimonial.rating || 5) ? (
												<FaStar
													key={i}
													className="w-4 h-4"
												/>
											) : (
												<FaRegStar
													key={i}
													className="w-4 h-4"
												/>
											),
										)}
									</div>
									<p className="text-gray-600 dark:text-gray-300 text-sm">
										{testimonial.comment || 'Great course, highly recommended!'}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Dots indicator */}
			{testimonials?.length > 1 && (
				<div className="flex justify-center mt-6 space-x-2">
					{scrollSnaps.map((_, idx) => (
						<button
							key={idx}
							onClick={() => scrollTo(idx)}
							className={`w-2 h-2 rounded-full transition-colors ${
								idx === selectedIndex ? 'bg-blue-600 dark:bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
							}`}
							aria-label={`Go to testimonial ${idx + 1}`}
						/>
					))}
				</div>
			)}
		</section>
	)
}
