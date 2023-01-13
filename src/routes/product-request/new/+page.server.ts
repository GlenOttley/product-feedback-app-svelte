import type { Actions } from './$types'
import { addProductRequest } from '$lib/actions'
import { redirect } from '@sveltejs/kit'

export const csr = false

export const actions: Actions = {
	addProductRequest: async ({ request }) => {
		const data = await request.formData()
		addProductRequest(data)
		throw redirect(303, '/')
	}
}
