import type User from './User'

interface Reply {
	id: string
	content: string
	replyingTo: string
	user: User
}

export default Reply
