<script lang="ts">
	let cookies = [
		{
			name: 'instagram',
			color: 'red'
		}
	];
</script>

<div class="font-['DM_Mono']">
	{#each cookies as cookie}
		<div class="{cookie.color === 'red' ? 'bg-red-200' : 'bg-amber-800'} rounded-full p-8">
			{cookie.name}
		</div>
	{:else}
		<!-- empty list -->
	{/each}
</div>
