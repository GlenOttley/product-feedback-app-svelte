import type { Actions } from './$types'
import { productRequests } from '$lib/stores'
import type Reply from '$types/Reply'
import { v4 as uuidv4 } from 'uuid'

// export const csr = false

export const actions: Actions = {
	postReply: async ({ request }) => {
		const data = await request.formData()
		const productRequestId = data.get('productRequestId')
		const commentId = data.get('commentId')
		const replyingTo = data.get('replyingTo')
		const content = data.get('content')

		const newReply = {
			id: uuidv4(),
			content,
			replyingTo,
			user: {
				image: '/user-images/image-john.jpg',
				name: 'John Doe',
				username: 'john.doe'
			}
		} as Reply

		productRequests.update((current) => {
			const requestIndex = current.findIndex(
				(productRequest) => productRequest.id === productRequestId
			)
			const commentIndex = current[requestIndex].comments.findIndex(
				(comment) => comment.id === commentId
			)
			if (current[requestIndex].comments[commentIndex].replies) {
				current[requestIndex].comments[commentIndex].replies?.push(newReply)
			} else {
				current[requestIndex].comments[commentIndex].replies = [newReply]
			}
			return current
		})
	}
}
