<script lang="ts">
	import Card from 'svelte-material-components/src/components/Card';
	import Button from 'svelte-material-components/src/components/Button';
	import Row from 'svelte-material-components/src/components/Grid/Row.svelte';
	import CardText from 'svelte-material-components/src/components/Card/CardText.svelte';
	import CardTitle from 'svelte-material-components/src/components/Card/CardTitle.svelte';
	import CardActions from 'svelte-material-components/src/components/Card/CardActions.svelte';
</script>

<Card>
	<CardTitle>
		<h4>Form</h4>
	</CardTitle>
	<CardText>
		<Row>
			<!--  -->
		</Row>
	</CardText>
	<CardActions class="justify-end">
		<Button on:click={close} text>Save</Button>
		<Button on:click={close} text class="red-text">Close</Button>
	</CardActions>
</Card>

<style>
</style>
