<script>
	export let options
	export let form
	export let selected = options[0].value
	export let property
</script>

<select
	name={property}
	id={property}
	class=" bg-gray-100 rounded-[5px] py-3 px-6 border-r-[16px] border-transparent placeholder:text-xs placeholder:text-[#8C92B3]
            text-gray-500 text-xs md:text-[15px] w-full outline-none ring-blue-400 focus-within:ring-1 hover:ring-1 cursor-pointer"
>
	{#each options as option}
		<option
			value={option.value}
			selected={option.value === form?.data[property] || option.value === selected}
			>{option.label}</option
		>
	{/each}
</select>
