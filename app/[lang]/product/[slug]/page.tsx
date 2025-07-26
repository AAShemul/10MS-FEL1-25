import Checklist from '@/components/checklist'
import RenderMedia from '@/components/renderMedia'
import SectionComp from '@/components/section'
import type { Product, ProductData, Section } from '@/types/interface'
import type { Metadata } from 'next'
import type { JSX } from 'react'
import { FaChevronRight } from 'react-icons/fa'

async function fetchProduct(lang: string, slug: string): Promise<ProductData | null> {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/${slug}?lang=${lang}`, {
			method: 'GET',
			headers: {
				accept: 'application/json',
				'Content-Type': 'application/json',
				'X-TENMS-SOURCE-PLATFORM': 'web',
			},
		})
		const data = (await response.json()).data
		console.log(data)
		return data
	} catch (error) {
		console.error('Error fetching product:', error)
		return null
	}
}

export async function generateMetadata({ params }: { params: { lang: string; slug: string } }): Promise<Metadata> {
	const { lang, slug } = params
	const product: ProductData | null = await fetchProduct(lang, slug)

	return {
		title: product?.title,
		description: product?.description,
	}
}

export async function generateStaticParams() {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/products`, {
		method: 'GET',
		headers: {
			accept: 'application/json',
			'Content-Type': 'application/json',
			'X-TENMS-SOURCE-PLATFORM': 'web',
		},
	})
	const data = (await response.json()).data
	return data.products.map((product: Product) => ({ slug: product.slug }))
}

export default async function ProductPage({
	params,
}: {
	params: { lang: string; slug: string }
}): Promise<JSX.Element> {
	const { lang, slug } = params
	const product: ProductData | null = await fetchProduct(lang, slug)

	if (!product) {
		return (
			<div className="min-h-screen my-20 flex items-center justify-center bg-white dark:bg-gray-900">
				<div className="text-center">
					<h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Product Not Found</h1>
					<p className="text-gray-600 dark:text-gray-400">The requested product could not be loaded.</p>
				</div>
			</div>
		)
	}

	return (
		<main className="max-w-7xl min-h-screen mx-auto my-20 px-4 py-8">
			<div className="lg:grid lg:grid-cols-2 lg:gap-8">
				<div>
					<nav className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
						<a
							href="#"
							className="hover:text-primary-600 dark:hover:text-primary-400"
						>
							Home
						</a>
						<FaChevronRight className="mx-2 text-xs" />
						<a
							href="#"
							className="hover:text-primary-600 dark:hover:text-primary-400"
						>
							Courses
						</a>
						<FaChevronRight className="mx-2 text-xs" />
						<span className="text-gray-700 dark:text-gray-300">{product.title}</span>
					</nav>

					{/* Product Header */}
					<div className="mb-8">
						<h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white">
							{product.title}
						</h1>
						<div
							className="prose dark:prose-invert max-w-none mt-4 text-gray-700 dark:text-gray-300"
							dangerouslySetInnerHTML={{ __html: product.description }}
						/>
					</div>

					{/* Dynamic Sections */}
					{product.sections?.map((section: Section, id: number) => (
						<SectionComp
							key={id}
							data={section}
						/>
					))}
				</div>
				<div>
					{/* Media Gallery */}
					<RenderMedia product={product} />

					{/* Checklist */}
					{product?.checklist?.length > 0 && (
						<div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
							{product.checklist.map((item, index) => (
								<Checklist
									key={index}
									item={item}
								/>
							))}
						</div>
					)}
				</div>
			</div>
			{/* CTA Section */}
			<section className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg border-t border-gray-200 dark:border-gray-700">
				<div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
					<div className="mb-4 md:mb-0">
						<p className="text-gray-500 dark:text-gray-400 text-sm">Total Enrolled</p>
						<p className="text-lg font-semibold text-gray-900 dark:text-white">
							{product.checklist?.find(item => item.text.includes('Enrolled'))?.text || 'Join Now'}
						</p>
					</div>
					<div className="flex space-x-4">
						<button className="px-6 py-3 border border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400 font-medium rounded-lg hover:bg-primary-50 dark:hover:bg-gray-700 transition-colors">
							Add to Cart
						</button>
						<button className="px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors">
							Enroll Now
						</button>
					</div>
				</div>
			</section>
		</main>
	)
}