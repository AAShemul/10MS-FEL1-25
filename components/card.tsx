import type { ProductData } from '@/types/interface'
import Media from '@/components/media'
import Checklist from '@/components/checklist'

export default function Card({ lang, product }: { lang: string; product: ProductData }) {
	return (
		<>
			{/* Media Gallery */}
			<Media product={product} />

			{/* Price and Order */}
			<div className="lg:flex space-y-2 lg:space-y-0">
				<div className="w-full flex justify-center items-center">
					<span className="text-2xl font-bold text-gray-900 dark:text-gray-100">৳1000</span>
					<del className="ml-2 text-base font-normal md:text-xl text-gray-600 dark:text-gray-400">৳1500</del>
					<span className="m-0 w-auto bg-[#f97b53] rounded-l-3px rounded-r-4px rounded-b-4px rounded-t-3px border-l-1px border-[#f97b53] ml-4 relative text-white font-semibold text-3 py-1/2 px-1 rounded-sm">
						৳500 ছাড়
					</span>
				</div>
				<button className="w-full my-2 px-6 py-3 bg-green-700 text-white font-bold rounded-lg hover:bg-green-800 transition-colors">
					{lang === 'en' ? 'Enroll Now' : 'এনরোল করুন'}
				</button>
			</div>

			{/* Checklist */}
			<div className="overflow-y-auto">
				{product?.checklist?.length > 0 && (
					<div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
						{product.checklist.map(item => (
							<Checklist
								key={item.id}
								item={item}
							/>
						))}
					</div>
				)}
			</div>
		</>
	)
}
