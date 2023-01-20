<script>
	export let statusObj
	export let pageStatus
</script>

<nav class="relative border-b border-gray-300 ">
	<ul class="container flex relative justify-between items-center">
		{#each Object.values(statusObj) as status}
			<li class="flex flex-col w-full">
				<a
					href="/roadmap?status={status.slug}"
					class="text-xs font-bold text-center py-4 w-full cursor-pointer 
        {status.slug === pageStatus ? 'text-gray-500' : 'text-gray-300'}"
					>{status.title} ({status.productRequests.length})</a
				>
				{#if status.slug === pageStatus}
					<span class="h-1 w-full bg-{status.color}" />
				{:else}
					<span class="h-1 w-full bg-transparent" />
				{/if}
			</li>
		{/each}
	</ul>
</nav>
