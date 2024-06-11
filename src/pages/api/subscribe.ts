export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
	const data = await request.formData();
	const email = data.get('email') as string;

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		return new Response(
			JSON.stringify({
				message: 'Invalid email'
			}),
			{
				status: 400
			}
		);
	}

	const KLAVIYO_API_KEY = import.meta.env.KLAVIYO_API_KEY;
	const KLAVIYO_LIST_ID = import.meta.env.KLAVIYO_LIST_ID;

	const response = await fetch('https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
			revision: '2024-05-15'
		},
		body: JSON.stringify({
			data: {
				type: 'profile-subscription-bulk-create-job',
				attributes: {
					profiles: {
						data: [
							{
								type: 'profile',
								attributes: {
									email
								},
								properties: {
									$source: 'Win A Motorbunny'
								}
							}
						]
					}
				},
				relationships: {
					list: {
						data: {
							type: 'list',
							id: KLAVIYO_LIST_ID
						}
					}
				}
			}
		})
	});

	// if response is not accepted
	if (response.status !== 202) {
		return new Response(
			JSON.stringify({
				message: 'Error subscribing'
			}),
			{
				status: 500
			}
		);
	}

	return new Response(
		JSON.stringify({
			message: 'Subscribed successfully'
		})
	);
};
