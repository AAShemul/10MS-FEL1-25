import Image from 'next/image'
import type { JSX } from 'react'

export default function Checklist({ item }: { item: { icon: string; text: string } }): JSX.Element {
	return (
		<div className="flex items-center space-x-2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
			{item.icon && (
				<Image
					src={item.icon}
					alt=""
					width={24}
					height={24}
					className="w-6 h-6"
				/>
			)}
			<span className="text-sm text-gray-700 dark:text-gray-300">{item.text}</span>
		</div>
	)
}
