import type { Actions } from './$types'
import { addReply } from '$lib/actions'

// export const csr = false

export const actions: Actions = {
	addReply: async ({ request }) => {
		const data = await request.formData()
		addReply(data)
	}
}
