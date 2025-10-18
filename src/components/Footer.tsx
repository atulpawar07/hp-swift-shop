import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-8 mb-4">
          <Link to="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <Link to="/about" className="hover:text-white transition-colors">
            About Us
          </Link>
          <Link to="/products" className="hover:text-white transition-colors">
            Products
          </Link>
          <Link to="/services" className="hover:text-white transition-colors">
            Services
          </Link>
          <Link to="/contact" className="hover:text-white transition-colors">
            Contact Us
          </Link>
        </div>
        
        <div className="text-center text-sm border-t border-gray-700 pt-4">
          <p>© Copyright 2025. SK Enterprise. All Rights Reserved</p>
          <p className="mt-1">
            <span className="text-gray-400">Email: </span>
            <a href="mailto:sales@skenterpriseuae.com" className="hover:text-white">sales@skenterpriseuae.com</a>
            <span className="mx-2">|</span>
            <a href="tel:+971563569089" className="hover:text-white">+971 563 569089</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
