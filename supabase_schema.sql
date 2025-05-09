
-- This is a reference schema for Supabase tables that need to be created
-- You'll need to run these commands in the Supabase SQL editor after connecting your project

-- Enable RLS (Row Level Security)
create schema if not exists public;

-- Create a table for user feedback
create table if not exists public.feedback (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create a table for storing chat conversations
create table if not exists public.conversations (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) not null,
  user_message text not null,
  ai_response text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Setup Row Level Security policies
alter table public.feedback enable row level security;
alter table public.conversations enable row level security;

-- Allow users to read and write their own feedback only
create policy "Users can read their own feedback" 
  on public.feedback for select 
  using (auth.uid() = user_id);

create policy "Users can insert their own feedback" 
  on public.feedback for insert 
  with check (auth.uid() = user_id);

-- Allow users to read and write their own conversations only
create policy "Users can read their own conversations" 
  on public.conversations for select 
  using (auth.uid() = user_id);

create policy "Users can insert their own conversations" 
  on public.conversations for insert 
  with check (auth.uid() = user_id);
