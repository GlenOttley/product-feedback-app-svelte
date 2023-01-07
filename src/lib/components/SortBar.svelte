<script>
	import { browser } from '$app/environment'
	import SelectSortBrowser from '$components/SelectSortBrowser.svelte'
	import SelectSortServer from '$components/SelectSortServer.svelte'
	import { filters, filteredProductRequests } from '$lib/stores'
	import suggestionsIcon from '$assets/suggestions/icon-suggestions.svg'

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

<div class="bg-gray-600 md:rounded-[10px] mb-8">
	<div class="container flex justify-between py-2 md:py-6">
		<div class="items-center hidden gap-4 md:flex">
			<img src={suggestionsIcon} alt="" />
			<h3 class="text-lg text-white font-bold tracking-[-0.25px]">
				{$filteredProductRequests.length} Suggestions
			</h3>
		</div>

		{#if browser}
			<SelectSortBrowser {sortOptions} />
		{:else}
			<SelectSortServer {sortOptions} />
		{/if}

		<a
			href="/add-feedback"
			class="px-4 py-2 text-xs bg-purple-200 leading-6 button whitespace-nowrap"
			><span class="sm:hidden">+ Add</span>
			<span class="hidden sm:inline">+ Add Feedback</span></a
		>
	</div>
</div>
