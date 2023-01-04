import type { PageServerLoad } from './$types'
import { filteredProductRequests, filters } from '$lib/stores'
import type { Filters } from '$lib/stores'

export const load = (({ fetch, url }) => {
	const fetchProductRequests = async () => {
		const category = url.searchParams.get('category')
		const status = url.searchParams.get('status')

		const res = await fetch(
			!category || category === 'all'
				? '/api/product-requests'
				: `/api/product-requests?filter=${category}`
		)
		const data = await res.json()

		return data.productRequests
	}

	return {
		productRequests: fetchProductRequests()
	}
}) satisfies PageServerLoad
