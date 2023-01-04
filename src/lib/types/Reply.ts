import type User from './User'

interface Reply {
	content: string
	replyingTo: string
	user: User
}

export default Reply
