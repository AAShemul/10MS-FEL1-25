'use client'

import { Menu } from '@/types/interface'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { JSX } from 'react'
import { useEffect, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'

export default function Header(): JSX.Element {
	const path: string = usePathname()
	const [darkMode, setDarkMode] = useState<boolean>(false)
	const [showMenu, setShowMenu] = useState<boolean>(false)
	const [lang, setLang] = useState<string>('bn')
	const [mobileStates, setMobileStates] = useState<Record<string, boolean>>({})

	const toggleMobileMenu = (key: string): void => {
		setMobileStates(prev => {
			const newState = { ...prev }
			newState[key] = !newState[key]
			Object.keys(newState).forEach(k => {
				if (k !== key) newState[k] = false
			})
			return newState
		})
	}

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

	useEffect(() => {
		setLang(path.startsWith('/en') ? 'en' : 'bn')
	}, [path])

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
				<nav className="hidden lg:flex space-x-4">
					{menu.map((item, index) => {
						if (item.submenu) {
							return (
								<div
									key={index}
									className="relative group"
								>
									<Link
										key={index}
										href={item.path}
										className={`font-semibold  hover:text-green-600 dark:hover:text-green-400 flex items-center gap-2 ${
											path === item.path ? 'text-green-600 dark:text-green-400' : ''
										}`}
									>
										{item.title}
										<FaChevronDown className="inline" />
									</Link>
									<div className="absolute space-x-4 hidden group-hover:block bg-white dark:bg-gray-800 shadow-lg p-4">
										{item.submenuItems?.map((submenuItem, subIndex) => (
											<Link
												key={subIndex}
												href={submenuItem.path}
												className="block font-semibold  hover:text-green-600 dark:hover:text-green-400"
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
									className={`font-semibold  hover:text-green-600 dark:hover:text-green-400 ${
										path === item.path ? 'text-green-600 dark:text-green-400' : ''
									}`}
								>
									{item.title}
								</Link>
							)
						}
					})}
				</nav>
				<span className="flex justify-center gap-2">
					<Link
						href={lang === 'en' ? path.replace(/^\/en/, '/bn') : path.replace(/^\/bn/, '/en')}
						className="text-white font-semibold bg-green-700 hover:bg-green-800 rounded-md p-2"
						aria-label={lang === 'en' ? 'বাংলা' : 'English'}
					>
						{lang === 'en' ? 'বাংলা' : 'English'}
					</Link>
					<button
						onClick={toggleDarkMode}
						className="p-2 rounded-full bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors cursor-pointer"
						cursor-pointer
						aria-label="Toggle dark mode"
					>
						{darkMode ? '☀️' : '🌙'}
					</button>
					<div className="inline-flex lg:hidden">
						<button
							onClick={() => setShowMenu(!showMenu)}
							className="p-2.5 text-gray-900 dark:text-gray-100"
							aria-label="Toggle menu"
							aria-expanded={showMenu}
						>
							<svg
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
								/>
							</svg>
						</button>
					</div>
				</span>

				{/* Mobile Menu */}
				<div
					className={`${
						showMenu ? 'fixed' : 'hidden'
					} top-0 left-0 h-screen w-screen backdrop-blur bg-black bg-opacity-50 z-[101]`}
					onClick={(): void => setShowMenu(false)}
				/>
				<div
					className={`fixed inset-y-0 right-0 w-[85%] bg-white dark:bg-slate-900 px-6 pt-6 pb-20 z-[102] transition-all duration-500 transform ${
						showMenu ? 'translate-x-0' : 'translate-x-full'
					}`}
				>
					<div className="flex items-center justify-between">
						<Link
							className="flex items-center gap-5 -m-1.5 p-1.5"
							href="/"
						>
							<span className="sr-only">10 Minute School</span>
							<Image
								src="/images/10mslogo.svg"
								alt="10 Minute School Logo"
								width={100}
								height={100}
							/>
						</Link>
						<button
							onClick={(): void => setShowMenu(false)}
							className="-m-2.5 rounded-md p-2.5 text-gray-700"
						>
							<span className="sr-only">Close menu</span>
							<svg
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>
					<div className="mt-6">
						{menu.map(
							(main: Menu): JSX.Element => (
								<div
									key={main.title}
									className="py-2"
								>
									{main.submenu ? (
										<div>
											<button
												onClick={() => toggleMobileMenu(main.title)}
												className="flex w-full items-center justify-between text-base font-semibold text-gray-900 dark:text-gray-100 py-2"
											>
												{main.title}
												<FaChevronDown className="inline" />
											</button>
											<div
												className={`${
													mobileStates[main.title] ? 'block' : 'hidden'
												} mt-2 space-y-2 pl-4`}
											>
												{main.submenuItems?.map(
													(sub): JSX.Element => (
														<Link
															key={sub.path}
															href={sub.path}
															className="block text-sm text-gray-900 dark:text-gray-100"
														>
															{sub.title}
														</Link>
													),
												)}
											</div>
										</div>
									) : (
										<Link
											href={main.path!}
											className={`block text-base font-semibold ${
												path === main.path ? 'text-primary' : 'text-gray-900 dark:text-gray-100'
											}`}
										>
											{main.title}
										</Link>
									)}
								</div>
							),
						)}
					</div>
				</div>
			</div>
		</header>
	)
}
