<script lang="ts">
	import MobileHeader from '$components/MobileHeader.svelte'
	import SortBar from '$components/SortBar.svelte'
	import { filteredProductRequests } from '$lib/stores'
</script>

<MobileHeader />
<SortBar />

{#each $filteredProductRequests as productRequest}
	<h2>{productRequest.title}</h2>
{/each}
