import {
	signInWithPopup,
	signInWithEmailAndPassword,
	OAuthProvider,
	GoogleAuthProvider,
	GithubAuthProvider,
	getAdditionalUserInfo
} from 'firebase/auth';

import type { Auth } from 'firebase/auth';

interface AuthError {
	code: string;
	message: string;
}

export async function signIn(auth: Auth, email: string, password: string) {
	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		const user = userCredential.user;
		return { user, newUser: false };
	} catch (err: unknown) {
		const errorCode = (err as AuthError).code;
		const errorMessage = (err as AuthError).message;
		console.error(errorCode);
		console.error(errorMessage);
	}
}

export async function signInWithGoogle(auth: Auth) {
	const provider = new GoogleAuthProvider();

	try {
		const userCredential = await signInWithPopup(auth, provider);
		const info = getAdditionalUserInfo(userCredential);
		const user = userCredential.user;

		return { user, newUser: info?.isNewUser };
	} catch (error) {
		const errorCode = error.code;
		const errorMessage = error.message;
		console.error(errorCode);
		console.error(errorMessage);
	}
}

export async function signInWithMicrosoft(auth: Auth) {
	const provider = new OAuthProvider('microsoft.com');

	try {
		const userCredential = await signInWithPopup(auth, provider);
		const credential = OAuthProvider.credentialFromResult(userCredential);
		const info = getAdditionalUserInfo(userCredential);
		const user = userCredential.user;
		const accessToken = credential?.accessToken;

		const res = await fetch('https://graph.microsoft.com/beta/me/photos/96x96/$value', {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});

		const data = await res.blob();
		const imageUrl = window.URL.createObjectURL(data);

		return { user, imageUrl, newUser: info?.isNewUser };
	} catch (error) {
		// const credential = OAuthProvider.credentialFromError(error);
		const errorCode = error.code;
		const errorMessage = error.message;
		console.error(errorCode);
		console.error(errorMessage);
	}
}

export async function signInWithGithub(auth: Auth) {
	const provider = new GithubAuthProvider();
	try {
		const userCredential = await signInWithPopup(auth, provider);
		const info = getAdditionalUserInfo(userCredential);
		const user = userCredential.user;

		return { user, newUser: info?.isNewUser };
	} catch (error) {
		// const credential = GithubAuthProvider.credentialFromError(error);
		const errorCode = error.code;
		const errorMessage = error.message;
		console.error(errorCode);
		console.error(errorMessage);
	}
}
