import type { Actions } from './$types'
import type { Sort } from '$lib/stores'
import { updateSort, updateFilters, upvoteRequest } from '$lib/actions'
import type { Category } from '$lib/types/ProductRequest'

// export const csr = false
// export const ssr = false

export const actions: Actions = {
	updateFilters: async ({ url }) => {
		const category = url.searchParams.get('category') as Category
		updateFilters(category)
	},
	updateSort: async ({ request }) => {
		const data = await request.formData()
		const sort = data.get('sort') as Sort

		if (sort) {
			updateSort(sort)
		}
	},
	upvoteRequest: async ({ url }) => {
		const requestId = url.searchParams.get('id')

		if (requestId) {
			upvoteRequest(requestId)
		}
	}
}
