<script lang="ts">
	import { page } from '$app/stores'
	import { enhance } from '$app/forms'
	import { browser } from '$app/environment'
	import type { SubmitFunction } from '@sveltejs/kit'
	import { addComment } from '$lib/actions'

	const handleComment: SubmitFunction = ({ data }) => {
		addComment(data)
	}
	let comment = ''
	const maxlength = 250

	$: charactersLeft = maxlength - comment.length
</script>

<h3 class="mb-6 text-lg font-bold text-gray-500">Add Comment</h3>
<form
	method="post"
	action="?/addComment"
	use:enhance={handleComment}
	class="flex flex-col gap-4 md:flex-row md:items-start"
>
	<input type="hidden" name="productRequestId" value={$page.params.id} />
	<textarea
		name="content"
		id="content"
		placeholder="Type your comment here"
		rows="2"
		required
		{maxlength}
		bind:value={comment}
		class="bg-gray-100 rounded-[5px] py-3 px-6 placeholder:text-xs placeholder:text-[#8C92B3] 
    text-gray-500 text-xs md:text-[15px] w-full outline-none ring-blue-400 focus-within:ring-1 hover:ring-1"
	/>
	<div class="flex items-center justify-between">
		{#if browser}
			<p class="text-xs text-gray-400 md:text-sm">{charactersLeft} Characters left</p>
		{:else}
			<p class="text-xs text-gray-400 md:text-sm">{maxlength} Characters max</p>
		{/if}
		<button type="submit" class="px-4 py-2 text-xs leading-6 bg-purple-200 button whitespace-nowrap"
			>Post Comment</button
		>
	</div>
</form>
