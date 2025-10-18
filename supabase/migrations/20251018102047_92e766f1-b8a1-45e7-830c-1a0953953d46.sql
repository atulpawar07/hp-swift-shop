-- Create categories table
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create brands table
CREATE TABLE public.brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;

-- RLS Policies for categories
CREATE POLICY "Anyone can view categories" ON public.categories
  FOR SELECT USING (true);

CREATE POLICY "Admins can insert categories" ON public.categories
  FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update categories" ON public.categories
  FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete categories" ON public.categories
  FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for brands
CREATE POLICY "Anyone can view brands" ON public.brands
  FOR SELECT USING (true);

CREATE POLICY "Admins can insert brands" ON public.brands
  FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update brands" ON public.brands
  FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete brands" ON public.brands
  FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- Insert default categories
INSERT INTO public.categories (name) VALUES
  ('UPS & Batteries'),
  ('Printers'),
  ('Scanners'),
  ('Laptops'),
  ('Computers/PC'),
  ('Accessories'),
  ('Networking Equipment'),
  ('Storage Devices'),
  ('Monitors');

-- Insert brands from partner logos
INSERT INTO public.brands (name) VALUES
  ('HP'), ('Lenovo'), ('Toshiba'), ('Dell'), ('Sony'),
  ('Compaq'), ('Apple'), ('Acer'), ('Asus'), ('Samsung'),
  ('APC'), ('IBM'), ('Canon'), ('Epson'), ('Brother'),
  ('D-Link'), ('Cisco'), ('Linksys'), ('Belkin'), ('Netgear'),
  ('Targus'), ('Logitech'), ('Intel'), ('Microsoft'), ('Creative'),
  ('Imation'), ('BenQ'), ('ViewSonic'), ('Gigabyte'), ('WD'),
  ('Seagate'), ('Symantec'), ('SanDisk'), ('Kingston'), ('Iomega'),
  ('Polycom'), ('Prysm'), ('Aruba'), ('Vaddio');