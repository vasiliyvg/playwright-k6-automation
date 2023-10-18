import dotenv from 'dotenv';

// Get environment variables from a terminal
const baseUrl: string = process.env.BASE_URL,
	username: string = process.env.USER_NAME,
	password: string = process.env.PASSWORD;

dotenv.config();

/**
 * Get environment variables from .env file if they were not passed from a terminal
 */
export const config = {
	BASE_URL: process.env.BASE_URL || baseUrl,
	USER_NAME: process.env.USER_NAME || username,
	PASSWORD: process.env.PASSWORD || password
};
