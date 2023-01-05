import type { Actions } from './$types'
import { filters } from '$lib/stores'
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
	}
}
