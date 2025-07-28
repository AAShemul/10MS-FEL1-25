import About from '@/components/about'
import Card from '@/components/card'
import FAQ from '@/components/faq'
import Features from '@/components/features'
import Pointers from '@/components/pointers'
import Testimonial from '@/components/testimonial'
import type { Product, ProductData, Section } from '@/types/interface'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { JSX } from 'react'
import { FaChevronRight } from 'react-icons/fa'
import Instructor from '../../../../components/instructor'

export const revalidate = 60 * 60 * 24
export const dynamicParams = true

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
		return data
	} catch (error) {
		console.error('Error fetching product:', error)
		return null
	}
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ lang: string; slug: string }>
}): Promise<Metadata> {
	const { lang, slug } = await params
	const product: ProductData | null = await fetchProduct(lang, slug)

	return {
		title: product?.seo?.title,
		description: product?.seo?.description,
		keywords: product?.seo?.keywords,
		openGraph: {
			locale: lang === 'en' ? 'en_US' : 'bn_BD',
			url: `${process.env.NEXT_PUBLIC_API_URL}/${lang}/product/${slug}`,
			title: product?.title,
			description: product?.description,
			images: [
				{
					url: product?.media?.[0]?.resource_value || '',
					width: 1200,
					height: 628,
					alt: product?.title,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: product?.title,
			description: product?.description,
			images: [
				{
					url: product?.media?.[0]?.resource_value || '',
					width: 1200,
					height: 628,
					alt: product?.title,
				},
			],
		},
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

/**
 * Product page component for 10 Minute School.
 *
 * @param { Promise<{ lang: string, slug: string }> } params The parameters for the product page.
 * @returns { JSX.Element } The Page component.
 * @since 1.0.0
 */
export default async function ProductPage({
	params,
}: {
	params: Promise<{ lang: string; slug: string }>
}): Promise<JSX.Element> {
	const { lang, slug } = await params
	const product: ProductData | null = await fetchProduct(lang, slug)

	if (!product) notFound()

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
						<div className="block lg:hidden">
							<Card
								lang={lang}
								product={product}
							/>
						</div>
					</div>

					{/* Instructor Sections */}
					<Instructor
						data={product.sections?.find((section: Section) => section.type === 'instructors') as Section}
					/>

					{/* Instructor Sections */}
					<Testimonial
						data={product.sections?.find((section: Section) => section.type === 'testimonials') as Section}
					/>
				</div>
				<div className="hidden lg:block">
					<Card
						lang={lang}
						product={product}
					/>
				</div>
			</div>
			<div className="lg:grid lg:grid-cols-2 lg:gap-8">
				{/* Features Sections */}
				<Features data={product.sections?.find((section: Section) => section.type === 'features') as Section} />

				{/* Pointers Sections */}
				<Pointers data={product.sections?.find((section: Section) => section.type === 'pointers') as Section} />

				{/* About Sections */}
				<About data={product.sections?.find((section: Section) => section.type === 'about') as Section} />

				{/* FAQ Sections */}
				<FAQ data={product.sections?.find((section: Section) => section.type === 'faq') as Section} />
			</div>

			{/* CTA Section */}
			<section className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg border-t border-gray-200 dark:border-gray-700">
				<div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
					<div className="mb-4 md:mb-0">
						<p className="text-gray-500 dark:text-gray-400 text-sm">
							{lang === 'en' ? 'Total Enrolled' : 'মোট এনরোল করা হয়েছে'}
						</p>
						<p className="text-lg font-semibold text-gray-900 dark:text-white">
							{lang === 'en'
								? product.checklist?.find(item => item.text.includes('Enrolled'))?.text || 'Enrolled'
								: product.checklist?.find(item => item.text.includes('কোর্সটি করছেন'))?.text ||
								  'এনরোল করুন'}
						</p>
					</div>
					<div className="flex space-x-4">
						<button className="px-6 py-3 bg-green-700 text-white font-bold rounded-lg hover:bg-green-800 transition-colors">
							{lang === 'en' ? 'Enroll Now' : 'এনরোল করুন'}
						</button>
					</div>
				</div>
			</section>
		</main>
	)
}

