<script>
	import searchIcon from '$lib/assets/shared/icon-search.svg'
	export let sortOptions
</script>

<form method="post" action="?/updateSort" class="flex">
	<label for="sort" class="self-center text-sm text-gray-300 whitespace-nowrap">Sort:&nbsp;</label>

	<select name="sort" id="sort" class="pl-4 bg-gray-100 text-black capitalize rounded-l-[10px]">
		{#each sortOptions as sortOption}
			<option value={sortOption.value} selected={sortOption.selected}>{sortOption.label}</option>
		{/each}
	</select>

	<button type="submit" class="button--blue rounded-l-none"
		><img src={searchIcon} alt="" class="w-3 min-w-[12px]" /></button
	>
</form>
