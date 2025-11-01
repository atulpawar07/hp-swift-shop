-- Update site_settings to support multiple device-specific cover photos
-- Drop the existing single cover_photo setting if it exists
DELETE FROM public.site_settings WHERE setting_key = 'cover_photo';

-- Insert three new settings for device-specific cover photos
INSERT INTO public.site_settings (setting_key, setting_value)
VALUES 
  ('cover_photo_desktop', '{"url": "", "position": {"x": 0, "y": 0}, "scale": 1}'::jsonb),
  ('cover_photo_tablet', '{"url": "", "position": {"x": 0, "y": 0}, "scale": 1}'::jsonb),
  ('cover_photo_mobile', '{"url": "", "position": {"x": 0, "y": 0}, "scale": 1}'::jsonb)
ON CONFLICT (setting_key) DO NOTHING;