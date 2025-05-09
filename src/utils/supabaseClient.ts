
import { createClient } from '@supabase/supabase-js';

// Provide default fallback values for development purposes
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Log warning if environment variables are missing
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.error('Supabase URL or Anon Key is missing. Please connect to Supabase through the Lovable integration.');
  console.log('Using fallback values for development - actual authentication and data storage will not work until you connect to Supabase.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Define types for our database tables
export type User = {
  id: string;
  email: string;
  created_at: string;
};

export type Feedback = {
  id: string;
  user_id: string;
  message: string;
  created_at: string;
};

// Helper functions for authentication
export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  return { user: data.user, error };
}

// Helper function for storing feedback
export async function storeFeedback(userId: string, message: string) {
  const { data, error } = await supabase
    .from('feedback')
    .insert([{ user_id: userId, message }]);
  
  return { data, error };
}
