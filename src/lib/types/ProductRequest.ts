import type Comment from './Comment'

export type Category = 'all' | 'UI' | 'UX' | 'enhancement' | 'bug' | 'feature'
export type Status = 'suggestion' | 'planned' | 'in-progress' | 'live'

interface ProductRequest {
	id: number
	title: string
	category: Category
	status: Status
	description: string
	comments?: Comment[]
}

export default ProductRequest
