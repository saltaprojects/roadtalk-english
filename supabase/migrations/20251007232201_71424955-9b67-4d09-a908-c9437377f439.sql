-- Create contacts table for storing contact form submissions
CREATE TABLE public.contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert contact form submissions (public form)
CREATE POLICY "Anyone can submit contact form"
ON public.contacts
FOR INSERT
WITH CHECK (true);

-- Only authenticated users can view contacts (for admin purposes)
CREATE POLICY "Authenticated users can view contacts"
ON public.contacts
FOR SELECT
USING (auth.role() = 'authenticated');

-- Create index for faster lookups by date
CREATE INDEX idx_contacts_created_at ON public.contacts(created_at DESC);