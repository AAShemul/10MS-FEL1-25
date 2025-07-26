import type { FAQ, Instructor, Section, Testimonial } from '@/types/interface'
import Image from 'next/image'
import Accordions from '@/components/accordions'
import { FaRegStar, FaStar } from 'react-icons/fa'

export default function renderSection({data}: {data: Section}) {
	switch (data.type) {
		case 'instructors':
			return (
				<section
					key={data.name}
					className="mb-12"
				>
					<h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{data.name}</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{(data.values as Instructor[])?.map((instructor: Instructor, idx: number) => (
							<div
								key={idx}
								className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
							>
								<div className="flex flex-col items-center space-x-4">
									<div className="w-20 h-20 rounded-full overflow-hidden">
										<Image
											src={instructor.image}
											alt={instructor.name}
											width={80}
											height={80}
											className="w-full h-full object-cover"
										/>
									</div>
									<div>
										<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
											{instructor.name}
										</h3>
										<div
											className="text-sm text-gray-600 dark:text-gray-300 mt-1"
											dangerouslySetInnerHTML={{ __html: instructor.description }}
										/>
									</div>
								</div>
							</div>
						))}
					</div>
				</section>
			)

		case 'testimonials':
			return (
				<section
					key={data.name}
					className="mb-12"
				>
					<h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{data.name}</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{(data.values as Testimonial[])?.map((testimonial: Testimonial, idx: number) => (
							<div
								key={idx}
								className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
							>
								<div className="flex flex-col items-center space-x-3 mb-4">
									<div className="w-12 h-12 rounded-full overflow-hidden">
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
						))}
					</div>
				</section>
			)

		case 'faq':
			return (
				<section
					key={data.name}
					className="mb-12"
				>
					<h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{data.name}</h2>
					<div className="space-y-4">
						<Accordions data={data.values as FAQ[]} />
					</div>
				</section>
			)

		default:
			return null
	}
}
