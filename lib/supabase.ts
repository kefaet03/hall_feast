import { createBrowserClient } from '@supabase/ssr';
import { Database } from '@/types/supabase'; // Assuming Supabase types will be generated here

// Placeholders for environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const createClient = () =>
  createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
