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
	import List from 'svelte-material-components/src/components/List/List.svelte';
	import ListItem from 'svelte-material-components/src/components/List/ListItem.svelte';
	import ListItemGroup from 'svelte-material-components/src/components/List/ListItemGroup.svelte';
	import Select from 'svelte-material-components/src/components/Select/Select.svelte';

	import mobile from '$lib/stores/mobile';

	export let table: Table;

	export let categories: Map<string, Product[] | null> = new Map();

	export let value: string | null = null;

	function addCategory(category: string) {}

	const addButton = 'Produkt hinzufügen';
	const emptyCategoryMsg = 'Noch keine Produkte in der Kategorie';
	const unselectedMsg = 'Keine Kategorie ausgewählt';
	const categorySelect = 'Kategorie wählen';

	let start: number, end: number;

	function selectRow(e: Event) {
		const target = e.target as HTMLElement;
		const row = target?.closest<HTMLTableRowElement>('.virtual-table-row');
		const products = categories.get(value || '') || [];
		// I used the unary operator because it is shorter than Number() and does the same thing
		const product = products[+(row?.dataset.index as string) || 0];
		console.log(product);
	}
</script>

<Card style="max-width: 1000px;width:100%;" class="pb-4 elevation-24" outlined raised>
	<div class="card-header">
		<Row class="w-100">
			<TextField outlined dense>
				<span slot="prepend">
					<Icon path={mdiMagnify} />
				</span>
				Produkt suchen
			</TextField>
			<Button style="height: 100%" class="ml-5 pl-5 pr-5 pt-3 pb-3">{addButton}</Button>
		</Row>
		<Row class="w-100">
			{#await table.tableData then tableData}
				{#if tableData?.length}
					<h6>Gefundene Produkte: {tableData?.length}</h6>
				{/if}
			{/await}
		</Row>
	</div>
	<div class="card-body">
		<Row class="justify-center">
			<!-- style="border-right: 1px solid white; padding: 0" -->
			{#if $mobile === false}
				<div class="categories-container">
					<List class="categories" outlined rounded>
						<ListItemGroup class="mobile-categories" bind:value>
							{#each [...categories.keys()] as category}
								<ListItem value={category}>
									<button>{category}</button>
								</ListItem>
							{/each}
						</ListItemGroup>
					</List>
				</div>
			{:else if $mobile === true}
				<Select bind:value outlined items={[...categories.keys()]}>
					{categorySelect}
				</Select>
			{/if}

			<div class="data-container">
				{#await table.tableData then tableData}
					{#if tableData}
						<DataTable class="w-100">
							<DataTableHead>
								<DataTableRow>
									{#each table.tableHead as head}
										<DataTableCell class={head.classes}>
											{head.title}
										</DataTableCell>
									{/each}
								</DataTableRow>
							</DataTableHead>
							<!-- 
								Because virtual table body removes and adds elements to the DOM the native
								rowIndex and sectionIndex attributes will not work correctly. That's why the
								we have the data-index attribute
							-->
							<VirtualDataTableBody
								style="cursor: pointer;"
								items={tableData}
								bind:start
								bind:end
								let:item
								on:click={selectRow}
							>
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
								<DataTableCell class="product-actions pt-2 pb-2">
									<Button style="position:relative;" icon>
										<Icon path={mdiTrashCan} />
									</Button>
								</DataTableCell>
							</VirtualDataTableBody>
						</DataTable>
					{:else if value == null}
						<div class="d-flex justify-center align-center">
							{unselectedMsg}
						</div>
					{:else}
						<div class="d-flex justify-center align-center">
							{emptyCategoryMsg}
						</div>
					{/if}
				{/await}
			</div>
		</Row>
	</div>
</Card>

<style lang="scss">
	@use "variables.scss" as *;

	div {
		width: 100%;
	}

	.card-header {
		display: flex;
		gap: 0.65em;
		align-items: center;
		flex-wrap: wrap;
		flex-direction: column;
		margin-bottom: 0.85em;
		padding: 1em 1.4em 0 1.4em;
	}

	.card-body {
		padding: 0 1.4em 0 1.4em;

		:global(.s-tabs.active) {
			border: none;
		}
	}

	.categories-container,
	.data-container {
		min-height: 100%;
		height: calc(var(--card-container-height) - 80px);
	}

	.data-container {
		padding-top: 1.2em;
		display: flex;
		justify-content: center;
		max-width: 750px;
	}

	.categories-container {
		max-width: 10em;
		overflow-y: auto;
	}

	// @media (min-width: $sm) {
	// 	.card-header {
	// 		flex-direction: row;
	// 	}
	// }

	@media (min-width: $bp) {
		.data-container {
			padding-top: 0;
		}
	}

	:global(.categories) {
		overflow: auto;
		display: flex;
		height: 100%;

		@media (min-width: $bp) {
			display: block;
		}
	}

	:global(.mobile-categories) {
		@media (max-width: $bp) {
			display: flex;
			max-width: initial;
			flex: initial;

			:global(.s-list-item) {
				flex: auto;
				margin-bottom: 8px;
			}
		}
	}
</style>
