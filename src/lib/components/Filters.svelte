<script lang="ts">
	import type { SubmitFunction } from '$app/forms'
	import { enhance } from '$app/forms'
	import { filters } from '$lib/stores'
	import type { Category } from '$lib/types/ProductRequest'
	import { updateFilters } from '$lib/actions'

	const filterValues = ['all', 'UI', 'UX', 'enhancement', 'bug', 'feature']

	const submitUpdateFilters: SubmitFunction = ({ action }) => {
		const category = action.searchParams.get('category') as Category
		updateFilters(category)
	}
</script>

<aside class="container py-6 bg-white rounded-lg">
	<form method="post" use:enhance={submitUpdateFilters} class="flex flex-wrap gap-x-2 gap-y-[14px]">
		{#each filterValues as filterValue}
			<button
				formaction="/?/updateFilters&category={filterValue}"
				class="rounded-lg leading-none font-semibold py-2 px-4 text-xs capitalize 
        {$filters.category === filterValue
					? 'bg-blue-400 text-white'
					: 'bg-gray-200 text-blue-400 hover:bg-blue-100'}">{filterValue}</button
			>
		{/each}
	</form>
</aside>
