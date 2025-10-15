import { ShoppingCart, Search, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo-light.jpeg";

const Navbar = () => {
  const [cartCount] = useState(0);

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <span>📧 info@skenterprise.com</span>
            <span className="hidden md:inline">📞 +91 1234567890</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden md:inline">Currency:</span>
            <select className="bg-primary-hover text-primary-foreground border-0 rounded px-2 py-1 text-sm cursor-pointer">
              <option>INR ₹</option>
              <option>USD $</option>
              <option>EUR €</option>
              <option>GBP £</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <img src={logo} alt="SK Enterprise" className="h-12 w-auto" />
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl relative">
            <Input
              type="search"
              placeholder="Search for HP laptops, printers, accessories..."
              className="pr-10"
            />
            <Button size="icon" variant="ghost" className="absolute right-0 top-0">
              <Search className="h-4 w-4" />
            </Button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link to="/admin">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="hidden md:flex items-center gap-6 mt-4 pt-4 border-t border-border">
          <Link to="/products?category=laptops">
            <Button variant="ghost" className="font-medium">Laptops</Button>
          </Link>
          <Link to="/products?category=printers">
            <Button variant="ghost" className="font-medium">Printers</Button>
          </Link>
          <Link to="/products?category=accessories">
            <Button variant="ghost" className="font-medium">Accessories</Button>
          </Link>
          <Link to="/products?brand=hp">
            <Button variant="ghost" className="font-medium">HP Products</Button>
          </Link>
          <Link to="/products?deals=true">
            <Button variant="ghost" className="font-medium text-secondary">Special Offers</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
