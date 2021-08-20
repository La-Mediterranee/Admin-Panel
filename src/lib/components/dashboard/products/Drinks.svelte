<script context="module">
	import { mdiMagnify, mdiTrashCan } from '@mdi/js';

	import type { Product, Table } from 'src/routes/dashboard/products/index.svelte';
</script>

<script lang="ts">
	import VirtualDataTableBody from 'svelte-material-components/src/components/DataTable/VirtualDataTableBody.svelte';

	import Button from 'svelte-material-components/src/components/Button';
	import Card from 'svelte-material-components/src/components/Card';
	import Row from 'svelte-material-components/src/components/Grid/Row.svelte';
	import Icon from 'svelte-material-components/src/components/Icon/Icon.svelte';
	import DataTable from 'svelte-material-components/src/components/DataTable/DataTable.svelte';
	import DataTableCell from 'svelte-material-components/src/components/DataTable/DataTableCell.svelte';
	import DataTableHead from 'svelte-material-components/src/components/DataTable/DataTableHead.svelte';
	import DataTableRow from 'svelte-material-components/src/components/DataTable/DataTableRow.svelte';
	import TextField from 'svelte-material-components/src/components/TextField/TextField.svelte';

	export let drinks: Table;

	function addCategory(category: string) {}

	const addButton = 'Produkt hinzufügen';
	const emptyDrinksMsg = 'Noch keine Getänke';
</script>

<Card style="max-width: 1000px;" class="pb-4 elevation-24" outlined raised>
	<div class="card-header">
		<TextField outlined dense>
			<span slot="prepend">
				<Icon path={mdiMagnify} />
			</span>
			Produkt suchen
		</TextField>
		<Button style="height: 100%" class="pl-5 pr-5 pt-3 pb-3">{addButton}</Button>
	</div>
	<div class="card-body">
		<Row class="justify-center">
			<!-- style="border-right: 1px solid white; padding: 0" -->
			<div class="data-container">
				{#await drinks.tableData then tableData}
					{#if tableData}
						<DataTable>
							<DataTableHead>
								<DataTableRow>
									{#each drinks.tableHead as head}
										<DataTableCell class={head.classes}>
											{head.title}
										</DataTableCell>
									{/each}
								</DataTableRow>
							</DataTableHead>
							<VirtualDataTableBody items={tableData} let:item>
								<DataTableCell class="product-image md-and-down pt-2 pb-2">
									<img
										src={item.imgUrl}
										height=""
										width=""
										decoding="async"
										alt=""
									/>
								</DataTableCell>
								<DataTableCell class="product-name pt-2 pb-2">
									{item.name}
								</DataTableCell>
								<DataTableCell class="product-price sm-and-down pt-2 pb-2">
									{item.price}
								</DataTableCell>
								<DataTableCell class="pt-2 pb-2">
									<Button style="position:relative;" icon>
										<Icon path={mdiTrashCan} />
									</Button>
								</DataTableCell>
							</VirtualDataTableBody>
						</DataTable>
					{:else}
						<div class="d-flex justify-center align-center">
							{emptyDrinksMsg}
						</div>
					{/if}
				{/await}
			</div>
		</Row>
	</div>
</Card>

<style lang="scss">
	@use "variables.scss" as *;

	$bp: 710px;

	div {
		width: 100%;
	}

	.card-header {
		display: flex;
		gap: 0.65em;
		align-items: center;
		flex-direction: column;
		margin-bottom: 0.85em;
		padding: 1em 1.4em 0 1.4em;
	}

	.card-body {
		padding: 1em 1.4em 0 1.4em;

		:global(.s-tabs.active) {
			border: none;
		}
	}

	.data-container {
		padding-top: 1.2em;
		min-width: 400px;
		height: calc(var(--card-container-height) - 105px);
		display: flex;
		justify-content: center;
	}

	@media (min-width: $sm) {
		.card-header {
			flex-direction: row;
		}
	}

	@media (min-width: $bp) {
		.data-container {
			padding-top: 0;
		}
	}

	@media (min-width: $md) {
		.data-container {
			min-width: 600px;
			max-width: 750px;
		}
	}
</style>
