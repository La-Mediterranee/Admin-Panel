import { writable } from 'svelte/store';

export default function dialog() {
	const store = writable<Svelte2TsxComponent | null>(null);

	const { set, subscribe } = store;

	function openDialog(component: Svelte2TsxComponent) {
		set(component);
	}

	function closeDialog() {
		set(null);
	}

	return {
		subscribe,
		openDialog,
		closeDialog
	};
}
