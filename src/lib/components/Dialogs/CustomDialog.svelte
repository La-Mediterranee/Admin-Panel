<script>
	import Dialog from 'svelte-material-components/src/components/Dialog';

	import dialog from '$lib/stores/dialog';

	export let component: any;
</script>

<Dialog bind:active={$dialog} fullscreen>
	<svelte:component this={component} />
</Dialog>

<style>
	/* your styles go here */
</style>
