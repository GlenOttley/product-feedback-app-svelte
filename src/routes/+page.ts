import type { PageLoad } from './$types'
import { filteredProductRequests, filters } from '$lib/stores'
import type { Filters } from '$lib/stores'

export const load = (({ fetch, url }) => {
	// const fetchProductRequests = async () => {
	// 	const category = url.searchParams.get('category')
	// 	const status = url.searchParams.get('status')

	// 	const res = await fetch(
	// 		!category || category === 'all'
	// 			? '/api/product-requests'
	// 			: `/api/product-requests?filter=${category}`
	// 	)
	// 	const data = await res.json()

	// 	filters.update((currentFilters) => {
	// 		const updatedFilters = {} as Filters
	// 		category
	// 			? (updatedFilters.category = category)
	// 			: (updatedFilters.category = currentFilters.category)
	// 		status ? (updatedFilters.status = '') : (updatedFilters.status = currentFilters.status)
	// 		return updatedFilters
	// 	})

	// 	return data
	// }

	return {
		productRequests: filteredProductRequests.subscribe((current) => current)
	}
}) satisfies PageLoad
