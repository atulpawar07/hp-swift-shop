import { ShoppingCart, Phone, Home as HomeIcon, Info, Package, Wrench, Mail, User, LogOut, Shield, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logo from "@/assets/logo-light.png";

const Navbar = () => {
  const [cartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navigationItems = [
    { path: '/', label: 'Home', icon: HomeIcon },
    { path: '/about', label: 'About Us', icon: Info },
    { path: '/products', label: 'Products', icon: Package },
    { path: '/services', label: 'Services', icon: Wrench },
    { path: '/contact', label: 'Contact Us', icon: Mail },
  ];

  return (
    <nav className="bg-background sticky top-0 z-50 shadow-sm">
      {/* Top Bar with Logo and Contact */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex justify-between items-center gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center flex-shrink-0">
              <img 
                src={logo} 
                alt="SK Enterprise" 
                className="h-22 md:h-26 lg:h-30 w-auto object-contain max-w-[240px] md:max-w-[320px]" 
              />
            </Link>

            {/* Contact Info & Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Phone - Hidden on very small screens */}
              <a href="tel:+971563569089" className="hidden sm:flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                <Phone className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                <span className="font-semibold text-sm md:text-base whitespace-nowrap">+971 563 569089</span>
              </a>
              
              {/* User Actions - Compact on mobile */}
              {user ? (
                <div className="flex items-center gap-1 md:gap-2">
                  {isAdmin && (
                    <Link to="/admin/dashboard">
                      <Button variant="outline" size="sm" className="gap-1 md:gap-2 text-xs md:text-sm px-2 md:px-3">
                        <Shield className="h-3 w-3 md:h-4 md:w-4" />
                        <span className="hidden md:inline">Admin Panel</span>
                        <span className="md:hidden">Admin</span>
                      </Button>
                    </Link>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => signOut()}
                    className="gap-1 md:gap-2 text-xs md:text-sm px-2 md:px-3"
                  >
                    <LogOut className="h-3 w-3 md:h-4 md:w-4" />
                    <span className="hidden sm:inline">Sign Out</span>
                  </Button>
                </div>
              ) : (
                <Link to="/auth">
                  <Button variant="outline" size="sm" className="gap-1 md:gap-2 text-xs md:text-sm px-2 md:px-3">
                    <User className="h-3 w-3 md:h-4 md:w-4" />
                    <span className="hidden sm:inline">Sign In</span>
                  </Button>
                </Link>
              )}
              
              {/* Cart */}
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative h-8 w-8 md:h-10 md:w-10">
                  <ShoppingCart className="h-4 w-4 md:h-5 md:w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-4 h-4 md:w-5 md:h-5 text-[10px] md:text-xs flex items-center justify-center font-bold">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>
            </div>
          </div>

          {/* Phone Number Row for very small screens */}
          <div className="sm:hidden mt-2 flex items-center gap-2 text-foreground">
            <Phone className="h-4 w-4 flex-shrink-0" />
            <a href="tel:+971563569089" className="font-semibold text-sm hover:text-primary">
              +971 563 569089
            </a>
          </div>
        </div>
      </div>

      {/* Desktop Navigation Bar */}
      <div className="bg-primary text-primary-foreground hidden lg:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.path} to={item.path}>
                  <Button 
                    variant="ghost" 
                    className={`text-primary-foreground hover:bg-primary-hover font-medium rounded-none px-6 py-6 ${isActive(item.path) ? 'bg-primary-hover' : ''}`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Bar */}
      <div className="bg-primary text-primary-foreground lg:hidden">
        <div className="container mx-auto px-4">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                className="text-primary-foreground hover:bg-primary-hover font-medium rounded-none w-full justify-start px-4 py-4"
              >
                <Menu className="h-5 w-5 mr-2" />
                Menu
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] bg-background p-0">
              <div className="flex flex-col h-full">
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <h2 className="font-semibold text-lg">Navigation</h2>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <div className="flex-1 overflow-y-auto py-4">
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link 
                        key={item.path} 
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Button 
                          variant="ghost" 
                          className={`w-full justify-start px-6 py-6 rounded-none font-medium ${isActive(item.path) ? 'bg-accent' : ''}`}
                        >
                          <Icon className="h-5 w-5 mr-3" />
                          {item.label}
                        </Button>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
