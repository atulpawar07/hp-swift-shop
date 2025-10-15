import { Button } from "@/components/ui/button";
import { ChevronRight, Shield, Truck, Headphones } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary via-primary-hover to-primary overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIuNSIgb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-10"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white space-y-6">
            <div className="inline-block bg-secondary/20 backdrop-blur-sm px-4 py-2 rounded-full text-secondary font-semibold text-sm border border-secondary/30">
              🎯 Authorized HP Distributor
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Enterprise IT
              <span className="block text-secondary">Solutions</span>
            </h1>
            
            <p className="text-xl text-white/90 leading-relaxed max-w-xl">
              Your trusted partner for HP laptops, printers, and computer accessories. 
              Quality products with competitive pricing and reliable delivery.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/products">
                <Button size="lg" variant="secondary" className="group">
                  Shop Now
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/products?deals=true">
                <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
                  View Offers
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/20">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-secondary" />
                <span className="text-sm text-white/90">Authorized Dealer</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-secondary" />
                <span className="text-sm text-white/90">Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Headphones className="h-5 w-5 text-secondary" />
                <span className="text-sm text-white/90">24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Hero Image Placeholder - will generate */}
          <div className="hidden md:block relative">
            <div className="aspect-square bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 flex items-center justify-center">
              <div className="text-center text-white/60">
                <p className="text-lg">HP Product Showcase</p>
                <p className="text-sm mt-2">(Product images will be added)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
