import type Comment from './Comment'
import type User from './User'

export type Category = 'all' | 'UI' | 'UX' | 'enhancement' | 'bug' | 'feature'
export type Status = 'suggestion' | 'planned' | 'in-progress' | 'live'

interface ProductRequest {
	id: string
	title: string
	category: Category
	upvotes: number
	status: Status
	description: string
	comments: Comment[]
	upvoted?: boolean
	user?: User
}

export default ProductRequest
