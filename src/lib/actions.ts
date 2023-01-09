import type { SubmitFunction } from '$app/forms'
import { v4 as uuidv4 } from 'uuid'
import type Reply from '$types/Reply'
import { productRequests } from '$lib/stores'

export const postReply: SubmitFunction = ({ data }) => {
	const commentId = data.get('commentId')
	const productRequestId = data.get('productRequestId')
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
