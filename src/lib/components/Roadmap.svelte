<script lang="ts">
	import { productRequests } from '$lib/stores'

	const statusValues = [
		{
			name: 'planned',
			class: 'bg-orange-100'
		},
		{
			name: 'in-progress',
			class: 'bg-purple-200'
		},
		{
			name: 'live',
			class: 'bg-blue-200'
		}
	]
</script>

<aside class="container py-6  bg-white rounded-[10px]">
	<div class="flex items-center justify-between mb-6">
		<h3 class="text-lg font-bold text-gray-500 tracking-[-0.25px]">Roadmap</h3>
		<a href="/roadmap" class="text-xs font-semibold text-blue-400 underline">View</a>
	</div>
	<div class="flex flex-col gap-4 md:gap-2">
		{#each statusValues as statusValue}
			<div class="flex items-center justify-between">
				<div class="flex items-center">
					<span class="w-2 h-2 rounded-full {statusValue.class}" />
					<p class="pl-4 text-base text-gray-400 capitalize">{statusValue.name}</p>
				</div>
				<p class="text-base font-bold text-gray-400 ">
					{$productRequests.filter((request) => request.status === statusValue.name).length}
				</p>
			</div>
		{/each}
	</div>
</aside>
