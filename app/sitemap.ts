import config from '@/config'
import { pages } from '@/data/sitemap'
import type { MetadataRoute } from 'next'
import type { Sitemap } from '@/types/interface'


/**
 * Sitemap function for SEO.
 *
 * @returns { MetadataRoute.Sitemap } The Sitemap Metadata Route.
 * @since 1.0.0
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	return [
		...pages.map((page: Sitemap) => ({
			url: `${ config.info.site }${ page.link }`,
			lastModified: '2025-06-08T06:30:44.060Z',
			changeFrequency: page.frequency,
			priority: page.priority,
		})),
	]
}
