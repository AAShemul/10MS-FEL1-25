import Image from 'next/image'
import Link from 'next/link'
import type { JSX } from 'react'
import type { Product } from '@/types/interface'

async function fetchProducts(): Promise<Product[] | null> {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/v1/products`,
			{
				method: 'GET',
				headers: {
					accept: 'application/json',
					'Content-Type': 'application/json',
					'X-TENMS-SOURCE-PLATFORM': 'web',
				},
			},
		)
		const data = (await response.json()).data.products
		return data
	} catch (error) {
		console.error('Error fetching product:', error)
		return null
	}
}

export function ProductCard({
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
}) {
	return (
		<Link href={`/product/${slug}`}>
			<div className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
				<Image
					src={media?.[1]?.resource_value || 'https://dummyimage.com/500x500/000/fff.jpg&text=10+Minute+School'}
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

/**
 * Homepage component for 10 Minute School.
 *
 * @returns { JSX.Element } The Page component.
 * @since 1.0.0
 */
export default async function Page(): Promise<JSX.Element> {
	const products: Product[] | null = await fetchProducts()

	if (!products) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
				<div className="text-center">
					<h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Product Not Found</h1>
					<p className="text-gray-600 dark:text-gray-400">The requested product could not be loaded.</p>
				</div>
			</div>
		)
	}

	return (
		<main className="my-20 p-10">
			<div className="lg:grid lg:grid-cols-4 gap-8">
				{products.map((product: Product) => (
					<ProductCard
						key={product.slug}
						title={product.title}
						slug={product.slug}
						media={product.media || []}
						price_details={product.price_details}
					/>
				))}
			</div>
		</main>
	)
}
