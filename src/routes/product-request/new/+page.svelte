<script lang="ts">
	import { browser } from '$app/environment'
	import SelectCategoryBrowser from '$components/SelectCategoryBrowser.svelte'
	import SelectCategoryServer from '$components/SelectCategoryServer.svelte'
	import type { ActionData } from './$types'
	import { enhance } from '$app/forms'
	import plusIcon from '$assets/shared/icon-plus.svg'
	import arrowLeftIcon from '$assets/shared/icon-arrow-left.svg'
	import { addProductRequest } from '$lib/actions'
	import type { SubmitFunction } from '@sveltejs/kit'

	let categoryOptions = [
		{ label: 'Feature', value: 'feature' },
		{ label: 'UI', value: 'UI' },
		{ label: 'UX', value: 'UX' },
		{ label: 'Enhancement', value: 'enhancement' },
		{ label: 'Bug', value: 'bug' }
	]

	export let form: ActionData

	const handleAddProductRequest: SubmitFunction = ({ data }) => {
		return async ({ result, update }) => {
			if (result.status === 303) {
				addProductRequest(data)
			}
			update()
		}
	}
</script>

<main class="container mt-6">
	<a href="/" class="flex items-center gap-4 text-xs md:text-[14px] font-bold text-gray-400 mb-14">
		<img src={arrowLeftIcon} alt="" />
		Go Back</a
	>
	<div
		class="p-6 pt-11 bg-white rounded-[10px] tracking-[-0.25px] relative md:py-[52px] md:px-[42px]"
	>
		<!-- TODO give this element a radial gradient background to match figma -->
		<span
			class="absolute flex items-center justify-center w-10 h-10 bg-purple-200 rounded-full md:w-14 md:h-14 plus-icon -top-6"
		>
			<img src={plusIcon} alt="" class="w-3 md:w-4" />
		</span>
		<h1 class="mb-6 text-lg font-bold text-gray-500 md:text-2xl">Create New Feedback</h1>
		<form action="?/addProductRequest" method="post" use:enhance={handleAddProductRequest}>
			<fieldset class="mb-6">
				<label
					for="title"
					class="text-xs md:text-[14px] font-bold text-gray-500 tracking-[-0.18px] mb-1 block"
					>Feedback Title</label
				>
				<label for="title" class="block mb-4 text-xs md:text-[14px] text-gray-400"
					>Add a short, descriptive headline</label
				>
				<input
					type="text"
					name="title"
					id="title"
					value={form?.data.title ?? ''}
					class="bg-gray-100 rounded-[5px] py-3 px-6 placeholder:text-xs placeholder:text-[#8C92B3]
          text-gray-500 text-xs md:text-[15px] w-full outline-none ring-blue-400 focus-within:ring-1 hover:ring-1  
            {form?.errors.title
						? 'ring-1 !ring-red-100 focus-within:!ring-blue-400 hover:!ring-blue-400'
						: ''}"
				/>
				{#if form?.errors.title}
					{#each Object.values(form.errors.title) as error}
						<p class="block pt-1 text-xs md:text-[14px] text-red-100">{error}</p>
					{/each}
				{/if}
			</fieldset>

			<fieldset class="mb-6">
				<label
					for="category"
					class="text-xs md:text-[14px] font-bold text-gray-500 tracking-[-0.18px] mb-1 block"
					>Category</label
				>
				<label for="category" class="block mb-4 text-xs md:text-[14px] text-gray-400"
					>Choose a category for your feedback</label
				>
				{#if browser}
					<SelectCategoryBrowser {categoryOptions} />
				{:else}
					<SelectCategoryServer {categoryOptions} {form} />
				{/if}
			</fieldset>

			<fieldset class="mb-10 md:mb-8">
				<label
					for="description"
					class="text-xs md:text-[14px] font-bold text-gray-500 tracking-[-0.18px] mb-1 block"
					>Feedback detail</label
				>
				<label for="description" class="block mb-4 text-xs md:text-[14px] text-gray-400"
					>Include any specific comments on what should be improved, added, etc.</label
				>
				<textarea
					name="description"
					id="description"
					rows="5"
					class="bg-gray-100 rounded-[5px] py-3 px-6 placeholder:text-xs placeholder:text-[#8C92B3]
          text-gray-500 text-xs md:text-[15px] w-full outline-none ring-blue-400 focus-within:ring-1 hover:ring-1  
          {form?.errors.description
						? 'ring-1 !ring-red-100 focus-within:!ring-blue-400 hover:!ring-blue-400'
						: ''}">{form?.data.description ?? ''}</textarea
				>
				{#if form?.errors.description}
					{#each Object.values(form.errors.description) as error}
						<p class="block pt-1 text-xs md:text-[14px] text-red-100">{error}</p>
					{/each}
				{/if}
			</fieldset>

			<div class="flex flex-col gap-4 md:flex-row-reverse ">
				<button
					type="submit"
					class="px-4 py-2 md:px-6 md:py-3 text-xs md:text-[14px] leading-6 bg-purple-200 button whitespace-nowrap"
					>Add Feedback</button
				>
				<button
					type="reset"
					class="px-4 py-2 md:px-6 md:py-3 text-xs md:text-[14px] leading-6 bg-gray-500 button whitespace-nowrap"
					>Cancel</button
				>
			</div>
		</form>
	</div>
</main>
