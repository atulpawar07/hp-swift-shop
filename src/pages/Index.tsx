import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

// Sample product data - will be replaced with real data from database
const featuredProducts = [
  {
    id: "1",
    name: "HP ProBook 450 G9 - Intel Core i5 12th Gen",
    price: 52999,
    originalPrice: 64999,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format",
    category: "Laptops",
    inStock: true,
    specs: ["Intel Core i5-1235U", "8GB RAM", "512GB SSD", "15.6\" FHD Display"]
  },
  {
    id: "2",
    name: "HP LaserJet Pro M404dn Printer",
    price: 24999,
    originalPrice: 29999,
    image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&auto=format",
    category: "Printers",
    inStock: true,
    specs: ["38 ppm", "Ethernet, USB", "Auto Duplex", "250-sheet tray"]
  },
  {
    id: "3",
    name: "HP EliteBook 840 G9 - Intel Core i7",
    price: 89999,
    originalPrice: 104999,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format",
    category: "Laptops",
    inStock: true,
    specs: ["Intel Core i7-1265U", "16GB RAM", "512GB NVMe SSD", "14\" FHD IPS"]
  },
  {
    id: "4",
    name: "HP Wireless Mouse & Keyboard Combo",
    price: 1899,
    originalPrice: 2499,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format",
    category: "Accessories",
    inStock: true,
    specs: ["2.4GHz Wireless", "Slim Design", "Plug & Play", "Long Battery Life"]
  },
  {
    id: "5",
    name: "HP Color LaserJet Pro M454dw",
    price: 34999,
    image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&auto=format",
    category: "Printers",
    inStock: true,
    specs: ["28 ppm Color", "Wi-Fi, Ethernet", "Auto Duplex", "HP Smart App"]
  },
  {
    id: "6",
    name: "HP USB-C Universal Dock",
    price: 8999,
    originalPrice: 11999,
    image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=800&auto=format",
    category: "Accessories",
    inStock: true,
    specs: ["USB-C 3.1", "Dual Display Support", "Power Delivery", "6 USB Ports"]
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      
      {/* Featured Products Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Featured Products</h2>
            <p className="text-muted-foreground">Best deals on HP laptops, printers, and accessories</p>
          </div>
          <Link to="/products">
            <Button variant="outline" className="gap-2 hidden md:flex">
              View All
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link to="/products">
            <Button variant="outline" className="gap-2">
              View All Products
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-accent/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Link to="/products?category=laptops" className="group">
              <div className="bg-card rounded-xl p-8 text-center hover:shadow-lg transition-all border border-border">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <span className="text-4xl">💻</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Laptops</h3>
                <p className="text-muted-foreground text-sm">Business & Enterprise Solutions</p>
              </div>
            </Link>

            <Link to="/products?category=printers" className="group">
              <div className="bg-card rounded-xl p-8 text-center hover:shadow-lg transition-all border border-border">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <span className="text-4xl">🖨️</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Printers</h3>
                <p className="text-muted-foreground text-sm">LaserJet & InkJet Solutions</p>
              </div>
            </Link>

            <Link to="/products?category=accessories" className="group">
              <div className="bg-card rounded-xl p-8 text-center hover:shadow-lg transition-all border border-border">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <span className="text-4xl">⌨️</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Accessories</h3>
                <p className="text-muted-foreground text-sm">Complete Your Setup</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose SK Enterprise?</h2>
        
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">✓</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Authorized Dealer</h3>
            <p className="text-sm text-muted-foreground">Official HP partner with genuine products</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🚚</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
            <p className="text-sm text-muted-foreground">Quick shipping across India</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">💰</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Best Prices</h3>
            <p className="text-sm text-muted-foreground">Competitive pricing for bulk orders</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🎧</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">24/7 Support</h3>
            <p className="text-sm text-muted-foreground">Expert assistance whenever you need</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
