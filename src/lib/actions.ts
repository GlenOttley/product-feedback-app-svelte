import type { Sort } from '$lib/stores'
import { filters, productRequests } from '$lib/stores'
import type Comment from '$types/Comment'
import type Reply from '$types/Reply'
import { v4 as uuidv4 } from 'uuid'
import type ProductRequest from './types/ProductRequest'
import type { Category } from './types/ProductRequest'
import { get } from 'svelte/store'
import { currentUser } from '$lib/stores'

export const editProductRequest = (data: FormData) => {
	const id = data.get('id')
	const title = data.get('title')
	const category = data.get('category')
	const status = data.get('status')
	const description = data.get('description')

	productRequests.update((current) => {
		const index = current.findIndex((productRequest) => productRequest.id === id)
		current[index] = { ...current[index], title, category, status, description } as ProductRequest
		return current
	})
}
export const deleteProductRequest = (id: string) => {
	productRequests.update((current) => {
		return current.filter((request) => request.id !== id)
	})
}

export const addProductRequest = (data: FormData) => {
	const title = data.get('title')
	const category = data.get('category')
	const description = data.get('description')

	const newRequest = {
		id: uuidv4(),
		title,
		category,
		upvotes: 0,
		upvoted: false,
		status: 'suggestion',
		description,
		comments: [],
		user: get(currentUser)
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

export const addComment = (data: FormData) => {
	const productRequestId = data.get('productRequestId')
	const content = data.get('content')

	const newComment = {
		id: uuidv4(),
		content,
		user: get(currentUser)
	} as Comment

	productRequests.update((current) => {
		const request = current.find(
			(productRequest) => productRequest.id === productRequestId
		) as ProductRequest
		if (request) {
			request.comments.push(newComment)
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
		user: get(currentUser)
	} as Reply

	productRequests.update((current) => {
		const request = current.find(
			(productRequest) => productRequest.id === productRequestId
		) as ProductRequest

		if (request) {
			const comment = request.comments.find((comment) => comment.id === commentId)

			if (comment) {
				if (comment.replies) {
					comment.replies?.push(newReply)
				} else {
					comment.replies = [newReply]
				}
			}
		}
		return current
	})
}
