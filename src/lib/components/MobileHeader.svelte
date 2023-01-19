<script lang="ts">
	import iconHamburger from '$assets/shared/mobile/icon-hamburger.svg'
	import iconClose from '$assets/shared/mobile/icon-close.svg'
	import { onMount } from 'svelte'
	import { horizontalSlide } from '$lib/utils/transitions'
	import { fade } from 'svelte/transition'
	import Filters from './Filters.svelte'
	import RoadmapOverview from './RoadmapOverview.svelte'
	import type { PageData } from '../../routes/$types'

	// TODO fix issue with nav opening automatically when this menuOpen=true
	// try using tailwind peer/group methods to show/hide the nav
	let menuOpen = false

	onMount(() => (menuOpen = false))

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
			><img src={menuOpen ? iconClose : iconHamburger} alt="menu" /></label
		>
		<input id="toggle" type="checkbox" class="sr-only" bind:checked={menuOpen} use:enhance />

		{#if menuOpen}
			<nav
				transition:fade
				class="nav fixed top-[72px] right-0 w-full h-full bg-black bg-opacity-60 z-50"
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

<style>
	#toggle ~ nav {
		display: none;
	}

	#toggle:checked ~ nav {
		display: block;
	}
</style>
