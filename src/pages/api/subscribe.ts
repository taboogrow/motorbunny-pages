export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
	const data = await request.formData();
	const email = data.get('email') as string;

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
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

	let profileId = null;

	const createProfileResponse = await fetch('https://a.klaviyo.com/api/profiles/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
			revision: '2024-05-15'
		},
		body: JSON.stringify({
			data: {
				type: 'profile',
				attributes: {
					email,
					properties: {
						$source: 'Win A Motorbunny'
					}
				}
			}
		})
	});

	if (createProfileResponse.status === 400) {
		console.log('Invalid email');
		return new Response(
			JSON.stringify({
				message: 'Invalid email'
			}),
			{
				status: 400
			}
		);
	}

	// profile already exists with that email but we don't know if it's in the list, so we get the id from the error message
	if (createProfileResponse.status === 409) {
		console.log('Profile already exists');
		profileId = (await createProfileResponse.json()).errors[0].meta.duplicate_profile_id;
	}

	if (createProfileResponse.status === 201) {
		profileId = (await createProfileResponse.json()).data.id;
	}

	if (
		(createProfileResponse.status !== 201 && createProfileResponse.status !== 409) ||
		!profileId
	) {
		return new Response(
			JSON.stringify({
				message: 'Error creating profile'
			}),
			{
				status: 500
			}
		);
	}

	console.log(profileId);

	const addProfileToListResponse = await fetch(
		`https://a.klaviyo.com/api/lists/${KLAVIYO_LIST_ID}/relationships/profiles/`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
				revision: '2024-05-15'
			},
			body: JSON.stringify({
				data: [
					{
						type: 'profile',
						id: profileId
					}
				]
			})
		}
	);

	if (addProfileToListResponse.status !== 204) {
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
