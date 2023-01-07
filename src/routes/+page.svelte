<script lang="ts">
	import MobileHeader from '$components/MobileHeader.svelte'
	import SortBar from '$components/SortBar.svelte'
	import ProductRequest from '$components/ProductRequest.svelte'
	import { filteredProductRequests } from '$lib/stores'
	import Filters from '$components/Filters.svelte'
	import HeaderBadge from '$components/HeaderBadge.svelte'
	import Roadmap from '$lib/components/Roadmap.svelte'
</script>

<div class="md:hidden">
	<MobileHeader />
	<SortBar />
</div>

<div class="hidden container mt-14 md:grid grid-cols-3 gap-[10px] mb-10">
	<HeaderBadge />
	<Filters />
	<Roadmap />
</div>

<div class="container hidden md:block">
	<SortBar />
</div>

<div class="container flex flex-col gap-4">
	{#each $filteredProductRequests as productRequest (productRequest.id)}
		<!-- <a href="/product-request/{productRequest.id}"> -->
		<ProductRequest {productRequest} />
		<!-- </a> -->
	{/each}
</div>
