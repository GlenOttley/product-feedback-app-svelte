<script>
	import Select from 'svelte-select'
	import { filters, filteredProductRequests } from '$lib/stores'

	export let sortOptions
	let selectedOption = $filters.sort

	function updateSort() {
		filters.update((current) => {
			current.sort = selectedOption.value
			return current
		})
	}
</script>

<div class="flex items-center">
	<span id="sort-label" class="text-sm text-gray-300 whitespace-nowrap ">Sort by :&nbsp;</span>
	<Select
		on:change={updateSort}
		bind:value={selectedOption}
		class="dropdown"
		aria-labelled-by="sort-label"
		items={sortOptions}
		clearable={false}
		searchable={false}
		showChevron
		listOffset={32}
		listAutoWidth={false}
		--background="transparent"
		--border="none"
		--border-hover="none"
		--border-focused="none"
		--list-border-radius="10px"
		--list-shadow="0px 10px 40px -7px rgba(0, 0, 0, 0.5)"
		--font-size="15px"
		--icons-color="#ffff"
		--selected-item-color="#f2f4ff"
		--selected-item-padding="0px"
		--item-color="#647196"
		--item-hover-color="#ad1fea"
		--item-hover-bg="transparent"
		--item-is-active-color="#ad1fea"
		--item-is-active-bg="transparent"
	/>
</div>

<style>
	:global(.dropdown) {
		text-transform: capitalize !important;
		padding-left: 0px !important;
	}
</style>
