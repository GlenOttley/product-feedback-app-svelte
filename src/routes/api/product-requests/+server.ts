import type { RequestHandler } from '../$types'
import data from '$lib/data.json'
import { json } from '@sveltejs/kit'
import type ProductRequest from '$types/ProductRequest'

export const GET = (async ({ url }) => {
	const filter = url.searchParams.get('filter')
	const productRequests = filter
		? (data.productRequests.filter(
				(productRequest) => productRequest.category === filter
		  ) as ProductRequest[])
		: (data.productRequests as ProductRequest[])
	return json(productRequests)
}) satisfies RequestHandler
