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
		upvoted: false,
		status: 'suggestion',
		comments: []
	} as ProductRequest

	productRequests.update((current) => {
		current.push(newRequest)
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

export const upvoteRequest = (data: FormData) => {
	const id = data.get('id')

	productRequests.update((current) => {
		const productRequest = current.find((productRequest) => productRequest.id === id)
		if (productRequest)
			if (productRequest.upvoted) {
				productRequest.upvotes -= 1
				productRequest.upvoted = false
			} else {
				productRequest.upvotes += 1
				productRequest.upvoted = true
			}
		return current
	})
}

export const addReply = (data: FormData) => {
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
		const request = current.find(
			(productRequest) => productRequest.id === productRequestId
		) as ProductRequest

		const comment = request.comments.find((comment) => comment.id === commentId)

		if (comment) {
			if (comment.replies) {
				comment.replies?.push(newReply)
			} else {
				comment.replies = [newReply]
			}
		}
		return current
	})
}
