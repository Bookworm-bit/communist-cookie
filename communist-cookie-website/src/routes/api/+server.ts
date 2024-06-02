import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	// const { a, b } = await request.json();
	const data = await request.json();

	console.log(data);
	return json(1);
	// return json(a + b);
};
