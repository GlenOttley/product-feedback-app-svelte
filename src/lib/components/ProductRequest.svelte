<script lang="ts">
	import type { SubmitFunction } from '$app/forms'
	import { enhance } from '$app/forms'
	import arrowUpIcon from '$assets/shared/icon-arrow-up.svg'
	import arrowUpIconWhite from '$assets/shared/icon-arrow-up-white.svg'
	import commentsIcon from '$assets/shared/icon-comments.svg'
	import { productRequests } from '$lib/stores'
	import type ProductRequest from '$types/ProductRequest'

	export let productRequest: ProductRequest

	let { title, description, status, upvotes, comments, id, upvoted } = productRequest

	const submitUpvoteRequest: SubmitFunction = ({ action }) => {
		const requestId = Number(action.searchParams.get('id'))

		if (requestId) {
			productRequests.update((current) => {
				const requestIndex = current.findIndex((productRequest) => productRequest.id === requestId)
				if (current[requestIndex].upvoted) {
					current[requestIndex].upvotes -= 1
					current[requestIndex].upvoted = false
				} else {
					current[requestIndex].upvotes += 1
					current[requestIndex].upvoted = true
				}
				return current
			})
			upvoted ? (upvotes -= 1) : (upvotes += 1)
			upvoted = !upvoted
		}
	}
</script>

<article class="bg-white rounded-[10px] p-6 md:py-7 md:px-8 group">
	<div class="grid">
		<div class="mb-2 title md:mb-1">
			<h3 class="text-xs font-bold text-gray-500 md:text-lg group-hover:text-blue-400">{title}</h3>
		</div>
		<div class="mb-2 description md:mb-3">
			<p class="text-xs text-gray-400 md:text-base">{description}</p>
		</div>
		<div class="mb-5 status md:mb-0">
			<span
				class="py-2 px-4 text-xs text-blue-400 capitalize bg-gray-200 font-semibold rounded-[10px]"
				role="status"
				aria-label="This request has a status of {status}">{status}</span
			>
		</div>
		<div class="upvotes">
			<form method="post" use:enhance={submitUpvoteRequest}>
				<button
					class={`py-2 px-4 text-xs font-semibold rounded-[10px] gap-2 flex items-center max-w-fit md:flex-col md:px-2 md:py-3 hover:bg-blue-100 min-w-[40px] 
          ${upvoted ? 'bg-blue-400 text-white' : 'bg-gray-200 text-gray-500'}`}
					aria-label={upvoted ? 'Remove your upvote from this request' : 'Upvote this request'}
					formaction="/?/upvote&id={id}"
				>
					<img src={upvoted ? arrowUpIconWhite : arrowUpIcon} alt="" />
					{upvotes}</button
				>
			</form>
		</div>
		<div class="comments">
			<span
				class="flex items-center justify-end gap-2 py-2 text-xs font-semibold text-gray-500 max-w-fit md:text-base"
				role="status"
				aria-label="{comments.length} for this request"
			>
				<img src={commentsIcon} alt="" />{comments.length}</span
			>
		</div>
	</div>
</article>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(2, auto);
		grid-template-rows: repeat(4, auto);
		grid-template-areas:
			'title title'
			'description description'
			'status status'
			'upvotes comments';
	}
	@media screen and (min-width: 768px) {
		.grid {
			grid-template-columns: 80px auto 50px;
			grid-template-rows: repeat(3, auto);
			grid-template-areas:
				'upvotes title title'
				'upvotes description comments'
				'upvotes status status';
		}
	}
	.title {
		grid-area: title;
	}
	.description {
		grid-area: description;
	}
	.status {
		grid-area: status;
	}
	.upvotes {
		grid-area: upvotes;
	}
	.comments {
		grid-area: comments;
		display: flex;
		justify-content: flex-end;
	}
</style>
