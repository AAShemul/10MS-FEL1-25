import type { Sitemap } from '@/types/interface'


export const pages: Sitemap[] = [
	{
		title: '10 Minute School',
		link: '/',
		priority: 1,
		frequency: 'weekly'
	},
	{
		title: 'IELTS Course',
		link: '/en/product/ielts-course',
		priority: 0.9,
		frequency: 'weekly'
	},
	{
		title: 'IELTS Course',
		link: '/bn/product/ielts-course',
		priority: 0.9,
		frequency: 'weekly'
	},
]
