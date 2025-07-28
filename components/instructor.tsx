import type { JSX } from 'react'
import { Instructor, Section } from '@/types/interface'
import Image from 'next/image'

export default function InstructorComp({ data }: { data: Section }): JSX.Element {
	return (
		<section
			key={data.name}
			className="mb-12"
		>
			<h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{data.name}</h2>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{(data.values as Instructor[])?.map((instructor: Instructor, idx: number) => (
					<div
						key={idx}
						className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-2 lg:p-4"
					>
						<div className="flex flex-row lg:flex-col items-center space-x-4">
							<div className="h-15 w-15 lg:h-20 lg:w-20 rounded-full overflow-hidden">
								<Image
									src={instructor.image}
									alt={instructor.name}
									width={80}
									height={80}
									className="w-full h-full object-cover"
								/>
							</div>
							<div className="flex-1 lg:mt-4">
								<h3 className="text-center text-lg font-semibold text-gray-900 dark:text-white">
									{instructor.name}
								</h3>
								<div
									className="text-center text-sm text-gray-600 dark:text-gray-300 mt-1"
									dangerouslySetInnerHTML={{ __html: instructor.description }}
								/>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	)
}
