export interface Media {
	name: string
	resource_type: 'image' | 'video'
	resource_value: string
	thumbnail_url?: string
}

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
	media: Media[]
	checklist: Array<{
		text: string
		icon: string
	}>
	sections: Section[]
}

export interface Testimonial {
	name: string
	description: string
	rating: number
	comment: string
	profile_image: string
}

export interface Instructor {
	name: string
	description: string
	image: string
}

export interface FAQ {
	question: string
	answer: string
}

export interface Section {
	type: string
	name: string
	description: string
	values: (Testimonial | Instructor | FAQ)[]
}
