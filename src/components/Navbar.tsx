import { ShoppingCart, Phone, Home as HomeIcon, Info, Package, Wrench, Mail, User, LogOut, Shield, Menu, X, MessageCircle } from "lucide-react";
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
      {/* Top Bar with Logo, WhatsApp and Mobile Menu Trigger */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center gap-3">
            {/* Logo area - will grow on mobile */}
            <Link to="/" className="flex items-center flex-1 min-w-0">
              {/* Allow the link wrapper to grow; img uses object-contain and constrained height */}
              <img
                src={logo}
                alt="SK Enterprise"
                className="w-full max-w-none h-12 sm:h-16 md:h-20 object-contain"
                style={{ maxWidth: '100%' }}
              />
            </Link>

            {/* WhatsApp Button - compact and fixed size, right of logo */}
            <a
              href="https://wa.me/971563569089"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/20 transition-all hover:scale-105 shadow-sm flex-shrink-0"
              title="Chat with us on WhatsApp"
            >
              <MessageCircle className="h-4 w-4 md:h-5 md:w-5" fill="currentColor" />
              {/* hide the label on very small screens so button remains compact */}
              <span className="font-semibold text-xs sm:text-sm md:text-base hidden xs:inline">WhatsApp</span>
            </a>

            {/* User actions (desktop) */}
            <div className="hidden lg:flex items-center gap-1 md:gap-2 flex-shrink-0">
              {user ? (
                <>
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
                </>
              ) : (
                <Link to="/auth">
                  <Button variant="outline" size="sm" className="gap-1 md:gap-2 text-xs md:text-sm px-2 md:px-3">
                    <User className="h-3 w-3 md:h-4 md:w-4" />
                    <span className="hidden sm:inline">Sign In</span>
                  </Button>
                </Link>
              )}

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

            {/* Mobile Menu Trigger (hamburger) - visible only on smaller screens */}
            <div className="lg:hidden flex items-center">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" className="p-2 rounded-md">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>

                <SheetContent side="left" className="w-[280px] bg-background p-0">
                  <div className="flex flex-col h-full">
                    <div className="p-4 border-b border-border flex items-center justify-between">
                      <h2 className="font-semibold text-lg">Navigation</h2>
                      <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                        <X className="h-5 w-5" />
                      </Button>
                    </div>

                    <div className="flex-1 overflow-y-auto py-4">
                      {navigationItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link key={item.path} to={item.path} onClick={() => setMobileMenuOpen(false)}>
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

                      {/* Show account/cart in mobile sheet too */}
                      <div className="px-6 mt-2">
                        {user ? (
                          <>
                            <div className="mb-2">
                              <Button variant="outline" className="w-full justify-start" onClick={() => { setMobileMenuOpen(false); signOut(); }}>
                                <LogOut className="h-4 w-4 mr-2" /> Sign Out
                              </Button>
                            </div>
                            {isAdmin && (
                              <div className="mb-2">
                                <Link to="/admin/dashboard" onClick={() => setMobileMenuOpen(false)}>
                                  <Button className="w-full justify-start">
                                    <Shield className="h-4 w-4 mr-2" /> Admin Panel
                                  </Button>
                                </Link>
                              </div>
                            )}
                          </>
                        ) : (
                          <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                            <Button className="w-full justify-start">
                              <User className="h-4 w-4 mr-2" /> Sign In
                            </Button>
                          </Link>
                        )}

                        <Link to="/cart" onClick={() => setMobileMenuOpen(false)}>
                          <Button className="w-full justify-start mt-2">
                            <ShoppingCart className="h-4 w-4 mr-2" /> View Cart
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
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
    </nav>
  );
};

export default Navbar;
