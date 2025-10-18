import { ShoppingCart, Phone, Home as HomeIcon, Info, Package, Wrench, Mail, User, LogOut, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/logo-light.png";

const Navbar = () => {
  const [cartCount] = useState(0);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-background">
      {/* Top Bar with Logo and Contact */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src={logo} alt="SK Enterprise" className="h-16 w-auto" />
            </Link>

            {/* Contact Info */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-foreground">
                <Phone className="h-5 w-5" />
                <span className="font-semibold">+971 563 569089</span>
              </div>
              
              {user ? (
                <div className="flex items-center gap-2">
                  {isAdmin && (
                    <Link to="/admin/dashboard">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Shield className="h-4 w-4" />
                        Admin Panel
                      </Button>
                    </Link>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => signOut()}
                    className="gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Link to="/auth">
                  <Button variant="outline" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    Sign In
                  </Button>
                </Link>
              )}
              
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Red Navigation Bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-1">
            <Link to="/">
              <Button 
                variant="ghost" 
                className={`text-primary-foreground hover:bg-primary-hover font-medium rounded-none px-6 py-6 ${isActive('/') ? 'bg-primary-hover' : ''}`}
              >
                <HomeIcon className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
            <Link to="/about">
              <Button 
                variant="ghost" 
                className={`text-primary-foreground hover:bg-primary-hover font-medium rounded-none px-6 py-6 ${isActive('/about') ? 'bg-primary-hover' : ''}`}
              >
                <Info className="h-4 w-4 mr-2" />
                About Us
              </Button>
            </Link>
            <Link to="/products">
              <Button 
                variant="ghost" 
                className={`text-primary-foreground hover:bg-primary-hover font-medium rounded-none px-6 py-6 ${isActive('/products') ? 'bg-primary-hover' : ''}`}
              >
                <Package className="h-4 w-4 mr-2" />
                Products
              </Button>
            </Link>
            <Link to="/services">
              <Button 
                variant="ghost" 
                className={`text-primary-foreground hover:bg-primary-hover font-medium rounded-none px-6 py-6 ${isActive('/services') ? 'bg-primary-hover' : ''}`}
              >
                <Wrench className="h-4 w-4 mr-2" />
                Services
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                variant="ghost" 
                className={`text-primary-foreground hover:bg-primary-hover font-medium rounded-none px-6 py-6 ${isActive('/contact') ? 'bg-primary-hover' : ''}`}
              >
                <Mail className="h-4 w-4 mr-2" />
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
