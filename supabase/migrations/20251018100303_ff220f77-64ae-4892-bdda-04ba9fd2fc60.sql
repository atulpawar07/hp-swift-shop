-- Grant admin role to atulpawar07@gmail.com
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'
FROM auth.users 
WHERE email = 'atulpawar07@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;

-- Create page_content table for editable page sections
CREATE TABLE public.page_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page TEXT NOT NULL,
  section TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(page, section)
);

ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;

-- RLS policies for page_content
CREATE POLICY "Anyone can view page content"
  ON public.page_content FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Admins can insert page content"
  ON public.page_content FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update page content"
  ON public.page_content FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete page content"
  ON public.page_content FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Add trigger for updated_at
CREATE TRIGGER page_content_updated_at
  BEFORE UPDATE ON public.page_content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Insert default content for home page
INSERT INTO public.page_content (page, section, content) VALUES
('home', 'hero', '{
  "title": "Welcome to SK Enterprise",
  "subtitle": "Your Trusted Partner in Technology Solutions",
  "description": "Leading provider of IT equipment, office supplies, and technology solutions in UAE since 2010"
}'::jsonb),
('home', 'stats', '{
  "years": "14+",
  "yearsLabel": "Years Experience",
  "clients": "500+",
  "clientsLabel": "Happy Clients",
  "products": "1000+",
  "productsLabel": "Products Available",
  "satisfaction": "99%",
  "satisfactionLabel": "Client Satisfaction"
}'::jsonb);

-- Insert default content for services page
INSERT INTO public.page_content (page, section, content) VALUES
('services', 'hero', '{
  "title": "Our Services",
  "description": "Comprehensive IT solutions tailored to your business needs"
}'::jsonb),
('services', 'services_list', '{
  "services": [
    {
      "title": "IT Equipment Supply",
      "description": "Wide range of computers, laptops, printers, and networking equipment from leading brands",
      "icon": "Package"
    },
    {
      "title": "Office Solutions",
      "description": "Complete office setup including furniture, supplies, and technology integration",
      "icon": "Building"
    },
    {
      "title": "Technical Support",
      "description": "Professional maintenance and support services for all your IT equipment",
      "icon": "Wrench"
    },
    {
      "title": "Network Setup",
      "description": "Design and implementation of secure, scalable network infrastructure",
      "icon": "Network"
    },
    {
      "title": "Consultation",
      "description": "Expert advice on technology solutions and digital transformation strategies",
      "icon": "Users"
    },
    {
      "title": "Bulk Orders",
      "description": "Special pricing and dedicated support for large corporate orders",
      "icon": "ShoppingCart"
    }
  ]
}'::jsonb);

-- Insert default content for contact page
INSERT INTO public.page_content (page, section, content) VALUES
('contact', 'info', '{
  "phone": "+971 563 569089",
  "email": "info@skenterprise.ae",
  "address": "Dubai, United Arab Emirates",
  "hours": "Sunday - Thursday: 9:00 AM - 6:00 PM"
}'::jsonb),
('contact', 'hero', '{
  "title": "Get in Touch",
  "description": "Have questions? We would love to hear from you. Send us a message and we will respond as soon as possible."
}'::jsonb);

-- Insert default content for about page
INSERT INTO public.page_content (page, section, content) VALUES
('about', 'hero', '{
  "title": "About SK Enterprise",
  "description": "Your trusted technology partner since 2010"
}'::jsonb),
('about', 'story', '{
  "title": "Our Story",
  "content": "Founded in 2010, SK Enterprise has grown to become one of the leading IT equipment suppliers in the UAE. We specialize in providing quality technology solutions to businesses of all sizes."
}'::jsonb);