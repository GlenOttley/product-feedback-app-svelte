import type { Actions } from './$types'
import { addComment, addReply } from '$lib/actions'

// export const csr = false

export const actions: Actions = {
	addComment: async ({ request }) => {
		const data = await request.formData()
		addComment(data)
	},
	addReply: async ({ request }) => {
		const data = await request.formData()
		addReply(data)
	}
}
