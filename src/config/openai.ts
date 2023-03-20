// Import dotenv to read .env.local
import dotenv from 'dotenv';
// Import OpenAI API
import { Configuration, OpenAIApi } from 'openai';

// Read the .env.local file
dotenv.config({ path: '.env.local' });

// Create a new instance of the OpenAI API using the API key and export it
const configuration = new Configuration({ apiKey: process.env.OPEN_AI_KEY });
export const openAi = new OpenAIApi(configuration);
