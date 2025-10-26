import { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Package, Building, Wrench, Network, Users, ShoppingCart, Settings, Database, Shield, Zap, Globe, Smartphone } from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";
import { EditButton } from "@/components/admin/EditButton";
import { ContentEditor } from "@/components/admin/ContentEditor";
import { ServicesEditor } from "@/components/admin/ServicesEditor";

const iconMap: Record<string, any> = {
  Package, Building, Wrench, Network, Users, ShoppingCart,
  Settings, Database, Shield, Zap, Globe, Smartphone
};

const Services = () => {
  const { content: heroContent, updateContent: updateHero } = usePageContent('services', 'hero');
  const { content: servicesContent, updateContent: updateServices } = usePageContent('services', 'services_list');
  
  const [editingHero, setEditingHero] = useState(false);
  const [editingServices, setEditingServices] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-black py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {heroContent?.title || 'Our Services'}
                </h1>
                <p className="text-lg text-gray-200 max-w-3xl">
                  {heroContent?.description || 'Comprehensive IT solutions tailored to your business needs'}
                </p>
              </div>
              <EditButton onClick={() => setEditingHero(true)} />
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">What We Offer</h2>
              <EditButton onClick={() => setEditingServices(true)} />
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicesContent?.services?.map((service: any, index: number) => {
                const Icon = iconMap[service.icon] || Package;
                return (
                  <div key={index} className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-white">{service.title}</h3>
                    <p className="text-gray-200">{service.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">Need a Custom Solution?</h2>
            <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
              Our team of experts is ready to discuss your specific requirements and create a tailored solution for your business.
            </p>
            <a href="/contact">
              <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                Contact Us Today
              </button>
            </a>
          </div>
        </section>
      </main>

      <Footer />

      {/* Edit Dialogs */}
      {heroContent && (
        <ContentEditor
          open={editingHero}
          onOpenChange={setEditingHero}
          title="Edit Hero Section"
          content={heroContent}
          fields={[
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'description', label: 'Description', type: 'textarea' }
          ]}
          onSave={updateHero}
        />
      )}

      {servicesContent && (
        <ServicesEditor
          open={editingServices}
          onOpenChange={setEditingServices}
          content={servicesContent}
          onSave={updateServices}
        />
      )}
    </div>
  );
};

export default Services;
