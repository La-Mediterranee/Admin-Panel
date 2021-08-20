<script context="module">
	export const HEADER = 'header';
</script>

<script lang="ts">
	import { browser } from '$app/env';
	import { onMount, setContext } from 'svelte';

	import { user } from '$lib/firebase/auth';

	import Nav from '$lib/components/Nav/Nav.svelte';
	import { writable } from 'svelte/store';

	let lastPath: string;
	let run = true;

	const header = writable('');

	setContext(HEADER, header);

	onMount(() => {
		lastPath = `lastPath=${window.location.pathname}`;
		run = false;
		console.log(lastPath);

		// const mq = window.matchMedia('(min-width: 960px)');
		// active = mq.matches;
		// mq.addEventListener('change', (e) => {
		// 	active = e.matches ? true : false;
		// });
	});

	$: admin = $user;
</script>

<Nav />
<main>
	<h1 class="header text-h4">{$header}</h1>
	{#if admin}
		<slot />
	{/if}
</main>

<style lang="scss">
	.header {
		padding: 0 0 1em 0;
	}

	main {
		margin-left: var(--s-nav-min-width);
		min-height: 100vh;
		padding: 1.5em;
	}
</style>
