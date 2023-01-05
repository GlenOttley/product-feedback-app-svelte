import type ProductRequest from '$types/ProductRequest'
import type { Category } from '$types/ProductRequest'
import type { Status } from '$types/ProductRequest'
import { derived, writable } from 'svelte/store'
import data from '$lib/data.json'

export interface Filters {
	category?: Category | ''
	status?: Status | ''
}

export const productRequests = writable<ProductRequest[]>(data.productRequests as ProductRequest[])

export const filters = writable<Filters>({
	category: 'all',
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
