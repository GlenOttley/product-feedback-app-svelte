// import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types'
import { filters } from '$lib/stores'
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
	}
}
