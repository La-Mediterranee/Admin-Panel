import { readable } from 'svelte/store';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

import type { User, Auth } from 'firebase/auth';

export function authStore() {
	let auth: Auth;
	try {
		auth = getAuth();
	} catch (error) {
		console.error('authStore: ', error);
		throw new Error(error);
	}

	const logOut = () => signOut(auth);

	const cached = null;

	const store = readable<User | null>(cached, (set) => {
		if (typeof window !== 'undefined') {
			try {
				const idb = indexedDB.open('firebaseLocalStorageDb');
				idb.onsuccess = function () {
					this.result
						.transaction('firebaseLocalStorage')
						.objectStore('firebaseLocalStorage')
						.getAll().onsuccess = (e) => {
						const target = e.target as any;
						const user = target.result[0]?.value as User;
						set(user);
					};
				};
				idb.onerror = () => {};
				// ---------- Promise version of indexedDB ----------
				// new Promise((resolve, reject) => {
				// 	if (typeof window !== 'undefined') {
				// 		const idb = window.indexedDB.open('firebaseLocalStorageDb');
				// 		idb.onsuccess = function () {
				// 			this.result
				// 				.transaction('firebaseLocalStorage')
				// 				.objectStore('firebaseLocalStorage')
				// 				.getAll().onsuccess = resolve;
				// 		};
				// 		idb.onerror = reject;
				// 	}
				// }).then((e: Event) => {
				// 	console.log((e.target as any).result[0].value);
				// 	set((e.target as any).result[0].value as User);
				// });
			} catch (error) {
				console.error('idb: ', error);
			}
		}

		const teardown = onAuthStateChanged(auth || null, (user) => {
			try {
				set(user);
			} catch (error) {
				console.error('onAuthState: ', error);
				set(null);
			}
		});

		return () => teardown;
	});

	const { subscribe } = store;

	return {
		subscribe,
		logOut,
		auth
	};
}

export const user = authStore();
