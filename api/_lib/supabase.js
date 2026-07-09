import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client using environment variables.
// In Vercel serverless functions, these are available on process.env.
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const supabase = supabaseUrl && supabaseKey 
    ? createClient(supabaseUrl, supabaseKey) 
    : null;
