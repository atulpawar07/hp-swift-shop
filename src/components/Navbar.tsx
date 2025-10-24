import {
  ShoppingCart,
  Phone,
  Home as HomeIcon,
  Info,
  Package,
  Wrench,
  Mail,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo-light.jpeg";

const Navbar = () => {
  const [cartCount] = useState(0);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Strongly scoped CSS using #site-navbar to beat theme overrides */}
      <style>{`
        /* Target the specific navbar by id so it's harder to be overridden */
        #site-navbar { background-color: #000 !important; color: #fff !important; }
        #site-navbar .top-bar { background-color: #000 !important; border-color: rgba(255,255,255,0.06) !important; }
        #site-navbar .logo-box { background: #fff !important; }
        /* Keep primary nav (red) intact but scoped */
        #site-navbar .primary-nav { background-color: var(--primary-color, #bf0d0d) !important; }
      `}</style>

      {/* id used for stronger CSS targeting */}
      <nav
        id="site-navbar"
        className="sticky top-0 z-50"
        aria-label="Primary Navigation"
        style={{ backgroundColor: "#000", color: "#fff" }}
      >
        {/* Top Bar (explicit inline fallback) */}
        <div
          className="top-bar border-b"
          style={{ backgroundColor: "#000", borderColor: "rgba(255,255,255,0.06)" }}
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              {/* Logo (white box) */}
              <Link
                to="/"
                className="logo-box p-2 rounded-md flex items-center justify-center shadow-sm"
                style={{ backgroundColor: "#fff" }}
                aria-label="SK Enterprise Home"
              >
                <img src={logo} alt="SK Enterprise" className="h-16 w-auto object-contain" />
              </Link>

              {/* Right Side actions */}
              <div className="flex items-center gap-3">
                {/* Phone: hidden on xs but visible on md+ */}
                <div className="hidden md:flex items-center gap-2" style={{ color: "#e6e6e6" }}>
                  <Phone className="h-5 w-5 text-primary" />
                  <span className="font-semibold">+971 563 569089</span>
                </div>

                {/* WhatsApp button */}
                <a
                  href="https://wa.me/971563569089?text=Hello%20SK%20Enterprise!%20I%20would%20like%20to%20know%20more%20about%20your%20products."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md transition"
                  style={{ boxShadow: "none" }}
                  aria-label="WhatsApp SK Enterprise"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span className="hidden sm:inline">WhatsApp us</span>
                </a>

                {/* Cart */}
                <Link to="/cart" aria-label="Cart">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative text-white hover:bg-gray-800"
                    style={{ color: "#fff" }}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">
                        {cartCount}
                      </span>
                    )}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Navigation Bar (red) */}
        <div
          className="primary-nav bg-primary text-primary-foreground"
          style={{ backgroundColor: "var(--primary-color, #bf0d0d)" }}
          role="navigation"
          aria-label="Main menu"
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-1">
              <Link to="/">
                <Button
                  variant="ghost"
                  className={`text-primary-foreground hover:bg-primary/90 font-medium rounded-none px-6 py-6 ${
                    isActive("/") ? "bg-primary/90" : ""
                  }`}
                >
                  <HomeIcon className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>

              <Link to="/about">
                <Button
                  variant="ghost"
                  className={`text-primary-foreground hover:bg-primary/90 font-medium rounded-none px-6 py-6 ${
                    isActive("/about") ? "bg-primary/90" : ""
                  }`}
                >
                  <Info className="h-4 w-4 mr-2" />
                  About Us
                </Button>
              </Link>

              <Link to="/products">
                <Button
                  variant="ghost"
                  className={`text-primary-foreground hover:bg-primary/90 font-medium rounded-none px-6 py-6 ${
                    isActive("/products") ? "bg-primary/90" : ""
                  }`}
                >
                  <Package className="h-4 w-4 mr-2" />
                  Products
                </Button>
              </Link>

              <Link to="/services">
                <Button
                  variant="ghost"
                  className={`text-primary-foreground hover:bg-primary/90 font-medium rounded-none px-6 py-6 ${
                    isActive("/services") ? "bg-primary/90" : ""
                  }`}
                >
                  <Wrench className="h-4 w-4 mr-2" />
                  Services
                </Button>
              </Link>

              <Link to="/contact">
                <Button
                  variant="ghost"
                  className={`text-primary-foreground hover:bg-primary/90 font-medium rounded-none px-6 py-6 ${
                    isActive("/contact") ? "bg-primary/90" : ""
                  }`}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
