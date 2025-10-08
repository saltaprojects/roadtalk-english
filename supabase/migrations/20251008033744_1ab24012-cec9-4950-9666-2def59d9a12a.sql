-- Create table to track lesson completions
CREATE TABLE public.lesson_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

-- Enable RLS on lesson_completions
ALTER TABLE public.lesson_completions ENABLE ROW LEVEL SECURITY;

-- Users can view their own lesson completions
CREATE POLICY "Users can view their own lesson completions"
ON public.lesson_completions
FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own lesson completions
CREATE POLICY "Users can insert their own lesson completions"
ON public.lesson_completions
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Add subscription tracking to profiles table
ALTER TABLE public.profiles
ADD COLUMN stripe_customer_id TEXT,
ADD COLUMN subscription_status TEXT DEFAULT 'inactive',
ADD COLUMN subscription_end TIMESTAMP WITH TIME ZONE,
ADD COLUMN stripe_subscription_id TEXT;

-- Create index for faster lookups
CREATE INDEX idx_lesson_completions_user_id ON public.lesson_completions(user_id);
CREATE INDEX idx_profiles_stripe_customer_id ON public.profiles(stripe_customer_id);