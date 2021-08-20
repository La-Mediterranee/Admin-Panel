<script context="module" lang="ts">
	import { firebase } from '$lib/utils/constants';

	import type { User } from 'firebase/auth';
</script>

<script lang="ts">
	import MaterialApp from 'svelte-material-components/src/components/MaterialApp/MaterialApp.svelte';

	import { FirebaseApp as Firebase, Auth } from '$lib/firebase';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { browser, dev } from '$app/env';

	let lastPath: string;
	let run = true;

	if (browser) {
		window.onunhandledrejection = (e) => {
			console.log('we got exception, but the app has crashed', e);
			// here we should gracefully show some fallback error or previous good known state

			// todo: This is unexpected error, send error to log server
			// only way to reload page so that users can try again until error is resolved
			// uncomment to reload page:
			// window.location = "/";
		};

		console.log(run);
		if (run) {
			lastPath = `lastPath=${window.location.pathname}`;
			run = false;
		}
	}

	function navigate({ detail }: { detail: User | null }) {
		console.log(lastPath);

		if (detail) {
			goto(
				$page.path !== '/login'
					? $page.path !== '/signup'
						? $page.path
						: '/dashboard'
					: '/dashboard'
			);
		} else {
			goto('/login');
		}
	}
</script>

<svelte:head>
	{#if !dev}
		<script
			src="https://polyfill.io/v3/polyfill.min.js?features=AbortController%2Cfetch%2CResizeObserver"></script>
	{/if}
</svelte:head>

<Firebase {firebase}>
	<Auth on:user={navigate}>
		<MaterialApp theme="dark">
			<slot />
		</MaterialApp>
	</Auth>
</Firebase>

<style global>
	@import 'app.scss';
</style>
