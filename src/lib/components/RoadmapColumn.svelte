<script>
	import ProductRequestRoadmap from '$components/ProductRequestRoadmap.svelte'
	import { fly } from 'svelte/transition'

	export let status

	const { productRequests, title, description, borderColor, bgColor } = status
</script>

<div class="-translate-x-0" in:fly={{ x: 400, duration: 400 }}>
	<h2 class="mb-1 text-lg font-bold text-gray-500 md:text-[14px]">
		{title}
		({productRequests.length})
	</h2>
	<h3 class="text-xs text-gray-400 mb-6 md:text-[14px]">{description}</h3>
	<div class="flex flex-col gap-4">
		{#each productRequests as productRequest (productRequest.id)}
			<ProductRequestRoadmap {productRequest} {borderColor} {bgColor} />
		{/each}
	</div>
</div>
