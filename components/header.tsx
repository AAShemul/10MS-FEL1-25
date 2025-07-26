'use client'

import type { JSX } from 'react'
import { useState } from 'react'

export default function Header(): JSX.Element {
	const [darkMode, setDarkMode] = useState(false)
	const toggleDarkMode = () => {
		const newDarkMode = !darkMode
		setDarkMode(newDarkMode)
		localStorage.setItem('darkMode', String(newDarkMode))
		document.getElementsByTagName('html')[0].classList.toggle('dark', newDarkMode)
	}

	return (
		<header className="bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-800 fixed top-0 left-0 right-0 z-50">
			<div className="container mx-auto px-4 py-4 flex justify-between items-center">
				<h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">10 Minute School</h1>
				<button
					onClick={toggleDarkMode}
					className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
					aria-label="Toggle dark mode"
				>
					{darkMode ? '☀️' : '🌙'}
				</button>
			</div>
		</header>
	)
}
