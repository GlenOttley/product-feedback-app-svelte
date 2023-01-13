<script>
	import Select from 'svelte-select'
	import { filters } from '$lib/stores'

	export let categoryOptions
</script>

<Select
	bind:value={categoryOptions[0]}
	class="dropdown"
	items={categoryOptions}
	clearable={false}
	searchable={false}
	showChevron
	listOffset={16}
	--background="#f7f8fd"
	--border="none"
	--border-hover="none"
	--border-focused="2px solid #4661E6"
	--list-border-radius="10px"
	--list-shadow="0px 10px 40px -7px rgba(0, 0, 0, 0.5)"
	--font-size="13px"
	--icons-color="#4661E6"
	--selected-item-color="#3a4374"
	--selected-item-padding="12px 24px"
	--item-color="#647196"
	--item-hover-color="#ad1fea"
	--item-hover-bg="transparent"
	--item-is-active-color="#ad1fea"
	--item-is-active-bg="transparent"
/>

<style>
	:global(.dropdown) {
		cursor: pointer;
		text-transform: capitalize !important;
		padding-left: 0px !important;
	}
</style>
