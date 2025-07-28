import type { JSX } from 'react'

/**
 * Error component.
 *
 * @returns { JSX.Element } The Error component.
 * @since 1.0.0
 */
export default function Error({ title, description }: { title: string; description: string }): JSX.Element {
	return (
		<div className="min-h-screen my-20 flex items-center justify-center bg-white dark:bg-gray-900">
			<div className="text-center">
				<h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{title}</h1>
				<p className="text-gray-600 dark:text-gray-400">{description}</p>
			</div>
		</div>
	)
}
