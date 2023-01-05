<script>
	import { browser } from '$app/environment'
	import SelectSortBrowser from '$components/SelectSortBrowser.svelte'
	import SelectSortServer from '$components/SelectSortServer.svelte'
	import { filters } from '$lib/stores'

	let sortOptions = [
		{ label: 'most upvotes', value: 'mostUpvotes', selected: $filters.sort === 'mostUpvotes' },
		{ label: 'least upvotes', value: 'leastUpvotes', selected: $filters.sort === 'leastUpvotes' },
		{ label: 'most comments', value: 'mostComments', selected: $filters.sort === 'mostComments' },
		{
			label: 'least comments',
			value: 'leastComments',
			selected: $filters.sort === 'leastComments'
		}
	]
</script>

<div class="bg-gray-600">
	<div class="container flex justify-between py-2">
		{#if browser}
			<SelectSortBrowser {sortOptions} />
		{:else}
			<SelectSortServer {sortOptions} />
		{/if}

		<a
			href="/add-feedback"
			class="px-4 py-2 text-xs leading-6 bg-purple-200 button whitespace-nowrap">New</a
		>
	</div>
</div>
