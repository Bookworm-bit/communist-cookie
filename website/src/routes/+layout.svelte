<script>
	import '../app.css';
</script>

<div class="flex flex-col">
	<nav class="flex justify-center pt-8">
		<ul class="flex gap-8 rounded-lg border px-6 py-3 font-['Poppins']">
			<li><a href="/" class="hover:underline">Community Jar</a></li>
			<li><a href="/ranked" class="hover:underline">Leaderboard</a></li>
			<li><a href="/shelf" class="hover:underline">Cookie Shelf</a></li>
		</ul>
	</nav>

	<main class="flex flex-grow flex-col items-center justify-center font-['Poppins']">
		<h1 class="mt-8 text-balance px-8 text-center font-['DM_Serif_Text'] text-3xl">
			Cookie Blocked Sites Data
		</h1>
		<p class="px-4">Block distracting sites and see how many sites others users have blocked.</p>
		<slot></slot>
	</main>

	<footer class="py-4">
		<p class="text-center font-['DM_Serif_Text'] text-lg">Built for HacKnight 2024</p>
	</footer>
</div>
