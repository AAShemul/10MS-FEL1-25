import Image from 'next/image'
import Link from 'next/link'
import type { JSX } from 'react'

export default function ProductCard({
	title,
	slug,
	media,
	price_details,
}: {
	title: string
	slug: string
	media: {
		name: string
		resource_type: string
		resource_value: string
	}[]
	price_details: {
		min_price: number
		min_final_price: number
		max_price: number
		max_final_price: number
		text: string
	}
}): JSX.Element {
	return (
		<Link href={`/en/product/${slug}`}>
			<div className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
				<Image
					src={
						media?.[1]?.resource_value || 'https://dummyimage.com/500x500/000/fff.jpg&text=10+Minute+School'
					}
					alt={title}
					width={500}
					height={500}
					className="w-100 h-100 object-cover"
				/>
				<h2>{title}</h2>
				<div>
					<p>{price_details?.text}</p>
				</div>
			</div>
		</Link>
	)
}
