import type { EndpointOutput } from '@sveltejs/kit';
import type { DefaultBody } from '@sveltejs/kit/types/endpoint';
import type { Headers, MaybePromise } from '@sveltejs/kit/types/helper';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';

export function get<Output extends DefaultBody = DefaultBody>():
	| void
	| EndpointOutput<Output>
	| Promise<void | EndpointOutput<Output>> {
	const text = 'hallo' as Output;

	return {
		body: {
			text
		}
	};
}
