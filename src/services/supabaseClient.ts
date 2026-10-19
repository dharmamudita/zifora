import { createClient } from '@supabase/supabase-js';

// Supabase configuration with fallback for demo/competition presentation
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mock-zifora-supabase.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock_anon_key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const isLiveSupabaseConfigured = () => {
  return !!import.meta.env.VITE_SUPABASE_URL && !import.meta.env.VITE_SUPABASE_URL.includes('mock');
};
