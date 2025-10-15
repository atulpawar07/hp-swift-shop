import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const features = [
    "Worldwide Sourcing",
    "Broad Range of IT Products and Services",
    "Flexible Logistics",
    "Right Price",
    "Speedy Service"
  ];

  const services = [
    "Speed",
    "Consistency",
    "Reliability",
    "Technical Competence",
    "Virtual Integration",
    "Adaptability"
  ];

  const partners = [
    { name: "HP", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/HP_logo_2012.svg/300px-HP_logo_2012.svg.png" },
    { name: "Lenovo", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Lenovo_logo_2015.svg/300px-Lenovo_logo_2015.svg.png" },
    { name: "Toshiba", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Toshiba_logo.svg/300px-Toshiba_logo.svg.png" },
    { name: "Dell", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dell_Logo.svg/300px-Dell_Logo.svg.png" },
    { name: "Sony", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Sony_logo.svg/300px-Sony_logo.svg.png" },
    { name: "Compaq", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Compaq_logo.svg/300px-Compaq_logo.svg.png" },
    { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/200px-Apple_logo_black.svg.png" },
    { name: "Acer", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Acer_2011.svg/300px-Acer_2011.svg.png" },
    { name: "Asus", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/ASUS_Logo.svg/300px-ASUS_Logo.svg.png" },
    { name: "Samsung", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/300px-Samsung_Logo.svg.png" },
    { name: "APC", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/APC_by_Schneider_Electric_logo.svg/300px-APC_by_Schneider_Electric_logo.svg.png" },
    { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/300px-IBM_logo.svg.png" },
    { name: "Canon", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Canon_wordmark.svg/300px-Canon_wordmark.svg.png" },
    { name: "Epson", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Epson_logo.svg/300px-Epson_logo.svg.png" },
    { name: "Brother", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Brother_logo.svg/300px-Brother_logo.svg.png" },
    { name: "D-Link", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/D-Link_logo.svg/300px-D-Link_logo.svg.png" },
    { name: "Cisco", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/300px-Cisco_logo_blue_2016.svg.png" },
    { name: "Linksys", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Linksys_logo.svg/300px-Linksys_logo.svg.png" },
    { name: "Belkin", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Belkin_logo.svg/300px-Belkin_logo.svg.png" },
    { name: "Netgear", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Netgear_logo.svg/300px-Netgear_logo.svg.png" },
    { name: "Targus", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Targus_logo.svg/300px-Targus_logo.svg.png" },
    { name: "Logitech", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Logitech_logo.svg/300px-Logitech_logo.svg.png" },
    { name: "Intel", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Intel_logo_%282006-2020%29.svg/300px-Intel_logo_%282006-2020%29.svg.png" },
    { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/300px-Microsoft_logo_%282012%29.svg.png" },
    { name: "Creative", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Creative_Technology_logo.svg/300px-Creative_Technology_logo.svg.png" },
    { name: "Imation", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Imation_logo.svg/300px-Imation_logo.svg.png" },
    { name: "BenQ", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/BenQ_logo.svg/300px-BenQ_logo.svg.png" },
    { name: "ViewSonic", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/ViewSonic_logo.svg/300px-ViewSonic_logo.svg.png" },
    { name: "Gigabyte", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Gigabyte_Technology_logo.svg/300px-Gigabyte_Technology_logo.svg.png" },
    { name: "Western Digital", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Western_Digital_logo.svg/300px-Western_Digital_logo.svg.png" },
    { name: "Seagate", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Seagate_Technology_logo.svg/300px-Seagate_Technology_logo.svg.png" },
    { name: "Symantec", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Symantec_logo10.svg/300px-Symantec_logo10.svg.png" },
    { name: "SanDisk", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/SanDisk_Logo.svg/300px-SanDisk_Logo.svg.png" },
    { name: "Kingston", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Kingston_Technology_logo.svg/300px-Kingston_Technology_logo.svg.png" },
    { name: "Iomega", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Iomega_logo.svg/300px-Iomega_logo.svg.png" },
    { name: "Polycom", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Polycom_logo.svg/300px-Polycom_logo.svg.png" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />

      {/* Welcome Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Image */}
            <div className="lg:w-1/3">
              <img 
                src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&h=400&fit=crop" 
                alt="Business Partnership" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>

            {/* Content */}
            <div className="lg:w-2/3">
              <h2 className="text-sm text-primary font-semibold mb-2">Welcome to</h2>
              <h3 className="text-3xl font-bold text-foreground mb-6">SK Enterprise</h3>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                In today's demanding and dynamic world of IT Distribution, it takes a special kind of organization to deliver consistently on all key business metrics: availability, right price, prompt delivery, efficient logistics and top-class service. With decades of experience in worldwide sourcing of IT products and services and robust relationships across the IT value-chain, SK Enterprise is ideally positioned to be your supplier of choice. Whether your needs are a one-time fulfillment or on-going run-rate purchases, you will find the right partner in SK Enterprise.
              </p>

              <p className="text-muted-foreground mb-8">These are some of our key USPs:</p>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HP Gold Partner Badge */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-2">Our Services</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-primary">▸</span>
                    <span className="text-foreground">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-accent text-accent-foreground px-8 py-6 rounded-lg">
              <div className="text-center">
                <div className="text-4xl font-bold mb-1">HP</div>
                <div className="text-sm">Gold Partner</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Partners Section */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="bg-primary text-primary-foreground px-6 py-3 mb-8 inline-block">
            <h3 className="text-xl font-bold">Our Partners</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
            {partners.map((partner, index) => (
              <div key={index} className="flex flex-col items-center justify-center p-4 bg-background rounded-lg hover:shadow-md transition-shadow">
                <img 
                  src={partner.logo} 
                  alt={`${partner.name} logo`} 
                  className="max-h-12 w-auto grayscale hover:grayscale-0 transition-all mb-2"
                />
                <span className="text-sm font-medium text-muted-foreground">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
