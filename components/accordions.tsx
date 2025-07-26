'use client'

import type { JSX } from 'react'
import { useState } from 'react'
import { FaChevronRight, FaChevronUp } from 'react-icons/fa'

export default function Accordions({data}: {data: {question: string; answer: string}[]}): JSX.Element {
	const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
	const toggleFaq = (index: number) => {
		setExpandedFaq(expandedFaq === index ? null : index)
	}

    return (
        <>
            {data?.map((faq, idx) => (
								<div
									key={idx}
									className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
								>
									<button
										className="w-full px-6 py-4 text-left flex justify-between items-center bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
										onClick={() => toggleFaq(idx)}
									>
										<span className="font-medium text-gray-900 dark:text-white">
											{faq.question}
										</span>
										{expandedFaq === idx ? <FaChevronUp /> : <FaChevronRight />}
									</button>
									{expandedFaq === idx && (
										<div
											className="px-6 pb-4 pt-2 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
											dangerouslySetInnerHTML={{ __html: faq.answer }}
										/>
									)}
								</div>
							))}
        </>
    )
}
