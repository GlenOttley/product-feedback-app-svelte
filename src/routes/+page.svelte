<script lang="ts">
	import MobileHeader from '$components/MobileHeader.svelte'
	import SortBar from '$components/SortBar.svelte'
	import ProductRequestOverview from '$lib/components/ProductRequestOverview.svelte'
	import Filters from '$components/Filters.svelte'
	import HeaderBadge from '$components/HeaderBadge.svelte'
	import RoadmapOverview from '$lib/components/RoadmapOverview.svelte'
	import EmptyRequests from '$lib/components/EmptyRequests.svelte'
	import { filters, productRequests } from '$lib/stores'
	import { filterProductRequests } from '$lib/utils/filterProductRequests'

	$: filteredProductRequests = filterProductRequests($productRequests, $filters)
</script>

<div class="mb-[55px] md:mb-[113px] lg:mb-[129px]">
	<div class="md:hidden">
		<MobileHeader />
		<SortBar />
	</div>
	<div class="lg:container lg:flex lg:gap-[30px] lg:mt-[94px]">
		<div
			class="hidden container mt-14 md:grid grid-cols-3 gap-6 mb-10 lg:flex lg:flex-col lg:max-w-[255px] lg:m-0 lg:p-0 "
		>
			<HeaderBadge />
			<Filters />
			<RoadmapOverview />
		</div>

		<div class="lg:w-full">
			<div class="container hidden md:block lg:max-w-none lg:p-0">
				<SortBar />
			</div>

			<div class="container flex flex-col gap-4 lg:max-w-none lg:p-0">
				{#if filteredProductRequests.length}
					{#each filteredProductRequests as productRequest (productRequest.id)}
						<ProductRequestOverview {productRequest} />
					{/each}
				{:else}
					<EmptyRequests />
				{/if}
			</div>
		</div>
	</div>
</div>
