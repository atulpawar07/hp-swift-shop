import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import SEO from "@/components/SEO";

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number | null;
  images: string[];
  in_stock: boolean;
}

const Products = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("relevance");
  const [currentPage, setCurrentPage] = useState(1);
  
  // Temporary filter states for mobile (applied only when "Apply" is clicked)
  const [tempSearchQuery, setTempSearchQuery] = useState("");
  const [tempSelectedBrands, setTempSelectedBrands] = useState<string[]>([]);
  const [tempSelectedCategories, setTempSelectedCategories] = useState<string[]>([]);
  const [tempPriceRange, setTempPriceRange] = useState([0, 3000]);
  
  const ITEMS_PER_PAGE = 10;

  // Fetch products and filter options from database
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // Fetch products
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (productsError) {
        toast.error('Failed to load products');
        console.error(productsError);
      } else {
        setProducts(productsData || []);
      }

      // Fetch brands
      const { data: brandsData, error: brandsError } = await supabase
        .from('brands')
        .select('name')
        .order('name');

      if (!brandsError && brandsData) {
        setBrands(brandsData.map(b => b.name));
      }

      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('name')
        .order('name');

      if (!categoriesError && categoriesData) {
        setCategories(categoriesData.map(c => c.name));
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  // Apply brand filter from URL params on initial load
  useEffect(() => {
    const brandParam = searchParams.get('brand');
    if (brandParam && brands.length > 0) {
      // Check if the brand exists in our brands list
      const matchingBrand = brands.find(b => b.toLowerCase() === brandParam.toLowerCase());
      if (matchingBrand && !selectedBrands.includes(matchingBrand)) {
        setSelectedBrands([matchingBrand]);
      }
    }
  }, [searchParams, brands]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Search filter
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }

      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false;
      }

      // Price filter
      if (product.price && (product.price < priceRange[0] || product.price > priceRange[1])) {
        return false;
      }

      return true;
    });

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-high":
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return filtered;
  }, [products, searchQuery, selectedBrands, selectedCategories, priceRange, sortBy]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedBrands, selectedCategories, priceRange, sortBy]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedBrands([]);
    setSelectedCategories([]);
    setPriceRange([0, 3000]);
    setCurrentPage(1);
  };

  const applyMobileFilters = () => {
    setSearchQuery(tempSearchQuery);
    setSelectedBrands(tempSelectedBrands);
    setSelectedCategories(tempSelectedCategories);
    setPriceRange(tempPriceRange);
    setShowFilters(false);
  };

  const openMobileFilters = () => {
    // Sync temp states with current filters when opening
    setTempSearchQuery(searchQuery);
    setTempSelectedBrands(selectedBrands);
    setTempSelectedCategories(selectedCategories);
    setTempPriceRange(priceRange);
    setShowFilters(true);
  };

  const clearMobileFilters = () => {
    setTempSearchQuery("");
    setTempSelectedBrands([]);
    setTempSelectedCategories([]);
    setTempPriceRange([0, 3000]);
  };

  const toggleTempBrand = (brand: string) => {
    setTempSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const toggleTempCategory = (category: string) => {
    setTempSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <SEO 
        title="IT Products & Hardware - Computers, Printers, Networking | SK Enterprise UAE"
        description="Browse our extensive range of IT products in UAE. HP, Dell, Canon, Brother printers, APC UPS systems, networking equipment, computers and laptops. Quality hardware at competitive prices."
        canonical="https://www.skenterpriseuae.com/products"
      />
      <Navbar />
      
      {loading ? (
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-lg">Loading products...</p>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">All Products</h1>
          <p className="text-gray-200">Browse our complete catalog of technology products</p>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-lg text-gray-900">Filters</h2>
                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700" onClick={clearFilters}>
                  Clear All
                </Button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block text-gray-900">Search</label>
                <div className="relative">
                  <Input 
                    placeholder="Search products..." 
                    className="pr-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              {/* Brand */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-3 block text-gray-900">Brand</label>
                <div className="space-y-2">
                  {brands.map(brand => (
                    <div key={brand} className="flex items-center">
                      <Checkbox 
                        id={brand.toLowerCase()} 
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={() => toggleBrand(brand)}
                      />
                    <label 
                      htmlFor={brand.toLowerCase()} 
                      className="ml-2 text-sm cursor-pointer text-gray-700"
                    >
                      {brand}
                    </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-3 block text-gray-900">Category</label>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category} className="flex items-center">
                      <Checkbox 
                        id={category.toLowerCase().replace(/\s+/g, '-')}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                    <label 
                      htmlFor={category.toLowerCase().replace(/\s+/g, '-')} 
                      className="ml-2 text-sm cursor-pointer text-gray-700"
                    >
                      {category}
                    </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-3 block text-gray-900">Price Range (AED)</label>
                <Slider
                  defaultValue={[0, 3000]}
                  max={3000}
                  step={50}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-3"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>AED {priceRange[0]}</span>
                  <span>AED {priceRange[1]}</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Mobile Filters Sheet */}
          <Sheet open={showFilters} onOpenChange={setShowFilters}>
            <SheetContent side="left" className="w-full sm:w-96 overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              
              <div className="py-6 space-y-6">
                {/* Search */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Search</label>
                  <div className="relative">
                    <Input 
                      placeholder="Search products..." 
                      className="pr-10"
                      value={tempSearchQuery}
                      onChange={(e) => setTempSearchQuery(e.target.value)}
                    />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                {/* Brand */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Brand</label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {brands.map(brand => (
                      <div key={brand} className="flex items-center">
                        <Checkbox 
                          id={`mobile-${brand.toLowerCase()}`}
                          checked={tempSelectedBrands.includes(brand)}
                          onCheckedChange={() => toggleTempBrand(brand)}
                        />
                        <label 
                          htmlFor={`mobile-${brand.toLowerCase()}`}
                          className="ml-2 text-sm cursor-pointer"
                        >
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Category</label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {categories.map(category => (
                      <div key={category} className="flex items-center">
                        <Checkbox 
                          id={`mobile-${category.toLowerCase().replace(/\s+/g, '-')}`}
                          checked={tempSelectedCategories.includes(category)}
                          onCheckedChange={() => toggleTempCategory(category)}
                        />
                        <label 
                          htmlFor={`mobile-${category.toLowerCase().replace(/\s+/g, '-')}`}
                          className="ml-2 text-sm cursor-pointer"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Price Range (AED)</label>
                  <Slider
                    max={3000}
                    step={50}
                    value={tempPriceRange}
                    onValueChange={setTempPriceRange}
                    className="mb-3"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>AED {tempPriceRange[0]}</span>
                    <span>AED {tempPriceRange[1]}</span>
                  </div>
                </div>
              </div>

              <SheetFooter className="flex-row gap-2">
                <Button variant="outline" onClick={clearMobileFilters} className="flex-1">
                  Clear All
                </Button>
                <Button onClick={applyMobileFilters} className="flex-1">
                  Apply Filters
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          {/* Main Content */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <p className="text-gray-400">
                Showing <span className="font-semibold text-white">{startIndex + 1}-{Math.min(endIndex, filteredProducts.length)}</span> of {filteredProducts.length} products
              </p>

              <div className="flex gap-3 w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  className="lg:hidden gap-2 bg-white text-black border-white hover:bg-gray-100"
                  onClick={openMobileFilters}
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </Button>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-48 bg-white text-black border-white">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="relevance">Most Relevant</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="name">Name: A to Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {currentProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    id={product.id}
                    name={product.name}
                    price={product.price || 0}
                    image={product.images[0] || ''}
                    category={product.category}
                    inStock={product.in_stock}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No products found matching your filters.</p>
                <Button onClick={clearFilters} className="mt-4 bg-white text-black hover:bg-gray-100">Clear Filters</Button>
              </div>
            )}

            {/* Pagination */}
            {filteredProducts.length > ITEMS_PER_PAGE && (
              <div className="mt-12 flex flex-wrap justify-center items-center gap-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  className="bg-white text-black border-white hover:bg-gray-100 disabled:bg-gray-600 disabled:text-gray-400 disabled:border-gray-600"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                {getPageNumbers().map((page, index) => (
                  typeof page === 'number' ? (
                    <Button
                      key={index}
                      variant={currentPage === page ? "default" : "outline"}
                      size="icon"
                      className={currentPage === page ? "bg-red-600 text-white hover:bg-red-700" : "bg-white text-black border-white hover:bg-gray-100"}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  ) : (
                    <span key={index} className="px-2 text-white">
                      {page}
                    </span>
                  )
                ))}
                
                <Button 
                  variant="outline" 
                  size="icon"
                  className="bg-white text-black border-white hover:bg-gray-100 disabled:bg-gray-600 disabled:text-gray-400 disabled:border-gray-600"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  aria-label="Next page"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </main>
        </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Products;
