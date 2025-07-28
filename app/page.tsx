import ProductCard from '@/components/productCard'
import type { Product } from '@/types/interface'
import type { JSX } from 'react'

async function fetchProducts(): Promise<Product[] | null> {
	const extra: Product = {
		title: 'IELTS Course by Munzereen Shahid',
		id: '153',
		slug: 'ielts-course',
		order_idx: 0,
		modality: 'recorded',
		media: [
			{
				name: 'preview_gallery',
				resource_type: 'video',
				resource_value: 'zrlYnaZftEQ',
				thumbnail_url: 'https://cdn.10minuteschool.com/images/thumbnails/IELTS_new_16_9.png',
			},
			{
				name: 'sqr_img',
				resource_type: 'image',
				resource_value: 'https://cdn.10minuteschool.com/images/thumbnails/IELTS_new_1_1.png',
			},
			{
				name: 'thumbnail',
				resource_type: 'image',
				resource_value: 'https://cdn.10minuteschool.com/images/thumbnails/IELTS_new_16_9.png',
			},
		],
		price_type: 'free',
		is_enrolled: false,
		price_details: {
			min_price: 0,
			min_final_price: 0,
			max_price: 0,
			max_final_price: 0,
			text: "<span><font color='#1CAB55'><b>Free</b></span>",
		},
		instructor_text: '',
		checklist: [],
	}
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/products`, {
			method: 'GET',
			headers: {
				accept: 'application/json',
				'Content-Type': 'application/json',
				'X-TENMS-SOURCE-PLATFORM': 'web',
			},
		})
		const data = (await response.json()).data.products
		return [extra, ...data]
	} catch (error) {
		console.error('Error fetching product:', error)
		return null
	}
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
					<h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Products</h1>
					<p className="text-gray-600 dark:text-gray-400">Sorry, no products found.</p>
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

