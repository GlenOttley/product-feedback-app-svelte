import type ProductRequest from '$types/ProductRequest'
import type { Category } from '$types/ProductRequest'
import type { Status } from '$types/ProductRequest'
import { derived, writable } from 'svelte/store'
import data from '$lib/data.json'
import { browser } from '$app/environment'

export type Sort = 'mostUpvotes' | 'leastUpvotes' | 'mostComments' | 'leastComments'

export interface Filters {
	category?: Category | ''
	status?: Status | ''
	sort: Sort
}

const localProductRequests = browser ? window.localStorage.getItem('productRequests') : null

// export const productRequests = writable<ProductRequest[]>(
// 	localProductRequests
// 		? (JSON.parse(localProductRequests) as ProductRequest[])
// 		: (data.productRequests as ProductRequest[])
// )

export const productRequests = writable<ProductRequest[]>(data.productRequests as ProductRequest[])

// productRequests.subscribe((value) => {
// 	if (browser) {
// 		window.localStorage.setItem('productRequests', JSON.stringify(value))
// 	}
// })

export const filters = writable<Filters>({
	category: 'all',
	status: '',
	sort: 'mostUpvotes'
})

function compareUpvotes(a: ProductRequest, b: ProductRequest) {
	return b.upvotes - a.upvotes
}

function compareComments(a: ProductRequest, b: ProductRequest) {
	return b.comments.length - a.comments.length
}

export const filteredProductRequests = derived(
	[productRequests, filters],
	([$productRequests, $filters]) => {
		const filtered = Object.values($productRequests).filter((request) =>
			$filters.category && $filters.category !== 'all'
				? request.category.includes($filters.category)
				: request
		)
		let sorted: ProductRequest[]
		switch ($filters.sort) {
			case 'mostUpvotes':
				sorted = filtered.sort(compareUpvotes)
				break
			case 'leastUpvotes':
				sorted = filtered.sort(compareUpvotes).reverse()
				break
			case 'mostComments':
				sorted = filtered.sort(compareComments)
				break
			case 'leastComments':
				sorted = filtered.sort(compareComments).reverse()
		}

		return sorted
	}
)
