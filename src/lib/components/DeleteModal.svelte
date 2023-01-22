<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { deleteProductRequest } from '$lib/actions'
	import type ProductRequest from '$lib/types/ProductRequest'
	import { createEventDispatcher } from 'svelte/internal'
	import { onMount } from 'svelte/internal'

	export let productRequest: ProductRequest

	const dispatch = createEventDispatcher()

	let modalContent: HTMLElement
	const focusableElementsString =
		'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]'

	let focusableElements: NodeList | HTMLElement[]
	let firstTabStop: HTMLElement
	let lastTabStop: HTMLElement

	onMount(() => {
		focusableElements = modalContent.querySelectorAll(focusableElementsString)
		focusableElements = Array.prototype.slice.call(focusableElements)
		firstTabStop = focusableElements[0]
		lastTabStop = focusableElements[focusableElements.length - 1]
	})

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			closeModal()
		}
		if (e.key === 'Tab') {
			// SHIFT + TAB
			if (e.shiftKey) {
				if (document.activeElement === firstTabStop) {
					e.preventDefault()
					lastTabStop.focus()
				}
				// TAB
			} else {
				if (document.activeElement === lastTabStop) {
					e.preventDefault()
					firstTabStop.focus()
				}
			}
		}
	}

	function closeModal() {
		dispatch('closeModal')
	}
</script>

<svelte:window on:keydown={handleKeydown} />
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	on:click={closeModal}
	class="fixed top-0 left-0 z-10 hidden w-full h-full p-0 m-0 bg-black bg-opacity-60 peer-checked/open:block peer-checked/close:hidden"
/>
<div
	class="container fixed z-20 hidden mx-auto -translate-x-1/2 top-1/4 left-1/2 peer-checked/open:block peer-checked/close:hidden md:max-w-3xl"
>
	<div class="bg-white rounded-lg p-6 md:py-[52px] md:px-[42px]">
		<h2 class="mb-6 text-lg font-bold text-gray-500 md:text-2xl">Confirm Deletion</h2>
		<p class="mb-4 text-xs md:text-[14px] text-gray-400">
			Are you sure you wish to delete "<span class="italic">{productRequest.title}</span>"?
		</p>
		<div bind:this={modalContent} class="flex justify-end gap-2 md:gap-4">
			<a
				on:click|preventDefault={closeModal}
				href="/product-request/{productRequest.id}"
				class="leading-normal button--gray">Cancel</a
			>
			<button
				on:click={() => {
					deleteProductRequest($page.params.id)
					goto('/')
				}}
				formaction="?/delete"
				class="leading-normal button--red ">Delete</button
			>
		</div>
	</div>
</div>
