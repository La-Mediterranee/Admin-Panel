import { getContext } from 'svelte';

import type { Auth } from 'firebase/auth';
import type { FirebaseApp } from 'firebase/app';
import type { Unsubscriber, Subscriber } from 'svelte/store';

declare type Invalidator<T> = (value?: T) => void;

interface FirebaseUser {
	subscribe: (
		this: void,
		run: Subscriber<any>,
		invalidate?: Invalidator<any> | undefined
	) => Unsubscriber;
	logOut: () => Promise<void>;
	auth: Auth;
}

interface FirebaseContext {
	getFirebase: () => FirebaseApp;
}

interface FirebaseAuthContext {
	getAuth: () => FirebaseUser;
}

export function getFirebaseContext() {
	return getContext<FirebaseContext>('firebase').getFirebase();
}

export function getAuthContext() {
	return getContext<FirebaseAuthContext>('user')?.getAuth();
}
