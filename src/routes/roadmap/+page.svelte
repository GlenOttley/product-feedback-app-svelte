<script>
	import RoadmapHeader from '$components/RoadmapHeader.svelte'
	import RoadmapNav from '$lib/components/RoadmapNav.svelte'
	import RoadmapColumn from '$components/RoadmapColumn.svelte'
	import { productRequests } from '$lib/stores'
	import { filterByStatus } from '$lib/utils/filterProductRequests'
	import { page } from '$app/stores'

	$: pageStatus = $page.url.search.split('=')[1] || 'in-progress'

	const statusObj = {
		planned: {
			title: 'Planned',
			slug: 'planned',
			description: 'Ideas prioritized for research',
			productRequests: filterByStatus($productRequests, 'planned'),
			color: 'orange-100'
		},
		'in-progress': {
			title: 'In-Progress',
			slug: 'in-progress',
			description: 'Currently being developed',
			productRequests: filterByStatus($productRequests, 'in-progress'),
			color: 'purple-200'
		},
		live: {
			title: 'Live',
			slug: 'live',
			description: 'Released features',
			productRequests: filterByStatus($productRequests, 'live'),
			color: 'blue-200'
		}
	}
</script>

<RoadmapHeader />
<main class="md:hidden ">
	<RoadmapNav {statusObj} {pageStatus} />
	<div class="pt-6 container">
		{#each Object.values(statusObj) as status}
			{#if status.slug === pageStatus}
				<RoadmapColumn status={statusObj[pageStatus]} />
			{/if}
		{/each}
	</div>
</main>
<main class="hidden md:grid grid-cols-3 gap-x-[10px] container">
	{#each Object.values(statusObj) as status}
		<RoadmapColumn status={statusObj[status.slug]} />
	{/each}
</main>
