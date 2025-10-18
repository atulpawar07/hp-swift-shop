import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Package, Headphones, TestTube, Network, Database, Wifi, Shield, Printer, Lock, Monitor, Video, Wrench } from "lucide-react";

const Services = () => {
  const mainServices = [
    {
      icon: Search,
      title: "IT Consulting",
      description: "Expert guidance for your IT infrastructure"
    },
    {
      icon: Package,
      title: "IT Equipment Supply",
      description: "Wide range of IT products and solutions"
    },
    {
      icon: Headphones,
      title: "IT Support",
      description: "24/7 technical support services"
    },
    {
      icon: TestTube,
      title: "Free Trial Hardware",
      description: "Try before you buy options"
    }
  ];

  const serviceCategories = [
    {
      icon: Network,
      title: "Data Communication Networks",
      services: [
        "Network Performance Auditing",
        "Data Network Designing",
        "Network Infrastructure Setup"
      ]
    },
    {
      icon: Database,
      title: "Data Storage and Processing",
      services: [
        "IT Audit & Assessment",
        "Unstructured Data Audit & Optimization",
        "IT Infrastructure Services",
        "Data Backup & Recovery Solutions"
      ]
    },
    {
      icon: Wifi,
      title: "Wireless Networks",
      services: [
        "Wireless Network Auditing",
        "Wireless Network Maintenance",
        "Wireless Networking Solutions",
        "Wireless Site Survey"
      ]
    },
    {
      icon: Shield,
      title: "Cyber Security",
      services: [
        "Corporate Network Security Services",
        "Network Security Auditing",
        "Penetration Testing",
        "Security Compliance"
      ]
    },
    {
      icon: Printer,
      title: "Printing Systems",
      services: [
        "Managed Print Services (Cost-Per-Copy)",
        "Print Auditing",
        "Print Optimization"
      ]
    },
    {
      icon: Lock,
      title: "Site Security",
      services: [
        "Access Control Systems",
        "Surveillance Solutions",
        "Physical Security Integration"
      ]
    },
    {
      icon: Monitor,
      title: "Software Solutions",
      services: [
        "Virtual Desktop Solutions",
        "Server Virtualization",
        "Microsoft Office 365 Migration",
        "Corporate Email Services"
      ]
    },
    {
      icon: Video,
      title: "Multimedia",
      services: [
        "IPTV Systems",
        "Meeting & Conference Room Booking Systems",
        "Audio Visual Solutions"
      ]
    },
    {
      icon: Wrench,
      title: "Vendor Support",
      services: [
        "Aruba Support",
        "Check Point Support",
        "Cisco Support",
        "Dell Support",
        "HPE Support",
        "Huawei Support",
        "Juniper Support",
        "Kaspersky Support"
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-secondary py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">IT Services & Solutions</h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Comprehensive IT solutions to drive your business forward
            </p>
          </div>
        </section>

        {/* Main Services - Icon Cards */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {mainServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div key={index} className="text-center p-6 hover:bg-secondary rounded-lg transition-colors">
                    <div className="w-20 h-20 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Service Categories Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <div key={index} className="bg-secondary rounded-lg overflow-hidden">
                    <div className="bg-accent/50 px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold text-foreground">{category.title}</h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <ul className="space-y-2">
                        {category.services.map((service, serviceIndex) => (
                          <li key={serviceIndex} className="text-sm text-foreground hover:text-primary transition-colors cursor-pointer">
                            {service}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
