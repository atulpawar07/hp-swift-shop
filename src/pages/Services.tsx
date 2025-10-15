import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Zap, TrendingUp, Shield, Wrench, Globe, Settings } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Zap,
      title: "Speed",
      description: "Quick turnaround times and fast delivery to keep your business moving forward."
    },
    {
      icon: TrendingUp,
      title: "Consistency",
      description: "Reliable and consistent service quality across all interactions and transactions."
    },
    {
      icon: Shield,
      title: "Reliability",
      description: "Dependable service you can count on for all your IT distribution needs."
    },
    {
      icon: Wrench,
      title: "Technical Competence",
      description: "Expert knowledge and technical support for all HP products and solutions."
    },
    {
      icon: Globe,
      title: "Virtual Integration",
      description: "Seamless integration with your business processes and supply chain."
    },
    {
      icon: Settings,
      title: "Adaptability",
      description: "Flexible solutions that adapt to your changing business requirements."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-secondary py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Services</h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Comprehensive IT distribution solutions tailored to your business needs
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div key={index} className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What We Offer</h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-background p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Product Distribution</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• HP Laptops & Desktops</li>
                  <li>• Printers & Scanners</li>
                  <li>• Computer Accessories</li>
                  <li>• Enterprise Solutions</li>
                </ul>
              </div>

              <div className="bg-background p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Support Services</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Technical Support</li>
                  <li>• Warranty Management</li>
                  <li>• Bulk Order Processing</li>
                  <li>• Custom Solutions</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
