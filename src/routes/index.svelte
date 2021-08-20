<script context="module" lang="ts">
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';

	// export function load({ page, fetch, session, context }: LoadInput) {}
</script>

<script lang="ts">
	import LoadingScreen from '$lib/components/LoadingScreen';
</script>

<LoadingScreen />
