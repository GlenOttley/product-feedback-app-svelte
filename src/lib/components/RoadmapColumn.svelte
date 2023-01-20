<script>
	import ProductRequestRoadmap from '$components/ProductRequestRoadmap.svelte'
	import { fly } from 'svelte/transition'

	export let status
</script>

<div in:fly={{ x: 200, duration: 400 }}>
	<h2 class="mb-1 text-lg font-bold text-gray-500 md:text-[14px]">
		{status.title}
		({status.productRequests.length})
	</h2>
	<h3 class="text-xs text-gray-400 mb-6 md:text-[14px]">{status.description}</h3>
	<div class="flex flex-col gap-4">
		{#each status.productRequests as productRequest (productRequest.id)}
			<ProductRequestRoadmap {productRequest} color={status.color} />
		{/each}
	</div>
</div>
