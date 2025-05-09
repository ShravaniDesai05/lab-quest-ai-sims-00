
import { createClient } from '@supabase/supabase-js';

// These environment variables need to be set after connecting to Supabase
// through the Lovable Supabase integration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is missing. Please connect to Supabase through the Lovable integration.');
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
