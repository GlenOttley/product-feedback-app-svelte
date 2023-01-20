<script>
	import ArrowLeftIcon from '$assets/shared/icon-arrow-left-white.svg'
</script>

<header class="md:container md:mt-14 md:mb-8">
	<div class="bg-gray-600 md:rounded-[10px]">
		<div class="container flex justify-between py-7 lg:py-[14px]">
			<div class="flex flex-col">
				<a href="/" class="flex items-center gap-4 text-xs font-bold text-white">
					<img src={ArrowLeftIcon} alt="" />
					Go Back
				</a>
				<h1 class="text-lg text-white font-bold">Roadmap</h1>
			</div>
			<a
				href="/product-request/new"
				class="px-4 py-2 text-xs bg-purple-200 leading-6 button whitespace-nowrap"
			>
				+ Add Feedback</a
			>
		</div>
	</div>
</header>
