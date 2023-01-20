<script lang="ts">
	import { browser } from '$app/environment'
	import CustomSelect from '$lib/components/CustomSelect.svelte'
	import NativeSelect from '$lib/components/NativeSelect.svelte'
	import type { ActionData } from './$types'
	import { enhance } from '$app/forms'
	import newFeedbackIcon from '$assets/shared/icon-new-feedback.svg'
	import arrowLeftIcon from '$assets/shared/icon-arrow-left.svg'
	import { addProductRequest } from '$lib/actions'
	import type { SubmitFunction } from '@sveltejs/kit'
	import { goto } from '$app/navigation'
	import { afterNavigate } from '$app/navigation'

	export let form: ActionData

	let previousPage = '/'
	let categoryOptions = [
		{ label: 'Feature', value: 'feature' },
		{ label: 'UI', value: 'UI' },
		{ label: 'UX', value: 'UX' },
		{ label: 'Enhancement', value: 'enhancement' },
		{ label: 'Bug', value: 'bug' }
	]

	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname || previousPage
	})

	const handleAddProductRequest: SubmitFunction = ({ data }) => {
		return async ({ result, update }) => {
			if (result.status === 303) {
				const id = addProductRequest(data)
				goto(`/product-request/${id}`)
			} else {
				update()
			}
		}
	}
</script>

<main class="container mt-6">
	<a
		href={previousPage}
		class="flex items-center gap-4 text-xs md:text-[14px] font-bold text-gray-400 mb-14"
	>
		<img src={arrowLeftIcon} alt="" />
		Go Back</a
	>
	<div
		class="p-6 pt-11 bg-white rounded-[10px] tracking-[-0.25px] relative md:py-[52px] md:px-[42px]"
	>
		<img
			src={newFeedbackIcon}
			alt=""
			class="absolute w-10 h-10 bg-purple-200 rounded-full md:w-14 md:h-14 -top-5"
		/>

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
            {form && Object.keys(form.errors.title).length
						? 'ring-1 !ring-red-100 focus-within:!ring-blue-400 hover:!ring-blue-400'
						: ''}"
				/>
				{#if form && Object.keys(form.errors.title).length}
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
					<CustomSelect
						options={categoryOptions}
						selected={categoryOptions[0]}
						property="category"
					/>
				{:else}
					<NativeSelect options={categoryOptions} {form} property="category" />
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
          {form && Object.keys(form.errors.description).length
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
				<a
					href={previousPage}
					class="text-center px-4 py-2 md:px-6 md:py-3 text-xs md:text-[14px] leading-6 bg-gray-500 button whitespace-nowrap"
					>Cancel</a
				>
			</div>
		</form>
	</div>
</main>
