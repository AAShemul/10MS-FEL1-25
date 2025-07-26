import Image from 'next/image'
import Link from 'next/link'
import type { JSX } from 'react'
import type { Product } from '@/types/interface'

const products: Product[] = [
	{
		title: "Kids' English",
		id: '10740',
		slug: 'kids-english-programme',
		order_idx: 0,
		modality: 'recorded',
		media: [
			{
				name: 'thumbnail',
				resource_type: 'image',
				resource_value: 'https://cdn.10minuteschool.com/images/thumbnails/kids-english-course-thumbnail.png',
			},
			{
				name: 'sqr_img',
				resource_type: 'image',
				resource_value: 'https://cdn.10minuteschool.com/images/thumbnails/kids-english-sqr-thumbnail-new.png',
			},
			{
				name: 'preview_gallery',
				resource_type: 'image',
				resource_value: 'https://cdn.10minuteschool.com/images/thumbnails/kids-english-course-thumbnail.png',
			},
		],
		price_type: 'free',
		is_enrolled: false,
		price_details: {
			min_price: 0,
			min_final_price: 0,
			max_price: 0,
			max_final_price: 0,
			text: 'Call for Booking',
		},
		instructor_text: '',
		checklist: [],
	},
	{
		title: '[Paid] HSC 26 অনলাইন ব্যাচ (বাংলা, ইংরেজি, তথ্য ও যোগাযোগ প্রযুক্তি) - Lecture Sheet',
		id: '10708',
		slug: 'hsc-26-online-batch-bangla-english-ict-lecture-sheet',
		order_idx: 0,
		modality: 'book',
		media: null,
		price_type: 'paid',
		is_enrolled: false,
		price_details: {
			min_price: 1500,
			min_final_price: 1500,
			max_price: 1500,
			max_final_price: 1500,
			text: '৳ 1500',
		},
		instructor_text: '',
		checklist: [],
	},
	{
		title: '[Paid] HSC 26 অনলাইন ব্যাচ (ফিজিক্স, কেমিস্ট্রি, ম্যাথ, বায়োলজি) - Lecture Sheet',
		id: '10707',
		slug: 'hsc-2026-online-batch-lecture-sheet',
		order_idx: 0,
		modality: 'book',
		media: null,
		price_type: 'paid',
		is_enrolled: false,
		price_details: {
			min_price: 4800,
			min_final_price: 4800,
			max_price: 4800,
			max_final_price: 4800,
			text: '৳ 4800',
		},
		instructor_text: '',
		checklist: [],
	},
	{
		title: 'Spoken English Junior Practice Resource (Advance)',
		id: '10674',
		slug: 'spoken-english-junior-online-resource-advance',
		order_idx: 0,
		modality: 'recorded',
		media: [
			{
				name: 'thumbnail',
				resource_type: 'image',
				resource_value: 'https://cdn.10minuteschool.com/images/thumbnails/spoken-english-junior-thumbnail.png',
			},
			{
				name: 'sqr_img',
				resource_type: 'image',
				resource_value:
					'https://cdn.10minuteschool.com/images/thumbnails/spoken-english-junior-sqr-thumbnail.png',
			},
			{
				name: 'preview_gallery',
				resource_type: 'image',
				resource_value: 'https://cdn.10minuteschool.com/images/thumbnails/spoken-english-junior-thumbnail.png',
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
	},
]

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
		console.log(data)
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
