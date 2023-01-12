import type { Actions } from './$types'
import { postReply } from '$lib/actions'

// export const csr = false

export const actions: Actions = {
	postReply: async ({ request }) => {
		const data = await request.formData()
		postReply(data)
	}
}
