<script lang="ts">
	import type { SubmitFunction } from '$app/forms'
	import { enhance } from '$app/forms'
	import arrowUpIcon from '$assets/shared/icon-arrow-up.svg'
	import arrowUpIconWhite from '$assets/shared/icon-arrow-up-white.svg'
	import commentsIcon from '$assets/shared/icon-comments.svg'
	import type ProductRequest from '$types/ProductRequest'
	import { upvoteRequest } from '$lib/actions'
	import getCommentsLength from '$lib/utils/getCommentsLength'
	import { page } from '$app/stores'

	export let productRequest: ProductRequest
	export let borderColor: string
	export let bgColor: string

	let { title, description, category, status, upvotes, comments, id, upvoted } = productRequest
	const commentsLength = getCommentsLength(comments)

	const handleUpvoteRequest: SubmitFunction = ({ data }) => {
		return async ({ result, update }) => {
			if (result.status === 303) {
				upvoted ? (upvotes -= 1) : (upvotes += 1)
				upvoted = !upvoted
				upvoteRequest(data)
			}
		}
	}
</script>

<article class="bg-white rounded-lg p-6 border-t-[6px] {borderColor}">
	<div class="grid">
		<div class="mb-4 status">
			<p class="text-xs text-gray-400 capitalize">
				<span class="inline-block w-2 h-2 rounded-full mr-2 {bgColor}" />{status.replace('-', ' ')}
			</p>
		</div>
		<div class="mb-2 title ">
			<a href="/product-request/{id}" class="text-xs font-bold text-gray-500 hover:text-blue-400"
				>{title}</a
			>
		</div>
		<div class="mb-3 description ">
			<p class="text-xs text-gray-400 ">{description}</p>
		</div>
		<div class="mb-5 category ">
			<span
				class="px-4 py-2 text-xs font-semibold text-blue-400 capitalize bg-gray-200 rounded-lg"
				role="status"
				aria-label="This request has a status of {category}">{category}</span
			>
		</div>
		<div class="upvotes">
			<form
				method="post"
				action="/?/upvoteRequest&redirectTo={$page.url.pathname}"
				use:enhance={handleUpvoteRequest}
			>
				<input type="hidden" name="id" value={id} />
				<button
					class={`z-10 py-2 px-4 text-xs font-semibold rounded-lg gap-2 flex items-center max-w-fit hover:bg-blue-100 min-w-[40px] 
          ${upvoted ? 'bg-blue-400 text-white' : 'bg-gray-200 text-gray-500'}`}
					aria-label={upvoted ? 'Remove your upvote from this request' : 'Upvote this request'}
				>
					<img src={upvoted ? arrowUpIconWhite : arrowUpIcon} alt="" />
					{upvotes}</button
				>
			</form>
		</div>
		<div class="comments">
			<span
				class="flex items-center justify-end py-2 text-xs font-semibold text-gray-500 gap-2 max-w-fit "
				role="status"
				aria-label="{comments.length} for this request"
			>
				<img src={commentsIcon} alt="" />{commentsLength}</span
			>
		</div>
	</div>
</article>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(2, auto);
		grid-template-rows: repeat(5, auto);
		grid-template-areas:
			'status status'
			'title title'
			'description description'
			'category category'
			'upvotes comments';
	}
	/* @media screen and (min-width: 768px) {
		.grid {
			grid-template-columns: 80px auto 50px;
			grid-template-rows: repeat(3, auto);
			grid-template-areas:
				'upvotes title title'
				'upvotes description comments'
				'upvotes category category';
		}
	} */
	.status {
		grid-area: status;
	}
	.title {
		grid-area: title;
	}
	.description {
		grid-area: description;
	}
	.category {
		grid-area: category;
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
