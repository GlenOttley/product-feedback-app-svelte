<script lang="ts">
	import iconHamburger from '$assets/shared/mobile/icon-hamburger.svg'
	import iconClose from '$assets/shared/mobile/icon-close.svg'
	import { horizontalSlide } from '$lib/utils/transitions'
	import { fade } from 'svelte/transition'
	import Filters from './Filters.svelte'
	import RoadmapOverview from './RoadmapOverview.svelte'
	import { browser } from '$app/environment'

	let menuOpen = false

	const defaults = {
		classname: 'js'
	}

	/**
	 * @param {HTMLInputElement} node
	 */
	function enhance(node: HTMLInputElement, options = {}) {
		const { classname } = { ...defaults, ...options }

		node.classList.add(classname)
	}
</script>

<div class="bg-[url('/mobile/background-header.png')] bg-cover bg-no-repeat">
	<div class="container flex items-center justify-between py-4">
		<header>
			<h1 class="text-sm text-white font-bold tracking-[-0.19px]">Frontend Mentor</h1>
			<h2 class="text-xs tracking-normal text-white">Feedback Board</h2>
		</header>
		<label for="toggle" class="cursor-pointer"
			><img
				src={!browser ? iconHamburger : menuOpen ? iconClose : iconHamburger}
				alt="menu"
			/></label
		>
		<input id="toggle" type="checkbox" class="sr-only peer" bind:checked={menuOpen} use:enhance />

		{#if menuOpen || !browser}
			<nav
				transition:fade
				class="nav fixed top-[72px] right-0 w-full h-full bg-black bg-opacity-60 z-50 hidden peer-checked:block "
			>
				<div
					transition:horizontalSlide={{ axis: 'x', duration: 800 }}
					class="absolute bg-gray-100 w-[271px] right-0 h-screen container py-6 flex flex-col gap-6"
				>
					<Filters />
					<RoadmapOverview />
				</div>
			</nav>
		{/if}
	</div>
</div>
