<script>
	import Select from 'svelte-select'

	export let options
	export let selected = options[0]
</script>

<input type="hidden" name="category" bind:value={selected.value} />
<Select
	bind:value={selected}
	class="dropdown"
	items={options}
	clearable={false}
	searchable={false}
	showChevron
	listOffset={16}
	--background="#f7f8fd"
	--border="1px solid transparent"
	--border-hover="1px solid transparent"
	--border-focused="1px solid #4661E6"
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
