import {
  ShoppingCart,
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

  const isActive = (path: string) => location.pathname === path;

  const navigationItems = [
    { path: "/", label: "Home", icon: HomeIcon },
    { path: "/about", label: "About Us", icon: Info },
    { path: "/products", label: "Products", icon: Package },
    { path: "/services", label: "Services", icon: Wrench },
    { path: "/contact", label: "Contact Us", icon: Mail },
  ];

  return (
    <nav className="bg-background sticky top-0 z-50 shadow-sm">
      {/* Top Bar */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-2 md:py-3">
          <div className="flex items-center justify-between gap-3">
           {/* LEFT: Responsive Logo - Larger and clearer on mobile */}
<div className="flex items-center flex-shrink-0 p-1">
  <Link to="/" className="block">
    <img
      src={logo}
      alt="SK Enterprise"
      className="object-contain"
      style={{
        height: "100px", // ✅ increased height for mobile readability
        width: "auto",
        maxWidth: "200px", // ✅ allows more space for the full logo
        display: "block",
      }}
                />
              </Link>
            </div>

            {/* RIGHT: WhatsApp + Auth + Cart + Menu */}
            <div className="flex items-center gap-3">
              {/* WhatsApp Button */}
              <a
                href="https://wa.me/971563569089?text=Hello"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/10 text-green-700 dark:text-green-300 hover:bg-green-500/20 transition-all shadow-sm"
                title="Chat with us on WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="font-semibold text-sm whitespace-nowrap">
                  WhatsApp us
                </span>
              </a>

              {/* Auth / Admin / Sign Out / Sign In */}
              <div className="flex items-center gap-2">
                {user ? (
                  <>
                    {isAdmin && (
                      <Link to="/admin/dashboard">
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1 text-xs md:text-sm px-2"
                        >
                          <Shield className="h-3 w-3 md:h-4 md:w-4" />
                          <span className="hidden md:inline">Admin</span>
                        </Button>
                      </Link>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => signOut()}
                      className="gap-1 text-xs md:text-sm px-2"
                    >
                      <LogOut className="h-3 w-3 md:h-4 md:w-4" />
                      <span className="hidden sm:inline">Sign Out</span>
                    </Button>
                  </>
                ) : (
                  <Link to="/auth">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1 text-xs md:text-sm px-2"
                    >
                      <User className="h-3 w-3 md:h-4 md:w-4" />
                      <span className="hidden sm:inline">Sign In</span>
                    </Button>
                  </Link>
                )}
              </div>

              {/* Cart */}
              <Link to="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-9 w-9 md:h-10 md:w-10"
                >
                  <ShoppingCart className="h-4 w-4 md:h-5 md:w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-4 h-4 md:w-5 md:h-5 text-[10px] md:text-xs flex items-center justify-center font-bold">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Mobile Menu */}
              <div className="lg:hidden">
                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" className="p-2 rounded-md">
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="left"
                    className="w-[280px] bg-background p-0"
                  >
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

                        <div className="px-6 mt-2">
                          {user ? (
                            <>
                              <div className="mb-2">
                                <Button
                                  variant="outline"
                                  className="w-full justify-start"
                                  onClick={() => {
                                    setMobileMenuOpen(false);
                                    signOut();
                                  }}
                                >
                                  <LogOut className="h-4 w-4 mr-2" /> Sign Out
                                </Button>
                              </div>
                              {isAdmin && (
                                <div className="mb-2">
                                  <Link
                                    to="/admin/dashboard"
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    <Button className="w-full justify-start">
                                      <Shield className="h-4 w-4 mr-2" /> Admin
                                      Panel
                                    </Button>
                                  </Link>
                                </div>
                              )}
                            </>
                          ) : (
                            <Link
                              to="/auth"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <Button className="w-full justify-start">
                                <User className="h-4 w-4 mr-2" /> Sign In
                              </Button>
                            </Link>
                          )}

                          <Link
                            to="/cart"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <Button className="w-full justify-start mt-2">
                              <ShoppingCart className="h-4 w-4 mr-2" /> View
                              Cart
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
      </div>

      {/* Desktop navigation */}
      <div className="bg-primary text-primary-foreground hidden lg:block">
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
    </nav>
  );
};

export default Navbar;
