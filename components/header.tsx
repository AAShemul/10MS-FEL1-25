'use client'

import type { JSX } from 'react'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaChevronDown } from 'react-icons/fa'
import { usePathname } from 'next/navigation'

export default function Header(): JSX.Element {
	const [darkMode, setDarkMode] = useState(false)
	const path = usePathname()
	const toggleDarkMode = () => {
		const newDarkMode = !darkMode
		setDarkMode(newDarkMode)
		localStorage.setItem('darkMode', String(newDarkMode))
		document.getElementsByTagName('html')[0].classList.toggle('dark', newDarkMode)
	}
	const menu = [
		{
			title: 'Home',
			path: '/',
			submenu: false,
		},
		{
			title: 'Courses',
			path: 'en/product',
			submenu: true,
			submenuItems: [
				{
					title: 'IELTS',
					path: '/en/product/ielts-course',
				},
				{
					title: 'TOEFL',
					path: '/en/product/toefl-course',
				},
			],
		},
		{
			title: 'About Us',
			path: '#',
			submenu: false,
		},
		{
			title: 'Contact Us',
			path: '#',
			submenu: false,
		},
	]

	return (
		<header className="bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-800 fixed top-0 left-0 right-0 z-50">
			<div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
				<Image
					src="/images/10mslogo.svg"
					alt="10 Minute School Logo"
					width={100}
					height={100}
				/>
				<h1 className="text-2xl font-bold hidden">10 Minute School</h1>
				<nav className="flex space-x-4">
					{menu.map((item, index) => {
						if (item.submenu) {
							return (
								<div key={index} className="relative group">
									<Link
										key={index}
										href={item.path}
										className={`hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-2 ${path === item.path ? 'text-primary-600 dark:text-primary-400' : ''}`}
									>
										{item.title}
										<FaChevronDown className="inline" />
									</Link>
									<div className="absolute space-x-4 hidden group-hover:block bg-white dark:bg-gray-800 shadow-lg p-4">
										{item.submenuItems?.map((submenuItem, subIndex) => (
											<Link
												key={subIndex}
												href={submenuItem.path}
												className="block hover:text-primary-600 dark:hover:text-primary-400"
											>
												{submenuItem.title}
											</Link>
										))}
									</div>
								</div>
							)
						} else {
							return (
								<Link
									key={index}
									href={item.path}
									className={`hover:text-primary-600 dark:hover:text-primary-400 ${path === item.path ? 'text-primary-600 dark:text-primary-400' : ''}`}
								>
									{item.title}
								</Link>
							)
						}
					})}
				</nav>
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
