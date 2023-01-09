import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'
import { productRequests } from '$lib/stores'

export const load = (({ params }) => {
	let productRequest
	productRequests.subscribe((value) => {
		productRequest = value.find((request) => request.id === params.id)
	})
	if (productRequest) {
		return productRequest
	} else {
		throw error(404, 'Not found')
	}
}) satisfies PageLoad
