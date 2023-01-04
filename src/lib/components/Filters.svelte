<script>
	import { filters } from '$lib/stores'

	function handleFilter({ target }) {
		let activeFilter = target.href.split('?')[1]
		let filterKey = activeFilter.split('=')[0]
		let filterValue = activeFilter.split('=')[1]

		filters.update((current) => {
			current, (current[filterKey] = filterValue)
			return current
		})
	}
</script>

<fieldset class="container flex flex-wrap py-6 bg-white">
	<a
		on:click|preventDefault={handleFilter}
		href="/?category=all"
		class="rounded-[10px] leading-none font-semibold bg-gray-200 py-2 px-4 text-xs text-blue-400"
		>All</a
	>
	<a
		on:click|preventDefault={handleFilter}
		href="/?category=enhancement"
		class="rounded-[10px] leading-none font-semibold bg-gray-200 py-2 px-4 text-xs text-blue-400"
		>Enhancement</a
	>
</fieldset>
