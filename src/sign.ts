import jwt from 'jsonwebtoken';

const signRequest = (key: string, secret: string): string =>
	jwt.sign(
		{
			data: {
				user: {
					key,
				},
			},
		},
		secret,
		{
			expiresIn: 30, // Request is only good for 30 seconds to prevent replay
		}
	);

export default signRequest;
