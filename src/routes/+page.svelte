<script lang="ts">
	import MobileHeader from '$components/MobileHeader.svelte'
	import type ProductRequest from '$types/ProductRequest'

	export let data

	const productRequests: ProductRequest[] = data
</script>

<MobileHeader />

<!-- {#each $filteredProductRequests as productRequest}
	<h2>{productRequest.title}</h2>
{/each} -->

{#each productRequests as productRequest}
	<h2>{productRequest.title}</h2>
{/each}
