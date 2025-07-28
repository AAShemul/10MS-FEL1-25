import Error from '@/components/error'
import type { Metadata } from 'next'
import type { JSX } from 'react'

/**
 * Metadata for the 404 Error page.
 *
 * @since 1.0.0
 */
const title: string = '404 Error'
const description: string = 'The page you requested was not found. Please check the URL and try again.'
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
 * The 404 Error page component.
 *
 * @returns { JSX.Element } The 404 Error component.
 * @since 1.0.0
 */
export default function E404(): JSX.Element {
	return (
		<Error
			title={title}
			description={description}
		/>
	)
}
