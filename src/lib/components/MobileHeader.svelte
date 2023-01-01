<script>
	import iconHamburger from '$assets/shared/mobile/icon-hamburger.svg';
	import { onMount } from 'svelte';
	import { horizontalSlide } from '$lib/utils/transitions';
	import { fade } from 'svelte/transition';

	let menuOpen = true;

	onMount(() => (menuOpen = false));

	const defaults = {
		classname: 'js'
	};

	/**
	 * @param {HTMLInputElement} node
	 */
	function enhance(node, options = {}) {
		const { classname } = { ...defaults, ...options };

		node.classList.add(classname);
	}
</script>

<div class="bg-[url('src/lib/assets/suggestions/mobile/background-header.png')] bg-no-repeat">
	<div class="container py-4 flex justify-between items-center">
		<header>
			<h1 class="text-sm text-white font-bold tracking-[-0.19px]">Frontend Mentor</h1>
			<h2 class="text-xs text-white tracking-normal">Feedback Board</h2>
		</header>
		<label for="toggle" class="cursor-pointer"><img src={iconHamburger} alt="menu" /></label>
		<input id="toggle" type="checkbox" class="sr-only" bind:checked={menuOpen} use:enhance />

		{#if menuOpen}
			<nav
				transition:fade
				class="nav fixed top-[72px] right-0 w-full h-full bg-black bg-opacity-60"
			>
				<div
					transition:horizontalSlide={{ axis: 'x', duration: 800 }}
					class="absolute bg-gray-100 w-[271px] right-0 h-screen"
				>
					<ul id="navigation-drawer">
						<li><a href="/">One</a></li>
						<li><a href="/">Two</a></li>
						<li><a href="/">Three</a></li>
					</ul>
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
