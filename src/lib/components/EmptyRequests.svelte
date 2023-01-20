<script>
	import noRequestsImage from '$assets/suggestions/illustration-empty.svg'
</script>

<div class="container bg-white rounded-[10px] flex flex-col justify-center items-center py-[76px]">
	<img
		src={noRequestsImage}
		alt="animated detective with magnifying glass"
		class="mb-10 md:w-[132px]"
	/>
	<h3
		class="text-lg font-bold text-gray-500 tracking-[-0.25px] mb-[14px] md:text-2xl md:tracking-[-0.33px]"
	>
		There is no feedback yet.
	</h3>
	<p class="mb-6 text-xs text-center text-gray-400 md:text-base md:tracking-normal">
		Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to
		improve our app.
	</p>
	<a
		href="/product-request/new"
		class="px-4 py-2 text-xs bg-purple-200 leading-6 button whitespace-nowrap">+ Add Feedback</a
	>
</div>
