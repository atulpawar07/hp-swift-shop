-- Add a verified field to profiles table to track email verification status
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT false;

-- Create a function to sync email verification status from auth.users
CREATE OR REPLACE FUNCTION public.sync_user_verification()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Update the profile's email_verified status based on auth.users
  UPDATE public.profiles
  SET email_verified = (NEW.email_confirmed_at IS NOT NULL)
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$;

-- Create trigger to sync verification status when auth.users is updated
DROP TRIGGER IF EXISTS on_auth_user_email_verified ON auth.users;
CREATE TRIGGER on_auth_user_email_verified
  AFTER UPDATE ON auth.users
  FOR EACH ROW
  WHEN (OLD.email_confirmed_at IS DISTINCT FROM NEW.email_confirmed_at)
  EXECUTE FUNCTION public.sync_user_verification();

-- Update existing profiles with current verification status
UPDATE public.profiles p
SET email_verified = (
  SELECT (u.email_confirmed_at IS NOT NULL)
  FROM auth.users u
  WHERE u.id = p.id
);