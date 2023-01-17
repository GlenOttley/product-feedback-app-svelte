<script lang="ts">
	import type ProductRequest from '$types/ProductRequest'
	import ProductRequestOverview from '$components/ProductRequestOverview.svelte'
	import Comment from '$components/Comment.svelte'
	import ArrowLeftIcon from '$assets/shared/icon-arrow-left.svg'
	import getCommentsLength from '$lib/utils/getCommentsLength'
	import { currentUser, productRequests } from '$lib/stores'
	import { page } from '$app/stores'
	import { onDestroy } from 'svelte/internal'
	import AddComment from '$components/AddComment.svelte'

	let productRequest: ProductRequest
	let commentsLength: number

	const unsubscribe = productRequests.subscribe((current) => {
		productRequest = current.find((request) => request.id === $page.params.id) as ProductRequest
		if (productRequest) commentsLength = getCommentsLength(productRequest.comments)
	})

	onDestroy(unsubscribe)
</script>

{#if productRequest}
	<div class="container mt-6">
		<div class="flex justify-between mb-6 ">
			<a href="/" class="flex items-center gap-4 text-xs font-bold text-gray-400">
				<img src={ArrowLeftIcon} alt="" />
				Go Back
			</a>
			{#if productRequest.user?.username === $currentUser.username}
				<a
					href="./{productRequest.id}/edit"
					class="rounded-[10px] bg-blue-400 text-white text-xs font-bold py-2 px-4 md:px-6 md:py-3"
				>
					Edit Feedback</a
				>
			{/if}
		</div>
		<div class="mb-6">
			<ProductRequestOverview {productRequest} />
		</div>
		<div class="bg-white rounded-[10px] container py-6 mb-6 md:px-8">
			<h3 class="text-lg font-bold text-gray-500">
				{commentsLength} Comments
			</h3>
			{#each productRequest.comments as comment, index (comment.id)}
				<Comment
					{comment}
					parentCommentId={comment.id}
					isLastComment={index + 1 === productRequest.comments.length}
					isReply={false}
					isLastReply={false}
					isFirstReply={false}
				/>
			{/each}
		</div>

		<div class="bg-white rounded-[10px] container py-6 mb-6 md:px-8">
			<AddComment />
		</div>
	</div>
{/if}
