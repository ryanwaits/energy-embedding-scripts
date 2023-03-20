// Import Supabase client
import { createClient } from '@supabase/supabase-js';
// Import dotenv to read .env.local
import dotenv from 'dotenv';

// Read the .env.local file
dotenv.config({ path: '.env.local' });

// Read the SUPABASE_URL and SUPABASE_ANON_KEY environment variables
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

// Initialize Supabase with your project's URL and API key
export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
