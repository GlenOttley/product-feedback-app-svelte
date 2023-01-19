<script>
	import RoadmapHeader from '$components/RoadmapHeader.svelte'
	import { productRequests } from '$lib/stores'
	import { filterByStatus } from '$lib/utils/filterProductRequests'

	const planned = filterByStatus($productRequests, 'planned')
	const inProgress = filterByStatus($productRequests, 'in-progress')
	const live = filterByStatus($productRequests, 'live')
</script>

<RoadmapHeader />

<!-- <nav class="flex justify-between items-center container border-b border-gray-300">
	<div class="flex relative">
		<label for="planned-toggle" class="absolute inset-0 cursor-pointer" />
		<input id="planned-toggle" type="checkbox" class="sr-only peer/planned-toggle" />
		<span
			class="text-xs text-gray-300 font-bold text-center py-4 w-full border-b-4 border-transparent 
      peer-checked/planned-toggle:border-purple-100 peer-checked/planned-toggle:text-gray-500"
			>Planned ({planned.length})</span
		>
	</div>
	<div class="flex relative">
		<label for="in-progress-toggle" class="absolute inset-0 cursor-pointer" />
		<input id="in-progress-toggle" type="checkbox" class="sr-only peer/in-progress-toggle" />
		<span
			class="text-xs text-gray-300 font-bold text-center py-4 w-full border-b-4 border-transparent 
      peer-checked/in-progress-toggle:border-purple-100 peer-checked/in-progress-toggle:text-gray-500"
			>In-Progress ({inProgress.length})</span
		>
	</div>
	<div class="flex relative">
		<label for="planned-toggle" class="absolute inset-0 cursor-pointer" />
		<input id="planned-toggle" type="checkbox" class="sr-only peer/planned-toggle" />
		<span
			class="text-xs text-gray-300 font-bold text-center py-4 w-full border-b-4 border-transparent 
      peer-checked/planned-toggle:border-purple-100 peer-checked/planned-toggle:text-gray-500"
			>Planned ({planned.length})</span
		>
	</div>
</nav> -->

<ul class="relative border-b border-gray-300 ">
	<div class="container flex relative justify-between items-center">
		<li class="flex w-full">
			<input class="sr-only peer" type="radio" value="planned" name="status" id="status-planned" />
			<label
				class="text-xs text-gray-300 font-bold text-center py-4 w-full border-b-4 border-transparent cursor-pointer
        peer-checked:border-purple-200 peer-checked:text-gray-500 "
				for="status-planned">Planned ({planned.length})</label
			>
			<div
				class="hidden w-screen h-screen container absolute inset-0 peer-checked:block mt-[55px] pt-6"
			>
				<h2 class="text-lg font-bold text-gray-500">Planned ({planned.length})</h2>
			</div>
		</li>
		<li class="flex w-full">
			<input
				class="sr-only peer"
				type="radio"
				value="in-progress"
				name="status"
				id="status-in-progress"
			/>
			<label
				class="text-xs text-gray-300 font-bold text-center py-4 w-full border-b-4 border-transparent cursor-pointer
        peer-checked:border-purple-200 peer-checked:text-gray-500"
				for="status-in-progress">In-Progress ({inProgress.length})</label
			>
			<div
				class="hidden w-screen h-screen container absolute inset-0 peer-checked:block mt-[55px] pt-6"
			>
				<h2 class="text-lg font-bold text-gray-500">In-Progress ({inProgress.length})</h2>
			</div>
		</li>

		<li class="flex w-full">
			<input class="sr-only peer" type="radio" value="planned" name="status" id="status-live" />
			<label
				class="text-xs text-gray-300 font-bold text-center py-4 w-full border-b-4 border-transparent cursor-pointer
        peer-checked:border-purple-200 peer-checked:text-gray-500"
				for="status-live">Live ({live.length})</label
			>
			<div
				class="hidden w-screen h-screen container absolute inset-0 peer-checked:block mt-[55px] pt-6"
			>
				<h2 class="text-lg font-bold text-gray-500">Live ({live.length})</h2>
			</div>
		</li>
	</div>
</ul>
