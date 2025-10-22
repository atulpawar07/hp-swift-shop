-- Add RLS policies for product-images storage bucket to restrict write access to admins only

-- Allow public read access (keep existing behavior for product display)
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

-- Only admins can upload new files
CREATE POLICY "Admins can upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'product-images'
  AND public.has_role(auth.uid(), 'admin'::app_role)
);

-- Only admins can update file metadata
CREATE POLICY "Admins can update"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'product-images'
  AND public.has_role(auth.uid(), 'admin'::app_role)
);

-- Only admins can delete files
CREATE POLICY "Admins can delete"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'product-images'
  AND public.has_role(auth.uid(), 'admin'::app_role)
);