import type { JSX } from 'react'
import { About, Section } from '@/types/interface'

export default function AboutComp({ data }: { data: Section }): JSX.Element {
	return (
		<section className="mb-12">
			<div
				className="text-2xl font-bold mb-6 text-gray-900 dark:text-white"
				dangerouslySetInnerHTML={{ __html: data.name }}
			/>
			<div className="space-y-6">
				{(data.values as About[])?.map((about: About, idx: number) => (
					<div
						key={idx}
						className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
					>
						<div className="flex flex-col md:flex-row items-start md:items-center gap-4">
							{about.icon && (
								<div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300">
									<i className={`${about.icon} text-xl`} />
								</div>
							)}
							<div>
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
									{about.title}
								</h3>
								<div
									className="prose dark:prose-invert max-w-none"
									dangerouslySetInnerHTML={{ __html: about.description }}
								/>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	)
}

