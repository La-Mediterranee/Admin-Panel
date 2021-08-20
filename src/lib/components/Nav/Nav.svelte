<script context="module">
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';

	import {
		mdiAccount,
		mdiAccountGroup,
		mdiCash,
		mdiCashRegister,
		mdiDomain,
		mdiFinance,
		mdiFirebase,
		mdiFood,
		mdiGoogleMyBusiness,
		mdiHomeCity,
		mdiLogout,
		mdiMenu,
		mdiStore
	} from '@mdi/js';
</script>

<script lang="ts">
	import { user } from '$lib/firebase/auth';
	import List from 'svelte-material-components/src/components/List';
	import Avatar from 'svelte-material-components/src/components/Avatar';
	import Button from 'svelte-material-components/src/components/Button';
	import Icon from 'svelte-material-components/src/components/Icon/Icon.svelte';
	import ListItem from 'svelte-material-components/src/components/List/ListItem.svelte';
	import NavigationDrawer from 'svelte-material-components/src/components/NavigationDrawer';
	// <a target="_blank" href="https://icons8.com/icon/87195/home-address">Home Address</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
	import { onMount } from 'svelte';

	let active = true;
	let mini = true;

	function mouseenter() {
		mini = false;
	}

	function mouseleave() {
		mini = true;
	}

	onMount(() => {
		// const mq = window.matchMedia('(min-width: 960px)');
		// active = mq.matches;
		// mq.addEventListener('change', (e) => {
		// 	active = e.matches ? true : false;
		// });
	});

	const navItems = Object.freeze([
		{
			title: 'Übersicht',
			icon: mdiFinance,
			href: '/dashboard'
		},
		{
			title: 'Bestellungen',
			icon: mdiCash, // mdiReceipt
			href: '/dashboard/orders'
		},
		{
			title: 'Produkte',
			icon: mdiFood, //mdiSilverware
			href: '/dashboard/products'
		},
		{
			title: 'Rechnung erstellen',
			icon: mdiCashRegister,
			href: '/dashboard/invoices'
		},
		{
			title: 'Account',
			icon: mdiAccount,
			href: '/dashboard/account'
		},
		{
			title: 'Kunden',
			icon: mdiAccountGroup,
			href: '/dashboard/invoices'
		},
		{
			title: 'Geschäft',
			icon: mdiStore, //mdiCity ,mdiDomain,mdiOfficeBuilding, mdiOfficeBuildingMarker, mdiGoogleMyBusiness, mdiStorefront
			href: '/dashboard/store'
		},
		{
			title: 'Firebase Einstellungen',
			icon: mdiFirebase,
			href: '/dashboard/firebase'
		}
	]);
</script>

<div class="drawer" on:mouseenter={mouseenter} on:mouseleave={mouseleave}>
	<NavigationDrawer style="height:100%; position fixed" {active} {mini}>
		<ListItem>
			<span slot="prepend" class="ml-n2">
				<Avatar size={40}><img src={$user?.photoURL || ''} alt="" /></Avatar>
			</span>
			{$user?.displayName}
		</ListItem>
		<span class="seperator" />
		<List dense nav>
			{#each navItems as item}
				<a href={item.href}>
					<ListItem>
						<span slot="prepend">
							<Icon path={item.icon} />
						</span>
						{item.title}
					</ListItem>
				</a>
			{/each}
		</List>
		<div slot="append" class="pa-2">
			<div id="logout">
				<Button style="position:relative;" block={!mini} icon={mini} on:click={user.logOut}>
					<Icon path={mdiLogout} />
					<!-- mdiExitToApp -->
					<!-- mdiLogoutVariant -->
					{#if !mini}
						Ausloggen
					{/if}
				</Button>
			</div>
		</div>
	</NavigationDrawer>
</div>

<style lang="scss">
	:global(.seperator) {
		height: 2px;
		width: 100%;
	}

	a {
		text-decoration: none;
	}

	.drawer {
		position: absolute;
		display: inline-block;
		height: 100%;
		z-index: 4;

		> div {
			height: 100%;
		}
	}

	#logout {
		display: flex;
		justify-content: center;
	}
</style>
