'use client'

import type { JSX } from 'react'
import type { Metadata } from 'next'
import Error from '@/components/error'

/**
 * The metadata for the General Error page.
 *
 * @constant { string } title The title of the page.
 * @constant { string } description The description of the page.
 * @constant { Metadata } metadata The exported metadata of the page.
 *
 * @since 1.0.0
 */
const title: string = 'Unknown Error'
const description: string = 'Something went wrong. Please check the URL and try refreshing the page.'
export const metadata: Metadata = {
	title,
	description,
	openGraph: {
		title,
		description,
	},
	twitter: {
		title,
		description,
	},
}

/**
 * The General Error page component.
 *
 * @returns { JSX.Element } The General Error component.
 * @since 1.0.0
 */
export default function EGeneral(): JSX.Element {
	return (
		<Error
			title={title}
			description={description}
		/>
	)
}
