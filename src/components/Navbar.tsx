import {
  ShoppingCart,
  Phone,
  Home as HomeIcon,
  Info,
  Package,
  Wrench,
  Mail,
  User,
  LogOut,
  Shield,
  Menu,
  X,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo-light.png";

const Navbar = () => {
  const [cartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [coverPhoto, setCoverPhoto] = useState<string>("");
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  useEffect(() => {
    const fetchCoverPhoto = async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("setting_value")
        .eq("setting_key", "cover_photo")
        .maybeSingle();

      if (data?.setting_value && typeof data.setting_value === 'object') {
        const value = data.setting_value as { url?: string };
        if (value.url) {
          setCoverPhoto(value.url);
        }
      }
    };
    fetchCoverPhoto();
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navigationItems = [
    { path: "/", label: "Home", icon: HomeIcon },
    { path: "/about", label: "About Us", icon: Info },
    { path: "/products", label: "Products", icon: Package },
    { path: "/services", label: "Services", icon: Wrench },
    { path: "/contact", label: "Contact Us", icon: Mail },
  ];

  return (
    <nav className="bg-white text-foreground sticky top-0 z-50 shadow-sm" id="site-navbar">
      {/* Scoped CSS to avoid theme overrides and ensure no border between bars */}
      <style>{`
        /* remove any unexpected border on the top-bar and ensure primary-nav sits flush */
        #site-navbar .top-bar { border-bottom: none !important; background-color: #fff !important; }
        #site-navbar .primary-nav { margin-top: 0 !important; background-color: var(--primary-color, #bf0d0d) !important; }
      `}</style>

      {/* Top Bar with Logo and Contact */}
      <div className="top-bar relative overflow-hidden bg-white">
        {/* Cover Photo Background */}
        {coverPhoto ? (
          <div className="absolute inset-0">
            <img
              src={coverPhoto}
              alt="Cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"></div>
          </div>
        ) : (
          <>
            {/* Default gradient background if no cover photo */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-blue-50"></div>
            <div className="absolute inset-0 opacity-[0.03]">
              <div className="absolute inset-0" style={{
                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(0,0,0,.05) 35px, rgba(0,0,0,.05) 70px)`
              }}></div>
            </div>
          </>
        )}

        {/* White background for logo area */}
        <div className="absolute left-0 top-0 bottom-0 w-[320px] md:w-[450px] bg-white"></div>

        <div className="container mx-auto px-4 py-3 md:py-4 relative z-10">
          <div className="flex justify-between items-center gap-4">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center flex-shrink-0"
            >
              <img
                src={logo}
                alt="SK Enterprise"
                className="h-20 md:h-28 lg:h-32 w-auto object-contain max-w-[280px] md:max-w-[400px]"
              />
            </Link>

            {/* Contact Info & Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* WhatsApp Contact - Hidden on very small screens */}
              <a
                href="https://wa.me/971563569089"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-2.5 md:px-3 py-1.5 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/20 transition-all hover:scale-105 shadow-sm"
                title="Chat with us on WhatsApp"
              >
                <MessageCircle className="h-4 w-4 flex-shrink-0" fill="currentColor" />
                <span className="font-semibold text-xs md:text-sm whitespace-nowrap">WhatsApp</span>
              </a>

              {/* User Actions - Compact on mobile */}
              {user ? (
                <div className="flex items-center gap-1 md:gap-2">
                  {isAdmin && (
                    <Link to="/admin/dashboard">
                      <Button
                        size="sm"
                        className="gap-1 md:gap-2 text-xs md:text-sm px-2 md:px-3 bg-blue-600 hover:bg-blue-500 text-white border border-blue-500 transition-colors"
                      >
                        <Shield className="h-3 w-3 md:h-4 md:w-4" />
                        <span className="hidden md:inline">Admin Panel</span>
                        <span className="md:hidden">Admin</span>
                      </Button>
                    </Link>
                  )}

                  <Button
                    size="sm"
                    onClick={() => signOut()}
                    className="gap-1 md:gap-2 text-xs md:text-sm px-2 md:px-3 bg-red-600 hover:bg-red-500 text-white border border-red-500 transition-colors"
                  >
                    <LogOut className="h-3 w-3 md:h-4 md:w-4" />
                    <span className="hidden sm:inline">Sign Out</span>
                  </Button>
                </div>
              ) : (
                <Link to="/auth">
                  <Button
                    size="sm"
                    className="gap-1 md:gap-2 text-xs md:text-sm px-2 md:px-3 bg-blue-600 hover:bg-blue-500 text-white border border-blue-500 transition-colors"
                  >
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

          {/* WhatsApp Contact for very small screens */}
          <div className="sm:hidden mt-2">
            <a
              href="https://wa.me/971563569089"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/20 transition-all active:scale-95 shadow-sm"
              title="Chat with us on WhatsApp"
            >
              <MessageCircle className="h-4 w-4 flex-shrink-0" fill="currentColor" />
              <span className="font-semibold text-sm">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Desktop Navigation Bar */}
      <div className="bg-primary text-primary-foreground hidden lg:block primary-nav" role="navigation" aria-label="Main menu" style={{ marginTop: 0 }}>
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant="ghost"
                    className={`text-primary-foreground hover:bg-primary-hover font-medium rounded-none px-6 py-6 ${
                      isActive(item.path) ? "bg-primary-hover" : ""
                    }`}
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
      <div className="bg-primary text-primary-foreground lg:hidden primary-nav" style={{ marginTop: 0 }}>
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
                          className={`w-full justify-start px-6 py-6 rounded-none font-medium ${
                            isActive(item.path) ? "bg-accent" : ""
                          }`}
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
