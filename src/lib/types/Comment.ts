import type User from './User'
import type Reply from './Reply'

interface Comment {
	id: number
	content: string
	user: User
	replies?: Reply[]
}

export default Comment
