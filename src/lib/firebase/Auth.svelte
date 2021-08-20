<script lang="ts">
	import { user } from './auth';
	import { onMount, createEventDispatcher, setContext } from 'svelte';

	import type { Unsubscriber } from 'svelte/store';

	let unsub: Unsubscriber = () => {};

	const dispatch = createEventDispatcher();

	setContext('user', {
		getAuth: () => user
	});

	onMount(() => {
		unsub = user.subscribe((user) => {
			dispatch('user', user);
		});

		return () => {
			unsub();
		};
	});
</script>

<slot user={$user} auth={user?.auth} />
