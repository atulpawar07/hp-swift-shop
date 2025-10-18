import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Package, Headphones, TestTube, Network, Database, Wifi, Shield, Printer, Lock, Monitor, Video, Wrench } from "lucide-react";

const Services = () => {
  const mainServices = [
    {
      icon: Search,
      title: "IT Consulting",
      description: "Professional evaluation of your technology infrastructure to identify optimization opportunities and create strategic IT roadmaps aligned with business objectives"
    },
    {
      icon: Package,
      title: "IT Equipment Supply",
      description: "Comprehensive procurement solutions offering a vast selection of hardware and technology products from leading global manufacturers"
    },
    {
      icon: Headphones,
      title: "IT Support",
      description: "Round-the-clock technical assistance ensuring continuous availability and peak performance of your IT systems and infrastructure"
    },
    {
      icon: TestTube,
      title: "Free Trial Hardware",
      description: "Experience cutting-edge technology firsthand with our complimentary equipment testing program before making purchase decisions"
    }
  ];

  const serviceCategories = [
    {
      icon: Network,
      title: "Data Communication Networks",
      services: [
        {
          name: "Network Performance Auditing",
          description: "Thorough evaluation of network infrastructure to prevent failures, identify performance bottlenecks, and ensure optimal operational efficiency"
        },
        {
          name: "Data Network Designing",
          description: "Custom network architecture development tailored to meet specific business requirements and future scalability needs"
        },
        {
          name: "Network Infrastructure Setup",
          description: "Complete installation and configuration of enterprise-grade networking equipment and connectivity solutions"
        }
      ]
    },
    {
      icon: Database,
      title: "Data Storage and Processing",
      services: [
        {
          name: "IT Audit & Assessment",
          description: "In-depth analysis of IT systems to evaluate performance levels, identify vulnerabilities, and establish effective risk management strategies"
        },
        {
          name: "Unstructured Data Audit & Optimization",
          description: "Systematic review and organization of file servers to improve data accessibility and reduce storage costs"
        },
        {
          name: "IT Infrastructure Services",
          description: "Comprehensive management and maintenance of servers, storage systems, and computing resources for optimal business operations"
        },
        {
          name: "Data Backup & Recovery Solutions",
          description: "Robust protection strategies ensuring business continuity through reliable data backup systems and disaster recovery planning"
        }
      ]
    },
    {
      icon: Wifi,
      title: "Wireless Networks",
      services: [
        {
          name: "Wireless Network Auditing",
          description: "Complete assessment of WiFi infrastructure to verify coverage quality, signal strength, and security compliance"
        },
        {
          name: "Wireless Network Maintenance",
          description: "Ongoing monitoring and optimization of wireless systems to maintain consistent performance and reliability"
        },
        {
          name: "Wireless Networking Solutions",
          description: "Design and deployment of enterprise WiFi systems providing seamless connectivity across office environments"
        },
        {
          name: "Wireless Site Survey",
          description: "Detailed facility analysis to determine optimal access point placement and ensure comprehensive wireless coverage"
        }
      ]
    },
    {
      icon: Shield,
      title: "Cyber Security",
      services: [
        {
          name: "Corporate Network Security Services",
          description: "Multi-layered protection strategies safeguarding your network from unauthorized access, malware threats, and data breaches"
        },
        {
          name: "Network Security Auditing",
          description: "Systematic evaluation of security measures to identify vulnerabilities and strengthen defense mechanisms against cyber threats"
        },
        {
          name: "Penetration Testing",
          description: "Simulated cyber attacks conducted by security experts to uncover weaknesses before malicious actors can exploit them"
        },
        {
          name: "Security Compliance",
          description: "Implementation of security standards and regulatory requirements to meet industry compliance obligations"
        }
      ]
    },
    {
      icon: Printer,
      title: "Printing Systems",
      services: [
        {
          name: "Managed Print Services (Cost-Per-Copy)",
          description: "Flexible pricing model providing comprehensive printing solutions with predictable per-page costs and full maintenance coverage"
        },
        {
          name: "Print Auditing",
          description: "Detailed analysis of printing activities to track usage patterns, identify inefficiencies, and control operational expenses"
        },
        {
          name: "Print Optimization",
          description: "Strategic improvements to printing workflows reducing waste, lowering costs, and enhancing document management efficiency"
        }
      ]
    },
    {
      icon: Lock,
      title: "Site Security",
      services: [
        {
          name: "Access Control Systems",
          description: "Advanced entry management solutions regulating physical access to facilities through electronic authentication and monitoring"
        },
        {
          name: "Surveillance Solutions",
          description: "High-definition CCTV systems providing continuous monitoring and recording capabilities for enhanced premises security"
        },
        {
          name: "Physical Security Integration",
          description: "Unified security platforms combining multiple protection systems into a cohesive management solution"
        }
      ]
    },
    {
      icon: Monitor,
      title: "Software Solutions",
      services: [
        {
          name: "Virtual Desktop Solutions",
          description: "Centralized desktop environments allowing users to access their workstations remotely from any device or location"
        },
        {
          name: "Server Virtualization",
          description: "Technology platform maximizing hardware utilization by running multiple virtual machines on single physical servers"
        },
        {
          name: "Microsoft Office 365 Migration",
          description: "Smooth transition services moving email, documents, and collaboration tools to cloud-based Microsoft 365 platform"
        },
        {
          name: "Corporate Email Services",
          description: "Professional email hosting and management solutions with enhanced security features and reliable uptime guarantees"
        }
      ]
    },
    {
      icon: Video,
      title: "Multimedia",
      services: [
        {
          name: "IPTV Systems",
          description: "Television content delivery over IP networks enabling flexible distribution of live broadcasts and on-demand programming"
        },
        {
          name: "Meeting & Conference Room Booking Systems",
          description: "Smart scheduling platforms streamlining room reservations and optimizing utilization of collaborative spaces"
        },
        {
          name: "Audio Visual Solutions",
          description: "Professional AV installations featuring presentation systems, sound equipment, and interactive display technologies"
        }
      ]
    },
    {
      icon: Wrench,
      title: "Vendor Support",
      services: [
        {
          name: "Aruba Support",
          description: "Expert assistance for Aruba networking equipment"
        },
        {
          name: "Check Point Support",
          description: "Professional support for Check Point security solutions"
        },
        {
          name: "Cisco Support",
          description: "Certified support services for Cisco infrastructure"
        },
        {
          name: "Dell Support",
          description: "Technical support for Dell hardware and systems"
        },
        {
          name: "HPE Support",
          description: "Specialized support for HPE enterprise solutions"
        },
        {
          name: "Huawei Support",
          description: "Expert maintenance for Huawei technology products"
        },
        {
          name: "Juniper Support",
          description: "Professional services for Juniper networking equipment"
        },
        {
          name: "Kaspersky Support",
          description: "Comprehensive support for Kaspersky security software"
        }
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
                  <div key={index} className="bg-secondary rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="bg-primary/10 px-6 py-4 border-b border-border">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold text-foreground">{category.title}</h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <ul className="space-y-4">
                        {category.services.map((service, serviceIndex) => (
                          <li key={serviceIndex} className="group">
                            <div className="font-medium text-foreground group-hover:text-primary transition-colors cursor-pointer mb-1">
                              {service.name}
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {service.description}
                            </p>
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
