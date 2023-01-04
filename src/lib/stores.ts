import type ProductRequest from '$types/ProductRequest'
import type { Category } from '$types/ProductRequest'
import { derived, writable } from 'svelte/store'
import data from '$lib/data.json'

export interface Filters {
	category?: Category | 'all' | '' | null
	status?: string
}

export const productRequests = writable(data.productRequests)

export const filters = writable<Filters>({
	category: '',
	status: ''
})

export const filteredProductRequests = derived(
	[productRequests, filters],
	([$productRequests, $filters]) => {
		return Object.values($productRequests as ProductRequest[]).filter((request) =>
			$filters.category && $filters.category !== 'all'
				? request.category.includes($filters.category)
				: request
		)
	}
)
