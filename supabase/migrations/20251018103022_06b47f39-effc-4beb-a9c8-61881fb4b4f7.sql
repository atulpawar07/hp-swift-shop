-- Update brands table to support display order and visibility
ALTER TABLE public.brands 
  ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS is_partner BOOLEAN DEFAULT true;