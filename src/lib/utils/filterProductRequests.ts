import type { Filters } from '$lib/stores'
import type ProductRequest from '$lib/types/ProductRequest'
import getCommentsLength from './getCommentsLength'

function compareUpvotes(a: ProductRequest, b: ProductRequest) {
	return b.upvotes - a.upvotes
}

function compareComments(a: ProductRequest, b: ProductRequest) {
	return getCommentsLength(b.comments) - getCommentsLength(a.comments)
}

export const filterProductRequests = (productRequests: ProductRequest[], filters: Filters) => {
	const filtered = productRequests
		.filter((request) => (filters.status ? request.status.includes(filters.status) : request))
		.filter((request) =>
			filters.category && filters.category !== 'all'
				? request.category.includes(filters.category)
				: request
		)
	let sorted: ProductRequest[]
	switch (filters.sort) {
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
