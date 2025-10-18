import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white">
      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Advance<br />
            <span className="text-4xl md:text-5xl font-normal">technology</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-300 leading-relaxed max-w-2xl">
            Established as a premier IT distribution company in UAE, SK Enterprise is your trusted partner for technology products and IT solutions. We deliver consistently on all key business metrics: availability, right price, prompt delivery, efficient logistics and top-class service.
          </p>
          <Link to="/products">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8">
              View Our Products
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Decorative element */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block opacity-20">
        <div className="relative h-full w-full">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-gray-900"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
