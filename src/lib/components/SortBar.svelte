<script>
	import { browser } from '$app/environment'
	import CustomSort from '$lib/components/CustomSort.svelte'
	import NativeSort from '$lib/components/NativeSort.svelte'
	import { filters, productRequests } from '$lib/stores'
	import suggestionsIcon from '$assets/suggestions/icon-suggestions.svg'
	import { filterProductRequests } from '$lib/utils/filterProductRequests'

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

<div class="mb-8 bg-gray-600 md:rounded-lg">
	<div class="container flex justify-between py-2 md:py-6 lg:py-[14px]">
		<div class="flex justify-between md:gap-[38px]">
			<div class="items-center hidden gap-4 md:flex">
				<img src={suggestionsIcon} alt="" />
				<h3 class="text-lg text-white font-bold tracking-[-0.25px]">
					{filterProductRequests($productRequests, $filters).length} Suggestions
				</h3>
			</div>

			{#if browser}
				<CustomSort {sortOptions} />
			{:else}
				<NativeSort {sortOptions} />
			{/if}
		</div>

		<a href="/product-request/new" class="button--purple"
			><span class="md:hidden">+ Add</span>
			<span class="hidden md:inline">+ Add Feedback</span></a
		>
	</div>
</div>
