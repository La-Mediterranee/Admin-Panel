<script context="module" lang="ts">
	import { getCookie } from '$lib/utils/helpers';
	import { signIn, signInWithGoogle, signInWithMicrosoft, signInWithGithub } from './login';

	const minLength = 8;

	const passwordRules = [
		(v: string) => !!v || 'Required',
		(v: string) => v.length >= minLength || `Min ${minLength} characters`
	];

	const emailRules = [
		(v: string) => !!v || 'Required',
		(v: string) => {
			const pattern =
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return pattern.test(v) || 'Invalid e-mail.';
		}
	];

	function validateInput(email: string, password: string): boolean {
		for (const rule of emailRules) {
			if (rule(email) !== true) return false;
		}

		for (const rule of passwordRules) {
			if (rule(password) !== true) return false;
		}

		return true;
	}
</script>

<script lang="ts">
	import Icon from 'svelte-material-components/src/components/Icon';
	import TextField from 'svelte-material-components/src/components/TextField';
	import Button from 'svelte-material-components/src/components/Button';
	import { account, key, eye, eyeOff } from '$lib/icons';

	import { getAdditionalUserInfo } from 'firebase/auth';

	import type { Auth, User } from 'firebase/auth';

	export let auth: Auth;

	let form: HTMLFormElement | null = null;
	let email: string = '';
	let password: string = '';
	let show: boolean = false;
	let error: unknown = null;

	async function login(e: MouseEvent | Event) {
		let user: User | undefined;

		try {
			const target = e.currentTarget as HTMLButtonElement;
			const value = target.value;

			// new window.AbortSignal();

			let userObject:
				| {
						user: User;
						newUser: boolean | undefined;
				  }
				| undefined;

			switch (value) {
				case 'login':
					if (!validateInput(email, password)) {
						return;
					}
					userObject = await signIn(auth, email, password);
					break;
				case 'google':
					userObject = await signInWithGoogle(auth);
					break;
				case 'github':
					userObject = await signInWithGithub(auth);
					break;
				case 'microsoft':
					const result = await signInWithMicrosoft(auth);
					user = result?.user;
					if (!auth.currentUser) {
						break;
					}
					//@ts-ignore
					auth.currentUser.photoURL = result?.imageUrl;
					break;
				default:
					break;
			}

			user = userObject?.user;

			if (user) {
				// const idToken = await user.getIdToken();
				// const csrfToken = getCookie('csrfToken');

				// await fetch(`/login`, {
				// 	headers: { Authorization: `Bearer ${idToken}` },
				// 	method: 'POST',
				// 	body: JSON.stringify({ idToken, csrfToken })
				// });

				// if (userObject?.newUser) {
				// 	db.collection('users').doc(user.uid).set({ email });
				// }

				error = false;
			} else {
				error = true;
			}
		} catch (err) {
			console.error(err);
			error = true;
		}
	}
</script>

<h1>Login</h1>

<section id="emailPassword">
	<form bind:this={form} on:submit|preventDefault={login} name="login" novalidate>
		<div class="wrapper">
			<TextField
				bind:value={email}
				type="email"
				name="email"
				rules={emailRules}
				filled
				autocomplete="email"
				rounded
			>
				<div slot="prepend">
					<Icon style="color:#fff" path={account} />
				</div>
				Email
			</TextField>
		</div>
		<div class="wrapper">
			<TextField
				bind:value={password}
				name="password"
				minlength={minLength}
				type={show ? 'text' : 'password'}
				rules={passwordRules}
				counter={`${minLength}+`}
				autocomplete="current-password"
				rounded
				filled
			>
				<div slot="prepend">
					<Icon style="color:#fff" path={key} />
				</div>
				Passwort
				<div
					slot="append"
					on:click={() => {
						show = !show;
					}}
				>
					<Icon style="cursor: pointer; color:#fff;" path={show ? eye : eyeOff} />
				</div>
			</TextField>
		</div>

		<Button class="primary-color" rounded value="login">Einloggen</Button>
	</form>
</section>

<section>
	<h2>Weiter Optionen:</h2>
	<noscript> Diese Optionen sind nur mit JS verfügbar </noscript>
	<button id="google" type="button" class="provider" on:click={login} value="google">
		<!-- <img src="/google.svg" alt="Google Logo" /> -->
		<img src="/google.svg" alt="Google Logo" />
		<span class="buttonText"> Anmelden mit Google</span>
	</button>

	<button id="microsoft" type="button" class="provider" on:click={login} value="microsoft">
		<img src="/microsoft.svg" alt="Microsoft Logo" />
		<span class="buttonText"> Anmelden mit Microsoft</span>
	</button>

	<button id="github" type="button" class="provider" on:click={login} value="github">
		<img src="/github.svg" alt="Github Logo" />
		<span class="buttonText"> Anmelden mit Github</span>
	</button>
</section>

<style lang="scss" src="./Login.scss"></style>
