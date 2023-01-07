import type Comment from './Comment'

export type Category = 'all' | 'UI' | 'UX' | 'enhancement' | 'bug' | 'feature'
export type Status = 'suggestion' | 'planned' | 'in-progress' | 'live'

interface ProductRequest {
	id: number
	title: string
	category: Category
	upvotes: number
	status: Status
	description: string
	comments: Comment[]
	upvoted?: boolean
}

export default ProductRequest
