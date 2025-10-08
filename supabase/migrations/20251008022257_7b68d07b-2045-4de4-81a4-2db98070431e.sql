-- Create role enum for user types
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table to manage role assignments
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles table
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Users can view their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

-- Only admins can manage roles (will be enforced via service role for initial setup)
CREATE POLICY "Admins can manage roles"
ON public.user_roles
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
  )
);

-- Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Drop the existing overly permissive policy
DROP POLICY IF EXISTS "Authenticated users can view contacts" ON public.contacts;

-- Create new restrictive policy: only admins can view contact submissions
CREATE POLICY "Only admins can view contacts"
ON public.contacts
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Add policy for admins to manage contacts
CREATE POLICY "Admins can delete contacts"
ON public.contacts
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update contacts"
ON public.contacts
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));