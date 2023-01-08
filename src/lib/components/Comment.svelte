<script lang="ts">
	import type Comment from '$types/Comment'
	import { page } from '$app/stores'

	export let comment: Comment

	const { user, id } = comment
</script>

<article class="grid py-6">
	<div class="image">
		<img src={user.image} alt="{user.name}'s profile picture" class="w-10 rounded-full" />
	</div>
	<div class="user">
		<h4 class="text-xs font-bold text-gray-500">{user.name}</h4>
		<p class="text-xs text-gray-400">@{user.username}</p>
	</div>
	<div class="reply text-end">
		<a href="{$page.url.pathname}&comment={id}/reply" class="text-xs font-semibold text-blue-400"
			>Reply</a
		>
	</div>
</article>

<style>
	.grid {
		display: grid;
		grid-template-columns: 56px auto 56px;
		grid-template-rows: repeat(2, auto);
		grid-template-areas: 'image user reply';
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
	.reply {
		grid-area: reply;
	}
</style>
