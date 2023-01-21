<script>
	export let statusObj
	export let pageStatus
</script>

<nav class="relative border-b border-gray-300 ">
	<ul class="container relative flex items-center justify-between">
		{#each Object.values(statusObj) as status}
			<li class="flex flex-col w-full">
				<a
					href="/roadmap?status={status.slug}"
					class="text-xs font-bold text-center py-4 w-full cursor-pointer 
        {status.slug === pageStatus ? 'text-gray-500' : 'text-gray-300'}"
					>{status.title} ({status.productRequests.length})</a
				>
				<!-- TODO make this bottom border element transition -->
				{#if status.slug === pageStatus}
					<span class="h-1 w-full {status.bgColor}" />
				{:else}
					<span class="w-full h-1 bg-transparent" />
				{/if}
			</li>
		{/each}
	</ul>
</nav>
