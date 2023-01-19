import type { PageLoad } from './$types'
import { productRequests } from '$lib/stores'
import { currentUser } from '$lib/stores'
import { get } from 'svelte/store'
import { redirect } from '@sveltejs/kit'

export const load: PageLoad = ({ params }) => {
	const productRequest = get(productRequests).find((request) => request.id === params.id)
	if (productRequest?.user?.username !== get(currentUser).username) {
		throw redirect(303, `/product-request/${params.id}`)
	}
}
