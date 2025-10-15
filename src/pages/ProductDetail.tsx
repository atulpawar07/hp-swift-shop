import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Heart, Share2, Truck, Shield, Award } from "lucide-react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();

  // Sample product data - will come from database
  const product = {
    name: "HP ProBook 450 G9 - Intel Core i5 12th Gen",
    sku: "HP-PB450-G9-I5",
    price: 52999,
    originalPrice: 64999,
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format"
    ],
    category: "Laptops",
    brand: "HP",
    inStock: true,
    stockQuantity: 15,
    description: "The HP ProBook 450 G9 is a powerful business laptop designed for productivity and performance. Featuring 12th Gen Intel Core processors, robust security features, and a professional design.",
    specs: {
      processor: "Intel Core i5-1235U (12th Gen)",
      ram: "8GB DDR4 3200MHz (Upgradeable to 32GB)",
      storage: "512GB PCIe NVMe SSD",
      display: "15.6\" FHD (1920x1080) Anti-glare IPS",
      graphics: "Intel Iris Xe Graphics",
      battery: "3-cell 45 Wh Li-ion, Up to 8 hours",
      ports: "2x USB-A 3.2, 2x USB-C, HDMI 2.0, RJ-45, Audio Jack",
      os: "Windows 11 Pro",
      warranty: "1 Year HP India Warranty"
    }
  };

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-6">
          Home / Products / {product.category} / {product.name}
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <img 
                src={product.images[0]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <div key={idx} className="aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-primary transition-colors">
                  <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="outline" className="mb-2">{product.category}</Badge>
              <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
              <p className="text-muted-foreground">SKU: {product.sku}</p>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-bold text-primary">₹{product.price.toLocaleString()}</span>
              <span className="text-xl text-muted-foreground line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
              <Badge variant="destructive" className="text-sm">Save {discount}%</Badge>
            </div>

            {product.inStock ? (
              <Badge className="bg-green-500 text-white">✓ In Stock ({product.stockQuantity} available)</Badge>
            ) : (
              <Badge variant="secondary">Out of Stock</Badge>
            )}

            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Quick Specs */}
            <div className="bg-accent/50 rounded-lg p-4 space-y-2">
              <h3 className="font-semibold mb-3">Key Features</h3>
              <ul className="grid grid-cols-2 gap-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-primary">•</span>
                  {product.specs.processor}
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">•</span>
                  {product.specs.ram}
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">•</span>
                  {product.specs.storage}
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">•</span>
                  {product.specs.display}
                </li>
              </ul>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button size="lg" className="flex-1 gap-2">
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </Button>
              <Button size="lg" variant="outline">
                <Heart className="h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="text-center">
                <Truck className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground">Fast Shipping</p>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground">1 Year Warranty</p>
              </div>
              <div className="text-center">
                <Award className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground">Authorized Dealer</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Specs Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="specs" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger value="specs" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
                Technical Specifications
              </TabsTrigger>
              <TabsTrigger value="description" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
                Description
              </TabsTrigger>
              <TabsTrigger value="shipping" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
                Shipping & Returns
              </TabsTrigger>
            </TabsList>

            <TabsContent value="specs" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex border-b border-border pb-3">
                    <span className="font-medium w-1/3 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="text-muted-foreground w-2/3">{value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="description" className="mt-6">
              <div className="prose max-w-none">
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                <h3 className="text-xl font-semibold mt-6 mb-3">Product Highlights</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Powerful 12th Gen Intel Core processor for enhanced productivity</li>
                  <li>• Full HD anti-glare display for comfortable viewing</li>
                  <li>• Fast PCIe NVMe SSD for quick boot and load times</li>
                  <li>• Robust security features for business use</li>
                  <li>• Professional design with durable build quality</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="shipping" className="mt-6">
              <div className="prose max-w-none text-muted-foreground">
                <h3 className="text-xl font-semibold mb-3 text-foreground">Shipping Information</h3>
                <p>We offer fast and reliable shipping across India. Orders are typically processed within 1-2 business days.</p>
                <ul className="space-y-2 mt-4">
                  <li>• Standard Delivery: 3-5 business days</li>
                  <li>• Express Delivery: 1-2 business days (additional charges apply)</li>
                  <li>• Free shipping on orders above ₹50,000</li>
                </ul>

                <h3 className="text-xl font-semibold mt-8 mb-3 text-foreground">Returns & Refunds</h3>
                <p>We accept returns within 7 days of delivery. Product must be unused and in original packaging.</p>
                <ul className="space-y-2 mt-4">
                  <li>• 7-day return policy</li>
                  <li>• Full refund or replacement available</li>
                  <li>• Free return pickup for defective items</li>
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
