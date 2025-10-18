import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import PartnerCarousel from "@/components/PartnerCarousel";
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
    { name: "HP", logo: "/partner_logos_hd_transparent/01_hp.png" },
    { name: "Lenovo", logo: "/partner_logos_hd_transparent/02_lenovo.png" },
    { name: "Toshiba", logo: "/partner_logos_hd_transparent/03_toshiba.png" },
    { name: "Dell", logo: "/partner_logos_hd_transparent/04_dell.png" },
    { name: "Sony", logo: "/partner_logos_hd_transparent/05_sony.png" },
    { name: "Compaq", logo: "/partner_logos_hd_transparent/06_compaq.png" },
    { name: "Apple", logo: "/partner_logos_hd_transparent/07_apple.png" },
    { name: "Acer", logo: "/partner_logos_hd_transparent/08_acer.png" },
    { name: "Asus", logo: "/partner_logos_hd_transparent/09_asus.png" },
    { name: "Samsung", logo: "/partner_logos_hd_transparent/10_samsung.png" },
    { name: "APC", logo: "/partner_logos_hd_transparent/11_apc.png" },
    { name: "IBM", logo: "/partner_logos_hd_transparent/12_ibm.png" },
    { name: "Canon", logo: "/partner_logos_hd_transparent/13_canon.png" },
    { name: "Epson", logo: "/partner_logos_hd_transparent/14_epson.png" },
    { name: "Brother", logo: "/partner_logos_hd_transparent/15_brother.png" },
    { name: "D-Link", logo: "/partner_logos_hd_transparent/16_d-link.png" },
    { name: "Cisco", logo: "/partner_logos_hd_transparent/17_cisco.png" },
    { name: "Linksys", logo: "/partner_logos_hd_transparent/18_linksys.png" },
    { name: "Belkin", logo: "/partner_logos_hd_transparent/19_belkin.png" },
    { name: "Netgear", logo: "/partner_logos_hd_transparent/20_netgear.png" },
    { name: "Targus", logo: "/partner_logos_hd_transparent/21_targus.png" },
    { name: "Logitech", logo: "/partner_logos_hd_transparent/22_logitech.png" },
    { name: "Intel", logo: "/partner_logos_hd_transparent/23_intel.png" },
    { name: "Microsoft", logo: "/partner_logos_hd_transparent/24_microsoft.png" },
    { name: "Creative", logo: "/partner_logos_hd_transparent/25_creative.png" },
    { name: "Imation", logo: "/partner_logos_hd_transparent/26_imation.png" },
    { name: "BenQ", logo: "/partner_logos_hd_transparent/27_benq.png" },
    { name: "ViewSonic", logo: "/partner_logos_hd_transparent/28_viewsonic.png" },
    { name: "Gigabyte", logo: "/partner_logos_hd_transparent/29_gigabyte.png" },
    { name: "Western Digital", logo: "/partner_logos_hd_transparent/30_wd.png" },
    { name: "Seagate", logo: "/partner_logos_hd_transparent/31_seagate.png" },
    { name: "Symantec", logo: "/partner_logos_hd_transparent/32_symantec.png" },
    { name: "SanDisk", logo: "/partner_logos_hd_transparent/33_sandisk.png" },
    { name: "Kingston", logo: "/partner_logos_hd_transparent/34_kingston.png" },
    { name: "Iomega", logo: "/partner_logos_hd_transparent/35_iomega.png" },
    { name: "Polycom", logo: "/partner_logos_hd_transparent/36_polycom.png" },
    { name: "Prysm", logo: "/partner_logos_hd_transparent/37_prysm.png" },
    { name: "Aruba", logo: "/partner_logos_hd_transparent/38_aruba.png" },
    { name: "Vaddio", logo: "/partner_logos_hd_transparent/39_vaddio.png" },
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

      {/* Our Partners Section - Horizontal Scrolling */}
      <section className="py-12 bg-secondary overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="bg-primary text-primary-foreground px-6 py-3 mb-8 inline-block">
            <h3 className="text-xl font-bold">Our Partners</h3>
          </div>
          
          <div className="relative">
            <div className="flex animate-scroll-left" style={{ gap: '8px' }}>
              {/* First set of logos */}
              {partners.map((partner, index) => (
                <div 
                  key={`first-${index}`}
                  className="flex items-center justify-center flex-shrink-0"
                  style={{ width: '120px', height: '64px' }}
                >
                  <img 
                    src={partner.logo} 
                    alt={`${partner.name} logo`} 
                    className="max-h-16 max-w-full object-contain"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = `https://via.placeholder.com/150x60?text=${partner.name}`;
                    }}
                  />
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {partners.map((partner, index) => (
                <div 
                  key={`second-${index}`}
                  className="flex items-center justify-center flex-shrink-0"
                  style={{ width: '120px', height: '64px' }}
                >
                  <img 
                    src={partner.logo} 
                    alt={`${partner.name} logo`} 
                    className="max-h-16 max-w-full object-contain"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = `https://via.placeholder.com/150x60?text=${partner.name}`;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
