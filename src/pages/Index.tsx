import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { CheckCircle } from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";
import { EditButton } from "@/components/admin/EditButton";
import { ContentEditor } from "@/components/admin/ContentEditor";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();
  const { content: statsContent, updateContent: updateStats } = usePageContent('home', 'stats');
  const [editingStats, setEditingStats] = useState(false);

  const features = [
    "Worldwide Sourcing",
    "Broad Range of IT Products and Services",
    "Flexible Logistics",
    "Right Price",
    "Speedy Service"
  ];

  const [partners, setPartners] = useState<{ name: string; logo: string }[]>([]);
  const [editingWelcome, setEditingWelcome] = useState(false);
  const [editingPartners, setEditingPartners] = useState(false);
  const { content: welcomeContent, updateContent: updateWelcome } = usePageContent('home', 'welcome');

  // Legacy logo filename mapping
  const logoMapping: Record<string, string> = {
    'HP': '01_hp.png',
    'Lenovo': '02_lenovo.png',
    'Toshiba': '03_toshiba.png',
    'Dell': '04_dell.png',
    'Sony': '05_sony.png',
    'Compaq': '06_compaq.png',
    'Apple': '07_apple.png',
    'Acer': '08_acer.png',
    'Asus': '09_asus.png',
    'Samsung': '10_samsung.png',
    'APC': '11_apc.png',
    'IBM': '12_ibm.png',
    'Canon': '13_canon.png',
    'Epson': '14_epson.png',
    'Brother': '15_brother.png',
    'D-Link': '16_d-link.png',
    'Cisco': '17_cisco.png',
    'Linksys': '18_linksys.png',
    'Belkin': '19_belkin.png',
    'Netgear': '20_netgear.png',
    'Targus': '21_targus.png',
    'Logitech': '22_logitech.png',
    'Intel': '23_intel.png',
    'Microsoft': '24_microsoft.png',
    'Creative': '25_creative.png',
    'Imation': '26_imation.png',
    'BenQ': '27_benq.png',
    'ViewSonic': '28_viewsonic.png',
    'Gigabyte': '29_gigabyte.png',
    'WD': '30_wd.png',
    'Seagate': '31_seagate.png',
    'Symantec': '32_symantec.png',
    'SanDisk': '33_sandisk.png',
    'Kingston': '34_kingston.png',
    'Iomega': '35_iomega.png',
    'Polycom': '36_polycom.png',
    'Prysm': '37_prysm.png',
    'Aruba': '38_aruba.png',
    'Vaddio': '39_vaddio.png'
  };

  // Fetch partners from brands table
  useEffect(() => {
    const fetchPartners = async () => {
      const { data, error } = await supabase
        .from('brands')
        .select('name, logo_url')
        .eq('is_partner', true)
        .order('display_order');

      if (error) {
        console.error('Error fetching partners:', error);
      } else {
        const partnersList = data?.map((b: any) => ({
          name: b.name,
          logo: b.logo_url || (logoMapping[b.name] ? `/partner_logos_hd_transparent/${logoMapping[b.name]}` : `https://via.placeholder.com/150x60?text=${encodeURIComponent(b.name)}`)
        })) || [];
        setPartners(partnersList);
      }
    };

    fetchPartners();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      <Hero />

      {/* Scoped styles for edit button visibility and partner card/tile contrast */}
      <style>{`
        /* Make Edit buttons clearly visible on dark backgrounds when className="admin-edit-button" is used */
        .admin-edit-button {
          background-color: #bf0d0d !important;
          color: #ffffff !important;
          border-color: rgba(0,0,0,0.12) !important;
          box-shadow: 0 1px 3px rgba(0,0,0,0.12);
          padding: 0.45rem 0.65rem;
          border-radius: 6px;
          font-weight: 600;
        }
        .admin-edit-button:hover {
          background-color: #a60b0b !important;
        }

        /* Featured partner card subtler border and dark text for readability */
        .partner-featured-card {
          border-color: rgba(15,23,42,0.06) !important;
        }

        /* Partner tiles: ensure white background so logos are visible on dark theme */
        .partner-tile {
          background: #ffffff !important;
          border-color: rgba(0,0,0,0.06) !important;
        }
      `}</style>

      {/* Stats Section */}
      {statsContent && (
        <section className="py-12 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="flex justify-end mb-4">
              <EditButton 
                onClick={() => setEditingStats(true)} 
                className="admin-edit-button" 
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{statsContent.years}</div>
                <div className="text-primary-foreground/80">{statsContent.yearsLabel}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{statsContent.clients}</div>
                <div className="text-primary-foreground/80">{statsContent.clientsLabel}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{statsContent.products}</div>
                <div className="text-primary-foreground/80">{statsContent.productsLabel}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{statsContent.satisfaction}</div>
                <div className="text-primary-foreground/80">{statsContent.satisfactionLabel}</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Welcome Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex justify-end mb-4">
            <EditButton 
              onClick={() => setEditingWelcome(true)} 
              className="admin-edit-button" 
            />
          </div>
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
              <h2 className="text-sm text-primary font-semibold mb-2">
                {welcomeContent?.subtitle || 'Welcome to'}
              </h2>
              <h3 className="text-3xl font-bold text-white mb-6">
                {welcomeContent?.title || 'SK Enterprise'}
              </h3>
              
              <p className="text-gray-200 mb-6 leading-relaxed">
                {welcomeContent?.description || 'In today\'s demanding and dynamic world of IT Distribution, it takes a special kind of organization to deliver consistently on all key business metrics: availability, right price, prompt delivery, efficient logistics and top-class service. With decades of experience in worldwide sourcing of IT products and services and robust relationships across the IT value-chain, SK Enterprise is ideally positioned to be your supplier of choice. Whether your needs are a one-time fulfillment or on-going run-rate purchases, you will find the right partner in SK Enterprise.'}
              </p>

              <p className="text-gray-200 mb-8">These are some of our key USPs:</p>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-white">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Brands Section - With Scrollbar */}
      <section className="py-12 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div className="bg-primary text-primary-foreground px-6 py-3 inline-block">
              <h3 className="text-xl font-bold">Our Brands</h3>
            </div>
            <EditButton 
              onClick={() => setEditingPartners(true)} 
              className="admin-edit-button" 
            />
          </div>

          {/* Microsoft Cloud Services - Featured */}
          <div className="mb-8 p-6 partner-featured-card rounded-lg" style={{ background: "linear-gradient(90deg,#eef6ff,#f8fbff)", border: "1px solid rgba(15,23,42,0.06)" }}>
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 bg-white rounded-md p-2" style={{ boxShadow: "0 1px 3px rgba(16,24,40,0.06)" }}>
                <img 
                  src="/partner_logos_hd_transparent/24_microsoft.png" 
                  alt="Microsoft logo" 
                  className="h-20 w-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://via.placeholder.com/150x60?text=Microsoft';
                  }}
                />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-1">Microsoft Cloud Services</h4>
                <p className="text-sm text-gray-700">
                  Authorized partner for Microsoft cloud solutions, Azure, Microsoft 365, and enterprise services
                </p>
              </div>
            </div>
          </div>
          
          {/* Scrollable Brands Grid */}
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-6 min-w-max">
              {partners.map((partner, index) => (
                <div 
                  key={index}
                  className="partner-tile flex items-center justify-center rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer hover:scale-105"
                  style={{ width: '140px', height: '100px', border: '1px solid rgba(0,0,0,0.06)' }}
                  onClick={() => navigate(`/products?brand=${encodeURIComponent(partner.name)}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      navigate(`/products?brand=${encodeURIComponent(partner.name)}`);
                    }
                  }}
                >
                  <img 
                    src={partner.logo} 
                    alt={`${partner.name} logo`} 
                    className="max-h-16 max-w-full object-contain"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = `https://via.placeholder.com/150x60?text=${encodeURIComponent(partner.name)}`;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Edit Stats Dialog */}
      {statsContent && (
        <ContentEditor
          open={editingStats}
          onOpenChange={setEditingStats}
          title="Edit Statistics"
          content={statsContent}
          fields={[
            { key: 'years', label: 'Years Value', type: 'text' },
            { key: 'yearsLabel', label: 'Years Label', type: 'text' },
            { key: 'clients', label: 'Clients Value', type: 'text' },
            { key: 'clientsLabel', label: 'Clients Label', type: 'text' },
            { key: 'products', label: 'Products Value', type: 'text' },
            { key: 'productsLabel', label: 'Products Label', type: 'text' },
            { key: 'satisfaction', label: 'Satisfaction Value', type: 'text' },
            { key: 'satisfactionLabel', label: 'Satisfaction Label', type: 'text' }
          ]}
          onSave={updateStats}
        />
      )}

      {/* Edit Welcome Dialog */}
      {welcomeContent && (
        <ContentEditor
          open={editingWelcome}
          onOpenChange={setEditingWelcome}
          title="Edit Welcome Section"
          content={welcomeContent}
          fields={[
            { key: 'subtitle', label: 'Subtitle', type: 'text' },
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'description', label: 'Description', type: 'textarea', multiline: true }
          ]}
          onSave={updateWelcome}
        />
      )}

      {/* Edit Partners Dialog */}
      <Dialog open={editingPartners} onOpenChange={setEditingPartners}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage Partners</DialogTitle>
            <DialogDescription>
              Partner logos are managed in the Admin Dashboard under the Brands tab.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-300">
              You can add, edit, and upload partner logos from the Admin Dashboard. 
              Click the button below to navigate to the Brands management section.
            </p>
            <Button 
              onClick={() => {
                setEditingPartners(false);
                navigate('/admin/dashboard');
              }}
              className="w-full"
            >
              Go to Admin Dashboard
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
