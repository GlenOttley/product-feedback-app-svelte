<script>
	import searchIcon from '$lib/assets/shared/icon-search.svg'
	export let sortOptions
</script>

<form method="post" action="?/setSort" class="flex">
	<label for="sort" class="text-sm text-gray-300 whitespace-nowrap self-center">Sort:&nbsp;</label>

	<select name="sort" id="sort" class="px-4 bg-gray-100 text-black capitalize rounded-l-[10px]">
		{#each sortOptions as sortOption}
			<option value={sortOption.value} selected={sortOption.selected}>{sortOption.label}</option>
		{/each}
	</select>

	<button
		type="submit"
		class="px-4 py-2 rounded-l-none text-xs leading-6  bg-blue-400 button whitespace-nowrap"
		><img src={searchIcon} alt="" class="w-3 min-w-[12px]" /></button
	>
</form>
