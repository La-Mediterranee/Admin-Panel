<script>
	import Login from '$lib/components/Login/Login.svelte';

	import { getAuthContext } from '$lib/firebase/helpers';

	const user = getAuthContext();
</script>

<main>
	<Login auth={user?.auth} />
</main>

<style>
	main {
		min-height: 100vh;
	}
</style>
