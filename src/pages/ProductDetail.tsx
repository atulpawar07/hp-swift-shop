import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Heart, Share2, Truck, Shield, Award, ArrowLeft, Mail } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number | null;
  images: string[];
  in_stock: boolean;
}

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [primaryEmail, setPrimaryEmail] = useState('info@skenterprise.ae');
  const [primaryWhatsApp, setPrimaryWhatsApp] = useState('9769805184');

  // Get proper image URL - handle both Supabase storage URLs and local paths
  const getImageUrl = (imagePath: string): string => {
    if (!imagePath) return '';
    
    // If it's already a full URL (Supabase storage), use it as-is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    
    // For local paths, ensure they start with /
    const normalizedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    return normalizedPath;
  };

  // Fetch product from database
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        navigate('/products');
        return;
      }

      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error || !data) {
        toast.error('Product not found');
        navigate('/products');
      } else {
        setProduct(data);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id, navigate]);

  // Fetch primary contact settings
  useEffect(() => {
    const fetchPrimaryContact = async () => {
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .eq('key', 'primary_contact')
        .maybeSingle();

      if (!error && data) {
        const value = data.value as any;
        setPrimaryEmail(value.email || 'info@skenterprise.ae');
        setPrimaryWhatsApp(value.whatsapp || '9769805184');
      }
    };

    fetchPrimaryContact();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-lg">Loading product...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-4 gap-2"
          onClick={() => navigate('/products')}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Button>

        {/* Breadcrumb */}
        <nav className="text-sm text-gray-300 mb-6">
          <button onClick={() => navigate('/')} className="hover:text-primary transition-colors">Home</button>
          {' / '}
          <button onClick={() => navigate('/products')} className="hover:text-primary transition-colors">Products</button>
          {' / '}
          {product.category}
          {' / '}
          <span className="text-white">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <img 
                src={encodeURI(getImageUrl(product.images[currentImageIndex] || ''))}
                alt={product.name}
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="600"%3E%3Crect fill="%23f0f0f0" width="600" height="600"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="32" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
                }}
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, idx) => (
                  <div 
                    key={idx} 
                    className={`aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer border-2 transition-colors ${
                      currentImageIndex === idx ? 'border-primary' : 'border-transparent hover:border-primary/50'
                    }`}
                    onClick={() => setCurrentImageIndex(idx)}
                  >
                    <img 
                      src={encodeURI(getImageUrl(img || ''))}
                      alt={`${product.name} ${idx + 1}`} 
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23f0f0f0" width="200" height="200"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="14" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="outline" className="mb-2">{product.category}</Badge>
              <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
              <p className="text-gray-200">Brand: {product.brand}</p>
            </div>

            {product.price ? (
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-primary">AED {product.price.toLocaleString()}</span>
              </div>
            ) : (
              <p className="text-lg text-gray-200">Contact for pricing</p>
            )}

            <Badge className={product.in_stock ? "bg-green-500 text-white" : "bg-red-500 text-white"}>
              {product.in_stock ? "✓ In Stock" : "Out of Stock"}
            </Badge>

            <p className="text-gray-200 leading-relaxed">
              High-quality {product.brand} {product.category.toLowerCase()} available at competitive prices. 
              Contact us for detailed specifications and bulk pricing options.
            </p>

            {/* Actions */}
            <div className="flex gap-3">
              <Button 
                size="lg" 
                className="flex-1 gap-2" 
                disabled={!product.in_stock}
                onClick={() => {
                  const message = `Hi, I'm interested in ${product.name} (${product.brand}). ${product.price ? `Price: AED ${product.price}` : 'Please provide pricing.'}`;
                  window.open(`https://wa.me/${primaryWhatsApp}?text=${encodeURIComponent(message)}`, '_blank');
                }}
              >
                <ShoppingCart className="h-5 w-5" />
                {product.in_stock ? "Enquire on WhatsApp" : "Out of Stock"}
              </Button>
              <Button 
                size="lg" 
                className="bg-white text-black border-white hover:bg-gray-100"
                onClick={() => {
                  const subject = `Enquiry: ${product.name}`;
                  const body = `Hi,%0D%0A%0D%0AI'm interested in the following product:%0D%0A%0D%0AProduct: ${product.name}%0D%0ABrand: ${product.brand}%0D%0A${product.price ? `Price: AED ${product.price}` : ''}%0D%0A%0D%0APlease provide more details.%0D%0A%0D%0AThank you.`;
                  window.location.href = `mailto:${primaryEmail}?subject=${subject}&body=${body}`;
                }}
              >
                <Mail className="h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                className="bg-white text-black border-white hover:bg-gray-100"
                onClick={() => {
                  navigator.share?.({
                    title: product.name,
                    text: `Check out ${product.name} - ${product.brand}`,
                    url: window.location.href
                  }).catch(() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success('Link copied to clipboard!');
                  });
                }}
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="text-center">
                <Truck className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-xs text-gray-200">Fast Delivery</p>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-xs text-gray-200">Warranty Included</p>
              </div>
              <div className="text-center">
                <Award className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-xs text-gray-200">Authorized Dealer</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger value="description" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
                Description
              </TabsTrigger>
              <TabsTrigger value="shipping" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
                Shipping & Returns
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold mb-3 text-white">About this Product</h3>
                <p className="text-gray-200 leading-relaxed">
                  {product.brand} {product.name} - A reliable {product.category.toLowerCase()} solution 
                  for your business needs. We provide genuine products with full warranty support.
                </p>
                <h3 className="text-xl font-semibold mt-6 mb-3 text-white">Product Highlights</h3>
                <ul className="space-y-2 text-gray-200">
                  <li>• Genuine {product.brand} product</li>
                  <li>• Authorized distributor warranty</li>
                  <li>• Professional after-sales support</li>
                  <li>• Bulk order discounts available</li>
                  <li>• Fast delivery across UAE</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="shipping" className="mt-6">
              <div className="prose max-w-none text-gray-200">
                <h3 className="text-xl font-semibold mb-3 text-white">Shipping Information</h3>
                <p>We offer fast and reliable shipping across UAE. Orders are typically processed within 1-2 business days.</p>
                <ul className="space-y-2 mt-4">
                  <li>• Standard Delivery: 2-3 business days</li>
                  <li>• Express Delivery: 1 business day (additional charges apply)</li>
                  <li>• Free shipping on orders above AED 1,000</li>
                </ul>

                <h3 className="text-xl font-semibold mt-8 mb-3 text-white">Returns & Refunds</h3>
                <p>We accept returns within 7 days of delivery. Product must be unused and in original packaging.</p>
                <ul className="space-y-2 mt-4">
                  <li>• 7-day return policy</li>
                  <li>• Full refund or replacement available</li>
                  <li>• Contact us for return authorization</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
