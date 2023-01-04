import type Comment from './Comment'

export type Category = 'enhancement' | 'UI' | 'UX' | 'bug' | 'feature' | string
export type Status = 'suggestion' | 'planned' | 'in-progress'

interface ProductRequest {
	id: number
	title: string
	category: Category
	status: Status
	description: string
	comments?: Comment[]
}

export default ProductRequest
