<script lang="ts">
	import { onMount } from 'svelte';
	import { getAuthContext } from '$lib/firebase/helpers';
	import { select } from 'd3-selection';

	import type { Selection } from 'd3-selection';

	const user = getAuthContext();
	// console.log($user);

	let svg: SVGElement;
	let path: Selection<SVGPathElement, unknown, null, undefined>;

	onMount(() => {
		path = select(svg).append('path').attr('fill', 'none');
	});
</script>

<div>
	<svg bind:this={svg} width="300" height="300">
		<line
			x1="100"
			y1="100"
			x2="200"
			y2="200"
			style="stroke:rgb(255,0,0);
		stroke-width:2"
		/>
	</svg>
</div>

<style>
	div {
		width: 60%;
	}

	svg {
		border: 2px solid #ddd;
	}
</style>
