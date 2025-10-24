import {
  Home as HomeIcon,
  Info,
  Package,
  Wrench,
  Mail,
  MessageCircle,
  Menu,
  X,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo-light.jpeg";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Scoped CSS to avoid theme overrides */}
      <style>{`
        #site-navbar { background-color: #000 !important; color: #fff !important; }
        #site-navbar .top-bar { background-color: #000 !important; border-color: rgba(255,255,255,0.06) !important; }
        #site-navbar .logo-box { background: #fff !important; }
        #site-navbar .primary-nav { background-color: var(--primary-color, #bf0d0d) !important; }
      `}</style>

      <nav
        id="site-navbar"
        className="sticky top-0 z-50"
        aria-label="Primary Navigation"
        style={{ backgroundColor: "#000", color: "#fff" }}
      >
        {/* Top Bar */}
        <div
          className="top-bar border-b"
          style={{ backgroundColor: "#000", borderColor: "rgba(255,255,255,0.06)" }}
        >
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center justify-between gap-3">
              {/* Logo (white box). Fixed height box, image fills height */}
              <Link
                to="/"
                className="logo-box rounded-md flex items-center justify-center shadow-sm flex-shrink-0 overflow-hidden"
                style={{
                  backgroundColor: "#fff",
                  height: "56px",     // top-bar height
                  width: "auto",
                  padding: "6px 8px",
                }}
                aria-label="SK Enterprise Home"
              >
                <img
                  src={logo}
                  alt="SK Enterprise"
                  className="h-full w-auto object-contain"
                  style={{ display: "block" }}
                />
              </Link>

              {/* Spacer to push actions to right */}
              <div className="flex-1" />

              {/* Right Side actions: phone removed per request */}
              <div className="flex items-center gap-2">
                {/* WhatsApp button: always show text on mobile */}
                <a
                  href="https://wa.me/971563569089?text=Hello%20SK%20Enterprise!%20I%20would%20like%20to%20know%20more%20about%20your%20products."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded-md transition text-sm"
                  style={{ boxShadow: "none" }}
                  aria-label="WhatsApp SK Enterprise"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp us</span>
                </a>

                {/* Admin small button — optional, hidden on smallest screens */}
                <Link to="/admin" aria-label="Admin">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hidden sm:inline-flex items-center gap-2 text-white hover:bg-gray-800 px-2 py-1"
                  >
                    <Shield className="h-4 w-4" />
                    <span className="text-sm">Admin</span>
                  </Button>
                </Link>

                {/* Hamburger for mobile */}
                <button
                  onClick={() => setMobileOpen((s) => !s)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-2"
                  aria-label={mobileOpen ? "Close menu" : "Open menu"}
                >
                  {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
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
            {/* Desktop links */}
            <div className="hidden sm:flex items-center gap-1">
              <Link to="/">
                <Button
                  variant="ghost"
                  className={`text-primary-foreground hover:bg-primary/90 font-medium rounded-none px-6 py-4 ${
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
                  className={`text-primary-foreground hover:bg-primary/90 font-medium rounded-none px-6 py-4 ${
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
                  className={`text-primary-foreground hover:bg-primary/90 font-medium rounded-none px-6 py-4 ${
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
                  className={`text-primary-foreground hover:bg-primary/90 font-medium rounded-none px-6 py-4 ${
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
                  className={`text-primary-foreground hover:bg-primary/90 font-medium rounded-none px-6 py-4 ${
                    isActive("/contact") ? "bg-primary/90" : ""
                  }`}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Us
                </Button>
              </Link>
            </div>

            {/* Mobile menu (slides down) */}
            <div className={`sm:hidden ${mobileOpen ? "block" : "hidden"} py-2`}>
              <div className="flex flex-col gap-2 pb-3">
                <Link to="/" onClick={() => setMobileOpen(false)} className="px-3">
                  <div className={`py-2 rounded-md ${isActive("/") ? "bg-primary/90" : "hover:bg-primary/80"} text-white flex items-center gap-2`}>
                    <HomeIcon className="h-4 w-4" /> Home
                  </div>
                </Link>

                <Link to="/about" onClick={() => setMobileOpen(false)} className="px-3">
                  <div className={`py-2 rounded-md ${isActive("/about") ? "bg-primary/90" : "hover:bg-primary/80"} text-white flex items-center gap-2`}>
                    <Info className="h-4 w-4" /> About Us
                  </div>
                </Link>

                <Link to="/products" onClick={() => setMobileOpen(false)} className="px-3">
                  <div className={`py-2 rounded-md ${isActive("/products") ? "bg-primary/90" : "hover:bg-primary/80"} text-white flex items-center gap-2`}>
                    <Package className="h-4 w-4" /> Products
                  </div>
                </Link>

                <Link to="/services" onClick={() => setMobileOpen(false)} className="px-3">
                  <div className={`py-2 rounded-md ${isActive("/services") ? "bg-primary/90" : "hover:bg-primary/80"} text-white flex items-center gap-2`}>
                    <Wrench className="h-4 w-4" /> Services
                  </div>
                </Link>

                <Link to="/contact" onClick={() => setMobileOpen(false)} className="px-3">
                  <div className={`py-2 rounded-md ${isActive("/contact") ? "bg-primary/90" : "hover:bg-primary/80"} text-white flex items-center gap-2`}>
                    <Mail className="h-4 w-4" /> Contact Us
                  </div>
                </Link>

                <a
                  href="https://wa.me/971563569089"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3"
                >
                  <div className="py-2 rounded-md bg-green-600 text-white flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
