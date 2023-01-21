import type { Actions } from './$types'
import type { Sort } from '$lib/stores'
import { updateSort, updateFilters, upvoteRequest } from '$lib/actions'
import type { Category } from '$lib/types/ProductRequest'
import { redirect } from '@sveltejs/kit'

// export const csr = false

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
	upvoteRequest: async ({ request, url }) => {
		const redirectTo = url.searchParams.get('redirectTo')
		const data = await request.formData()
		upvoteRequest(data)
		if (redirectTo) {
			throw redirect(303, redirectTo)
		}
	}
}
