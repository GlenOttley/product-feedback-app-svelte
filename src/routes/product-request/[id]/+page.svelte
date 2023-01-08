<script lang="ts">
	import type ProductRequest from '$types/ProductRequest'
	import ProductRequestOverview from '$components/ProductRequestOverview.svelte'
	import Comment from '$components/Comment.svelte'
	import ArrowLeftIcon from '$assets/shared/icon-arrow-left.svg'
	export let data: ProductRequest

	const { comments, id } = data
	let commentsLength = 0

	comments.forEach((comment) => {
		if (comment.replies) {
			commentsLength += comment.replies.length
		}
		commentsLength += 1
	})
</script>

<div class="flex justify-between mb-6">
	<a href="/" class="flex items-center gap-4 text-xs font-bold text-gray-400">
		<img src={ArrowLeftIcon} alt="" />
		Go Back
	</a>
	<a href="./{id}/edit" class="rounded-[10px] bg-blue-400 text-white text-xs font-bold py-2 px-4">
		Edit Feedback</a
	>
</div>
<div class="mb-6">
	<ProductRequestOverview productRequest={data} />
</div>
<div class="bg-white rounded-[10px] container py-6">
	<h3 class="text-lg font-bold text-gray-500">{commentsLength} Comments</h3>
	{#each comments as comment}
		<Comment {comment} />
	{/each}
</div>
