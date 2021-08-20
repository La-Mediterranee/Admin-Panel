<script context="module">
	import { HEADER } from '../__layout.svelte';

	export interface Product {
		name: string;
		imgUrl: string;
		price: number;
	}

	export interface Table {
		tableHead: { title: string; classes: string | undefined }[];
		tableData: Promise<Product[] | null> | null;
	}

	import type { Writable } from 'svelte/store';
</script>

<script lang="ts">
	import { getContext, onMount } from 'svelte';

	import Tabs from 'svelte-material-components/src/components/Tabs/Tabs.svelte';
	import Tab from 'svelte-material-components/src/components/Tabs/Tab.svelte';
	import Food from '$lib/components/dashboard/products/Food.svelte';
	import TabContent from 'svelte-material-components/src/components/Tabs/TabContent.svelte';
	import Drinks from '$lib/components/dashboard/products/Drinks.svelte';

	let controller: AbortController;

	const header = getContext<Writable<string>>(HEADER);
	$header = 'Produkte';

	let value: string | null = null;
	let foodCategories: Map<string, Product[] | null> = new Map();
	const min = 2;
	const max = 30;

	['Populär', 'Burger', 'Fleisch', 'Farm', 'Gemüse', 'Pizza', 'Suppen', 'Salate'].forEach((c) => {
		foodCategories.set(
			c,
			Array(Math.floor(Math.random() * (max - min) + min)).fill({
				imgUrl: 'https://via.placeholder.com/100',
				name: 'placeholder',
				price: 0
			})
		);
	});

	foodCategories.set('Fish', [
		{
			imgUrl: 'https://via.placeholder.com/100',
			name: 'placeholder',
			price: 0
		},
		{
			imgUrl: 'https://via.placeholder.com/100',
			name: 'placeholder',
			price: 0
		}
	]);

	foodCategories.set('Früchte', null);

	$: foodTable.tableData = fetchProducts(value as string, controller?.signal);

	onMount(() => {
		controller = new AbortController();
		// get all categories from db and show them
		// lazy load for each category, if on is tabed load the products of that category
		/*
            const cat: string[] = fetch("categories")
            cat.forEach((c)=> {
                categories.set(c, null)
            })
        */

		return () => {
			controller.abort();
		};
	});

	async function fetchProducts(category: string, signal: AbortSignal) {
		const products = foodCategories.get(category);
		console.log(products);

		if (products !== null) {
			return products as Product[];
		}

		// get category from db and add it to the Map
		fetch('', {
			signal
		});

		return null;
	}

	function addCategory(category: string) {}

	const productTabs = ['Essen', 'Getränke'];

	const foodTable: Table = {
		tableHead: [
			{
				title: 'Bild',
				classes: 'product-image md-and-down'
			},
			{
				title: 'Name',
				classes: 'product-name'
			},
			{
				title: 'Preis',
				classes: 'product-price sm-and-down'
			},
			{
				title: 'Actions',
				classes: 'product-actions'
			}
		],
		tableData: null
	};

	const drinksTable: Table = {
		tableHead: [
			{
				title: 'Bild',
				classes: 'product-image md-and-down'
			},
			{
				title: 'Name',
				classes: 'product-name'
			},
			{
				title: 'Preis',
				classes: 'product-price sm-and-down'
			},
			{
				title: 'Actions',
				classes: 'product-actions'
			}
		],
		tableData: Promise.resolve([
			{
				imgUrl: 'https://via.placeholder.com/100',
				name: 'placeholder',
				price: 0
			}
		])
	};
</script>

<Tabs class="no-bg">
	<div slot="tabs">
		{#each productTabs as tab}
			<Tab>{tab}</Tab>
		{/each}
	</div>
	<TabContent class="pt-7">
		<div class="card-container">
			<Food bind:value table={foodTable} categories={foodCategories} />
		</div>
	</TabContent>
	<TabContent class="pt-7">
		<div class="card-container">
			<Drinks drinks={drinksTable} />
		</div>
	</TabContent>
</Tabs>

<style lang="scss" global>
	@use "variables.scss" as *;

	.card-container {
		--card-container-height: 520px;
		--theme-cards: var(--theme-dividers);
		--theme-th-height: 56px;
		display: flex;
		justify-content: center;
		width: 100%;
	}

	.justify-content-start {
		justify-content: flex-start;
	}

	table {
		table-layout: fixed;
		width: 100%;
		height: 100%;
	}

	thead {
		display: block;
		width: 100%;

		tr {
			display: flex;
			align-items: center;
			overflow: hidden;
		}

		th {
			display: flex;
			align-items: center;
		}
	}

	.product-image {
		width: 30%;
	}

	.product-name {
		width: 60%;
	}

	.product-price {
		width: 20%;
	}

	.product-actions {
		width: 40%;
	}

	@media (min-width: $bp) {
		.s-row {
			flex-wrap: nowrap;
		}
	}

	@media (min-width: $sm) {
		.product-actions {
			width: 20%;
		}
	}

	@media (min-width: $md) {
		.product-name {
			width: 30%;
		}
	}

	@media screen and (max-width: $sm) {
		.sm-and-down {
			display: none !important;
		}
	}

	@media screen and (max-width: $md) {
		.md-and-down {
			display: none !important;
		}
	}
</style>
