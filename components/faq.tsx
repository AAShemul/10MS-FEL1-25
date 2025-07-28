import type { JSX } from 'react'
import { Section, FAQ } from '@/types/interface'
import Accordions from '@/components/accordions'

export default function FAQComp({ data }: { data: Section }): JSX.Element {
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
}
