<script>
	export let categoryOptions
	export let form
</script>

<select
	name="category"
	id="category"
	class=" bg-gray-100 rounded-[5px] py-3 px-6 border-r-[16px] border-transparent placeholder:text-xs placeholder:text-[#8C92B3]
            text-gray-500 text-xs md:text-[15px] w-full outline-none ring-blue-400 focus-within:ring-1 hover:ring-1 cursor-pointer"
>
	{#each categoryOptions as categoryOption, index}
		<option
			value={categoryOption.value}
			selected={categoryOption.value === form?.data.category || index === 0}
			>{categoryOption.label}</option
		>
	{/each}
</select>
