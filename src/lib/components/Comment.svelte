<script lang="ts">
	import type Comment from '$types/Comment'
	import { onMount } from 'svelte/internal'
	import { enhance } from '$app/forms'
	import { page } from '$app/stores'
	import { addReply } from '$lib/actions'
	import type { SubmitFunction } from '@sveltejs/kit'
	import { browser } from '$app/environment'

	export let comment: Comment
	export let isLastComment: boolean = false
	export let isReply: boolean
	export let isLastReply: boolean
	export let isFirstReply: boolean
	export let parentCommentId: string

	let showReplyForm = false

	onMount(() => (showReplyForm = false))

	$: ({ user, content, replies, replyingTo, id } = comment)

	const handleReply: SubmitFunction = ({ data }) => {
		addReply(data)
		showReplyForm = false
	}

	let commentContent = ''
	const maxlength = 250

	$: charactersLeft = maxlength - commentContent.length
</script>

<article
	class="grid py-6 
   {!isReply && !replies ? 'border-b border-gray-200 ' : ''} 
   {isLastComment && !replies ? 'border-none pb-0' : ''}
   {isReply ? 'pt-0 pb-9 pl-6 border-l border-gray-200 md:ml-[20px]' : ''}
   {isReply && !isFirstReply ? 'relative -top-4 -mb-4 ' : ''}
   {isLastReply ? '!pb-0 border-none' : ''}"
>
	<div class="image ">
		<img
			src={user.image}
			alt="{user.name}'s profile picture"
			class="w-10 h-10 rounded-full z-[-100]"
		/>
	</div>
	<div class="user">
		<h4 class="text-xs font-bold text-gray-500 md:text-[14px]">{user.name}</h4>
		<p class="text-xs text-gray-400 md:text-[14px]">@{user.username}</p>
	</div>

	<label for="reply-toggle--comment_{id}" class="cursor-pointer reply-link"
		><p class="text-xs font-semibold text-blue-400">Reply</p></label
	>
	<input
		id="reply-toggle--comment_{id}"
		type="checkbox"
		class="sr-only peer/reply-toggle"
		bind:checked={showReplyForm}
	/>

	<form
		method="post"
		action="?/addReply"
		use:enhance={handleReply}
		class="flex-col hidden gap-4 reply-form peer-checked/reply-toggle:flex md:flex-row md:items-start"
	>
		<textarea
			name="content"
			id="reply"
			placeholder="Type your reply here"
			rows="2"
			required
			{maxlength}
			bind:value={commentContent}
			class="bg-gray-100 rounded-[5px] py-3 px-6 placeholder:text-xs placeholder:text-[#8C92B3] 
    text-gray-500 text-xs md:text-[15px] w-full outline-none ring-blue-400 focus-within:ring-1 hover:ring-1"
		/>
		<input type="hidden" name="productRequestId" value={$page.params.id} />
		<input type="hidden" name="commentId" value={parentCommentId} />
		<input type="hidden" name="replyingTo" value={user.username} />
		<!-- TODO fix layout of reply box/charcount/button -->
		<div class="flex items-center justify-between">
			{#if browser}
				<p class="text-xs text-gray-400 md:text-sm">{charactersLeft} Characters left</p>
			{:else}
				<p class="text-xs text-gray-400 md:text-sm">{maxlength} Characters max</p>
			{/if}
			<button
				type="submit"
				class="px-4 py-2 text-xs bg-purple-200 leading-6 button whitespace-nowrap"
				>Post Reply</button
			>
		</div>
	</form>

	<div class="content">
		<p class="text-xs text-gray-400 md:text-sm">
			{#if replyingTo}
				<span class="font-bold text-purple-200">@{replyingTo}</span>
			{/if}
			{content}
		</p>
	</div>
</article>
{#if replies}
	{#each replies as reply, index (reply.id)}
		<svelte:self
			comment={reply}
			{parentCommentId}
			isReply={true}
			isFirstReply={index === 0}
			isLastReply={index + 1 === replies.length}
		/>
	{/each}
{/if}

<style>
	.grid {
		display: grid;
		column-gap: 16px;
		row-gap: 16px;
		grid-template-columns: 40px auto 40px;
		grid-template-rows: repeat(3, auto);
		grid-template-areas:
			'image user reply-link'
			'content content content'
			'reply-form reply-form reply-form';
	}
	@media screen and (min-width: 768px) {
		.grid {
			column-gap: 32px;
			grid-template-columns: 40px auto 40px;
			grid-template-rows: repeat(3, auto);
			grid-template-areas:
				'image user reply-link'
				'image content content'
				'image reply-form reply-form';
		}
	}
	.image {
		grid-area: image;
	}
	.user {
		grid-area: user;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.reply-link {
		grid-area: reply-link;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	.content {
		grid-area: content;
	}

	.reply-form {
		grid-area: reply-form;
	}
</style>
