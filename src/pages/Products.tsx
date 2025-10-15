import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

// Extended sample data
const allProducts = [
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
  },
  {
    id: "7",
    name: "HP Pavilion 15 - AMD Ryzen 5",
    price: 48999,
    originalPrice: 56999,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format",
    category: "Laptops",
    inStock: true,
    specs: ["AMD Ryzen 5 5600H", "8GB RAM", "512GB SSD", "15.6\" FHD"]
  },
  {
    id: "8",
    name: "HP OfficeJet Pro 9025e All-in-One",
    price: 19999,
    image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&auto=format",
    category: "Printers",
    inStock: true,
    specs: ["Print, Scan, Copy, Fax", "24 ppm", "Wi-Fi", "Auto Document Feeder"]
  },
  {
    id: "9",
    name: "HP 24-inch FHD Monitor",
    price: 9999,
    originalPrice: 12999,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format",
    category: "Accessories",
    inStock: true,
    specs: ["24\" FHD 1920x1080", "75Hz", "IPS Panel", "HDMI, VGA"]
  }
];

const Products = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 150000]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">All Products</h1>
          <p className="text-muted-foreground">Browse our complete catalog of HP products</p>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 flex-shrink-0`}>
            <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-lg">Filters</h2>
                <Button variant="ghost" size="sm" className="text-primary">Clear All</Button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">Search</label>
                <div className="relative">
                  <Input placeholder="Search products..." className="pr-10" />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              {/* Category */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-3 block">Category</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Checkbox id="laptops" />
                    <label htmlFor="laptops" className="ml-2 text-sm cursor-pointer">Laptops</label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="printers" />
                    <label htmlFor="printers" className="ml-2 text-sm cursor-pointer">Printers</label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="accessories" />
                    <label htmlFor="accessories" className="ml-2 text-sm cursor-pointer">Accessories</label>
                  </div>
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-3 block">Price Range</label>
                <Slider
                  defaultValue={[0, 150000]}
                  max={150000}
                  step={1000}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-3"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>₹{priceRange[0].toLocaleString()}</span>
                  <span>₹{priceRange[1].toLocaleString()}</span>
                </div>
              </div>

              {/* Stock */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-3 block">Availability</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Checkbox id="instock" defaultChecked />
                    <label htmlFor="instock" className="ml-2 text-sm cursor-pointer">In Stock</label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="outofstock" />
                    <label htmlFor="outofstock" className="ml-2 text-sm cursor-pointer">Out of Stock</label>
                  </div>
                </div>
              </div>

              {/* Brand */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-3 block">Brand</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Checkbox id="hp" defaultChecked />
                    <label htmlFor="hp" className="ml-2 text-sm cursor-pointer">HP</label>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <p className="text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{allProducts.length}</span> products
              </p>

              <div className="flex gap-3 w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  className="lg:hidden gap-2"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </Button>
                
                <Select defaultValue="relevance">
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Most Relevant</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {allProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center gap-2">
              <Button variant="outline" disabled>Previous</Button>
              <Button variant="default">1</Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">Next</Button>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Products;
