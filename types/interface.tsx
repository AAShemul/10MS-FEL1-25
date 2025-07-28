export interface Product {
	id: string
	title: string
	slug: string
	order_idx: number
	modality: string
	media: Media[] | null
	price_type: string
	is_enrolled: boolean
	price_details: {
		min_price: number
		min_final_price: number
		max_price: number
		max_final_price: number
		text: string
	}
	instructor_text: string
	checklist: string[]
}

export interface ProductData {
	slug: string
	id: number
	title: string
	description: string
	platform: string
	type: string
	modality: string
	old_info: {
		cat_id: number
		course_id: number
		platform: string
		skills_cat_id: number
		slug: string
	}
	start_at: string
	media: Media[]
	checklist: {
		color: string
		icon: string
		id: string
		list_page_visibility: boolean
		text: string
	}[]
	seo: SEO
	cta_text: {
		name: string
		value: string
	}
	sections: Section[]
	is_cohort_based_course: boolean
	secondary_cta_group: unknown[]
	delivery_method: string
}

export interface Media {
	name: string
	resource_type: 'image' | 'video'
	resource_value: string
	thumbnail_url?: string
}

export interface SEO {
	defaultMeta: {
		content: string
		type: string
		value: string
	}[]
	description: string
	keywords: string[]
	schema: {
		meta_name: string
		meta_value: string
		type: string
	}[]
	title: string
}

export interface Section {
	type: string
	name: string
	description: string
	bg_color: string
	order_idx: number
	values: (
		| Bundle
		| Offer
		| Instructor
		| Feature
		| GroupJoin
		| Pointer
		| ContentPreview
		| About
		| FeatureExplaination
		| FreeItem
		| Certificate
		| BundleCertificate
		| Testimonial
		| Requirement
		| Pay
		| FAQ
	)[]
}

export interface Bundle {
	[unknown: string]: unknown
}

export interface Offer {
	background_color: string
	background_img: string
	checklist_text_color: string
	end_at: string
	id: string
	start_at: string
	template: string
	text: string
}

export interface Instructor {
	name: string
	description: string
	image: string
	has_instructor_page: boolean
	slug: string
}

export interface Feature {
	icon: string
	id: string
	subtitle: string
	title: string
}

export interface GroupJoin {
	background: {
		image: string
		primary_color: string
		secondary_color: string
	}
	cta: {
		clicked_url: string
		color: string
		text: string
	}
	description: string
	description_color: string
	id: string
	thumbnail: string
	title: string
	title_color: string
	top_left_icon_img: string
}

export interface Pointer {
	color: string
	icon: string
	id: string
	text: string
}

export interface ContentPreview {
	[unknown: string]: unknown
}

export interface About {
	description: string
	icon: string
	id: string
	title: string
}

export interface FeatureExplaination {
	checklist: string[]
	file_type: string
	file_url: string
	id: string
	title: string
	video_thumbnail: string
}

export interface FreeItem {
	[unknown: string]: unknown
}

export interface Certificate {
	[unknown: string]: unknown
}

export interface BundleCertificate {
	[unknown: string]: unknown
}

export interface Testimonial {
	id: string
	name: string
	description: string
	profile_image: string
	testimonial: string
	thumb: string
	video_type: string
	video_url: string
}

export interface Requirement {
	[unknown: string]: unknown
}

export interface Pay {
	[unknown: string]: unknown
}

export interface FAQ {
	id: string
	question: string
	answer: string
}

export interface Sitemap {
	title: string
	link: string
	priority?: number
	frequency?: 'weekly' | 'monthly' | 'yearly' | 'always' | 'hourly' | 'daily' | 'never'
}

export interface Menu {
	title: string
	path: string
	submenu: boolean
	submenuItems?: {
		title: string
		path: string
	}[]
}
