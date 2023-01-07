import type { Actions } from './$types'
import { filters, productRequests } from '$lib/stores'
import type { Sort } from '$lib/stores'
import type { Category } from '$lib/types/ProductRequest'

// export const csr = false
// export const ssr = false

export const actions: Actions = {
	setFilters: async ({ url }) => {
		const category = url.searchParams.get('category')

		if (category) {
			filters.update((current) => {
				current.category = category as Category
				return current
			})
		}
	},
	setSort: async ({ request }) => {
		const data = await request.formData()
		const sort = data.get('sort')

		if (sort) {
			filters.update((current) => {
				current.sort = sort as Sort
				return current
			})
		}
	},
	upvote: async ({ url }) => {
		const requestId = Number(url.searchParams.get('id'))

		if (requestId) {
			productRequests.update((current) => {
				const requestIndex = current.findIndex((productRequest) => productRequest.id === requestId)
				if (current[requestIndex].upvoted) {
					current[requestIndex].upvotes -= 1
					current[requestIndex].upvoted = false
				} else {
					current[requestIndex].upvotes += 1
					current[requestIndex].upvoted = true
				}
				return current
			})
		}
	}
}
