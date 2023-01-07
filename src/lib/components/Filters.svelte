<script lang="ts">
	import type { SubmitFunction } from '$app/forms'
	import { enhance } from '$app/forms'
	import { filters } from '$lib/stores'
	import type { Category } from '$lib/types/ProductRequest'

	const filterValues = ['all', 'UI', 'UX', 'enhancement', 'bug', 'feature']

	const submitUpdateFilters: SubmitFunction = ({ action }) => {
		const category = action.searchParams.get('category')

		if (category) {
			filters.update((current) => {
				current.category = category as Category
				return current
			})
		}
	}
</script>

<aside class="container py-6 bg-white rounded-[10px] flex items-center">
	<form method="post" use:enhance={submitUpdateFilters} class="flex flex-wrap gap-x-2 gap-y-[14px]">
		{#each filterValues as filterValue}
			<button
				formaction="/?/setFilters&category={filterValue}"
				class="rounded-[10px] leading-none font-semibold  py-2 px-4 text-xs capitalize 
        {$filters.category === filterValue
					? 'bg-blue-400 text-white'
					: 'bg-gray-200 text-blue-400'}">{filterValue}</button
			>
		{/each}
	</form>
</aside>
