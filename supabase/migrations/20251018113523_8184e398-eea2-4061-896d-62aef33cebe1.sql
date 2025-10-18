-- Add phone column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN phone text;

-- Update RLS policy to allow admins to update profiles
CREATE POLICY "Admins can update all profiles"
ON public.profiles
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Update RLS policy to allow admins to delete profiles  
CREATE POLICY "Admins can delete profiles"
ON public.profiles
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));