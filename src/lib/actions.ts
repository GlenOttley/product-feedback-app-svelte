import { v4 as uuidv4 } from 'uuid'
import type Reply from '$types/Reply'
import type { Sort } from '$lib/stores'
import { productRequests, filters } from '$lib/stores'
import type { Category } from './types/ProductRequest'
import type ProductRequest from './types/ProductRequest'

export const addProductRequest = (data: FormData) => {
	const title = data.get('title')
	const category = data.get('category')
	const description = data.get('description')

	const newRequest = {
		id: uuidv4(),
		title,
		category,
		description,
		upvotes: 0,
		status: 'suggestion',
		comments: []
	} as ProductRequest

	productRequests.update((current) => {
		current.push(newRequest)
		console.log(current)
		return current
	})
}

export const updateSort = (sort: Sort) => {
	filters.update((current) => {
		current.sort = sort
		return current
	})
}

export const updateFilters = (category: Category) => {
	if (category) {
		filters.update((current) => {
			current.category = category
			return current
		})
	}
}

export const upvoteRequest = (requestId: string) => {
	if (requestId) {
		productRequests.update((current) => {
			const requestIndex = current.findIndex((productRequest) => productRequest.id === requestId)
			if (current[requestIndex].upvoted) {
				current[requestIndex].upvotes -= 1
				current[requestIndex].upvoted = false
			} else {
				current[requestIndex].upvotes += 1
				current[requestIndex].upvoted = true
			}
			return current
		})
	}
}

export const postReply = (data: FormData) => {
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
