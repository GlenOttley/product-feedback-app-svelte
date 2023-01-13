<script>
	import { browser } from '$app/environment'
	import SelectCategoryBrowser from '$components/SelectCategoryBrowser.svelte'
	import SelectCategoryServer from '$components/SelectCategoryServer.svelte'

	let categoryOptions = [
		{ label: 'Feature', value: 'feature' },
		{ label: 'UI', value: 'UI' },
		{ label: 'UX', value: 'UX' },
		{ label: 'Enhancement', value: 'enhancement' },
		{ label: 'Bug', value: 'bug' }
	]
</script>

<main class="container mt-6">
	<div class="p-6 bg-white rounded-[10px] tracking-[-0.25px]">
		<h1 class="mb-6 text-lg font-bold text-gray-500">Create New Feedback</h1>
		<form action="?/addProductRequest" method="post">
			<fieldset class="mb-6">
				<label for="title" class="text-xs font-bold text-gray-500 tracking-[-0.18px] mb-1 block"
					>Feedback Title</label
				>
				<label for="title" class="block mb-4 text-xs text-gray-400"
					>Add a short, descriptive headline</label
				>
				<input
					type="text"
					name="title"
					id="title"
					class="bg-gray-100 rounded-[5px] py-3 px-6 placeholder:text-xs placeholder:text-[#8C92B3]
          text-gray-500 text-xs w-full"
				/>
			</fieldset>

			<fieldset class="mb-6">
				<label for="category" class="text-xs font-bold text-gray-500 tracking-[-0.18px] mb-1 block"
					>Category</label
				>
				<label for="category" class="block mb-4 text-xs text-gray-400"
					>Choose a category for your feedback</label
				>
				{#if browser}
					<SelectCategoryBrowser {categoryOptions} />
				{:else}
					<select
						name="sort"
						id="sort"
						class=" bg-gray-100 rounded-[5px] py-3 px-6 border-r-[16px] border-transparent placeholder:text-xs placeholder:text-[#8C92B3]
            text-gray-500 text-xs w-full"
					>
						{#each categoryOptions as categoryOption}
							<option value={categoryOption.value} selected={categoryOption.selected}
								>{categoryOption.label}</option
							>
						{/each}
					</select>
				{/if}
			</fieldset>

			<fieldset class="mb-6">
				<label
					for="description"
					class="text-xs font-bold text-gray-500 tracking-[-0.18px] mb-1 block"
					>Feedback detail</label
				>
				<label for="description" class="block mb-4 text-xs text-gray-400"
					>Include any specific comments on what should be improved, added, etc.</label
				>
				<textarea
					type="text"
					name="description"
					id="description"
					rows="5"
					class="bg-gray-100 rounded-[5px] py-3 px-6 placeholder:text-xs placeholder:text-[#8C92B3]
          text-gray-500 text-xs w-full"
				/>
			</fieldset>

			<div class="flex flex-col gap-4">
				<button
					type="submit"
					class="px-4 py-2 text-xs leading-6 bg-purple-200 button whitespace-nowrap"
					>Add Feedback</button
				>
				<button
					type="reset"
					class="px-4 py-2 text-xs leading-6 bg-gray-500 button whitespace-nowrap">Cancel</button
				>
			</div>
		</form>
	</div>
</main>
