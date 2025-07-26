import config from '@/config'
import type { Metadata } from 'next'

/**
 * SEO metadata configuration.
 *
 * @constant { Metadata } metadata Holds the SEO metadata details
 * @since 1.0.0
 */
export const metadata: Metadata = {
	title: {
		default: `Welcome to ${config.seo.title}`,
		template: `%s | ${config.seo.title}`,
	},
	description: config.seo.description,
	keywords: config.seo.keywords,
	generator: 'S Technologies',
	applicationName: 'STech UI',
	authors: [
		{
			name: 'Md. Ashraful Alam Shemul',
			url: 'https://github.com/AAShemul',
		},
		{
			name: 'S Technologies',
			url: 'https://www.stechbd.net',
		},
	],
	creator: 'Md. Ashraful Alam Shemul',
	publisher: 'S Technologies',
	robots: 'index, follow',
	category: 'Technology',
	metadataBase: new URL(config.info.site),
	alternates: {
		canonical: '/',
		languages: {
			'en-US': '/',
		},
	},
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: config.info.site,
		siteName: config.info.title,
		title: {
			default: `Welcome to ${config.seo.title}`,
			template: `%s | ${config.seo.title}`,
		},
		description: config.seo.description,
		images: [
			{
				url: '/image/Banner.webp',
				width: 1200,
				height: 628,
				alt: config.seo.title,
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		site: '@STechBD_Net',
		creator: '@STechBD_Net',
		title: {
			default: `Welcome to ${config.seo.title}`,
			template: `%s | ${config.seo.title}`,
		},
		description: config.seo.description,
		images: [
			{
				url: '/image/Banner.webp',
				width: 1200,
				height: 628,
				alt: config.seo.title,
			},
		],
	},
	icons: {
		icon: [
			{
				url: '/icon/favicon-16x16.png',
				sizes: '16x16',
			},
			{
				url: '/icon/favicon-32x32.png',
				sizes: '32x32',
			},
			{
				url: '/icon/favicon-96x96.png',
				sizes: '96x96',
			},
		],
		apple: [
			{
				url: '/icon/apple-icon.png',
				sizes: '192x192',
			},
			{
				url: '/icon/apple-icon-57x57.png',
				sizes: '57x57',
			},
			{
				url: '/icon/apple-icon-60x60.png',
				sizes: '60x60',
			},
			{
				url: '/icon/apple-icon-72x72.png',
				sizes: '72x72',
			},
			{
				url: '/icon/apple-icon-76x76.png',
				sizes: '76x76',
			},
			{
				url: '/icon/apple-icon-114x114.png',
				sizes: '114x114',
			},
			{
				url: '/icon/apple-icon-120x120.png',
				sizes: '120x120',
			},
			{
				url: '/icon/apple-icon-144x144.png',
				sizes: '144x144',
			},
			{
				url: '/icon/apple-icon-152x152.png',
				sizes: '152x152',
			},
			{
				url: '/icon/apple-icon-180x180.png',
				sizes: '180x180',
			},
		],
		other: [
			{
				rel: 'apple-icon-precomposed',
				url: '/icon/apple-icon-precomposed.png',
				sizes: '192x192',
			},
			{
				rel: 'android-icon',
				url: '/icon/android-icon-36x36.png',
				sizes: '36x36',
			},
			{
				rel: 'android-icon',
				url: '/icon/android-icon-48x48.png',
				sizes: '48x48',
			},
			{
				rel: 'android-icon',
				url: '/icon/android-icon-72x72.png',
				sizes: '72x72',
			},
			{
				rel: 'android-icon',
				url: '/icon/android-icon-96x96.png',
				sizes: '96x96',
			},
			{
				rel: 'android-icon',
				url: '/icon/android-icon-144x144.png',
				sizes: '144x144',
			},
			{
				rel: 'android-icon',
				url: '/icon/android-icon-192x192.png',
				sizes: '192x192',
			},
			{
				rel: 'ms-icon',
				url: '/icon/ms-icon-70x70.png',
				sizes: '70x70',
			},
			{
				rel: 'ms-icon',
				url: '/icon/ms-icon-144x144.png',
				sizes: '144x144',
			},
			{
				rel: 'ms-icon',
				url: '/icon/ms-icon-150x150.png',
				sizes: '150x150',
			},
			{
				rel: 'ms-icon',
				url: '/icon/ms-icon-310x310.png',
				sizes: '310x310',
			},
		],
	},
}

export default metadata
