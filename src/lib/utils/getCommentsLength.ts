import type Comment from '$types/Comment'

const getCommentsLength = (comments: Comment[]) => {
	let commentsLength = 0
	comments.forEach((comment) => {
		if (comment.replies) {
			commentsLength += comment.replies.length
		}
		commentsLength += 1
	})
	return commentsLength
}

export default getCommentsLength
