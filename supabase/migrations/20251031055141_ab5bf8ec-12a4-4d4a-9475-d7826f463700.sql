-- Create site_settings table for cover photo and other site-wide settings
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key TEXT UNIQUE NOT NULL,
  setting_value JSONB,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access for cover photo
CREATE POLICY "Allow public read access to site settings"
  ON public.site_settings
  FOR SELECT
  USING (true);

-- Only admins can update site settings
CREATE POLICY "Only admins can update site settings"
  ON public.site_settings
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid()
      AND role = 'admin'
    )
  );

-- Create storage bucket for site assets
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-assets', 'site-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for site assets
CREATE POLICY "Public can view site assets"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'site-assets');

CREATE POLICY "Admins can upload site assets"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'site-assets' AND
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid()
      AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update site assets"
  ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'site-assets' AND
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid()
      AND role = 'admin'
    )
  );

CREATE POLICY "Admins can delete site assets"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'site-assets' AND
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid()
      AND role = 'admin'
    )
  );

-- Create trigger for updated_at
CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();