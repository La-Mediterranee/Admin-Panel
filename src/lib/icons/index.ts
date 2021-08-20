// @index('./*.ts', (f, _) => `export { default as ${f.name[0] + _.pascalCase(f.name).slice(1)} } from '${f.path}'`)
export { default as account } from './account';
export { default as cart } from './cart';
export { default as eye } from './eye';
export { default as eyeOff } from './eyeOff';
export { default as fastfood } from './fastfood';
export { default as halal } from './halal';
export { default as home } from './home';
export { default as key } from './key';
export { default as magnify } from './magnify';
export { default as minus } from './minus';
export { default as person } from './person';
export { default as plus } from './plus';
export { default as restaurant } from './restaurant';
export { default as starHalf } from './star-half';
export { default as store } from './store';
export { default as trash } from './trash';
export { default as wifiOff } from './wifiOff';
//@endindex

// import { SvelteComponentTyped } from 'svelte';

// interface IconProps {
// 	height?: number;
// 	width?: number;
// 	color?: string;
// }

// export class Icon extends SvelteComponentTyped<IconProps> {}
