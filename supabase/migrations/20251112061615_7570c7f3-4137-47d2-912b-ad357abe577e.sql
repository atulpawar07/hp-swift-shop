-- Add highlights column to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS highlights text[] DEFAULT '{}';

COMMENT ON COLUMN products.highlights IS 'Array of product highlight points to display on product detail page';