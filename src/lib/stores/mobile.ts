import { readable } from 'svelte/store';

export default readable<boolean | null>(null, (set) => {
	if (typeof window === 'undefined') {
		return;
	}

	const mq = window.matchMedia('(min-width: 710px)');
	mq.matches ? set(false) : set(true);
	mq.addEventListener('change', (e) => {
		e.matches ? set(false) : set(true);
	});
});
