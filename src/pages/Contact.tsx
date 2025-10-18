import { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { usePageContent } from "@/hooks/usePageContent";
import { EditButton } from "@/components/admin/EditButton";
import { ContentEditor } from "@/components/admin/ContentEditor";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const { content: heroContent, updateContent: updateHero } = usePageContent('contact', 'hero');
  const { content: contactInfo, updateContent: updateInfo } = usePageContent('contact', 'info');
  
  const [editingHero, setEditingHero] = useState(false);
  const [editingInfo, setEditingInfo] = useState(false);
  const [primaryEmail, setPrimaryEmail] = useState('info@skenterprise.ae');
  const [primaryWhatsApp, setPrimaryWhatsApp] = useState('9769805184');
  const [primaryPhone, setPrimaryPhone] = useState('+971 563 569089');

  useEffect(() => {
    fetchPrimaryContact();
  }, []);

  const fetchPrimaryContact = async () => {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .eq('key', 'primary_contact')
      .maybeSingle();

    if (!error && data) {
      const value = data.value as any;
      setPrimaryEmail(value.email || 'info@skenterprise.ae');
      setPrimaryWhatsApp(value.whatsapp || '9769805184');
      setPrimaryPhone(value.phone || '+971 563 569089');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-secondary py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  {heroContent?.title || 'Contact Us'}
                </h1>
                <p className="text-lg text-muted-foreground max-w-3xl">
                  {heroContent?.description || 'Get in touch with our team for any inquiries or support'}
                </p>
              </div>
              <EditButton onClick={() => setEditingHero(true)} />
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-bold text-foreground">Get In Touch</h2>
                  <EditButton onClick={() => setEditingInfo(true)} />
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                      <a href={`tel:${primaryPhone}`} className="text-muted-foreground hover:text-primary">
                        {primaryPhone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Email</h3>
                      <a href={`mailto:${primaryEmail}`} className="text-muted-foreground hover:text-primary">
                        {primaryEmail}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Location</h3>
                      <p className="text-muted-foreground">
                        {contactInfo?.address || 'Dubai, United Arab Emirates'}
                      </p>
                    </div>
                  </div>

                  {contactInfo?.hours && (
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Business Hours</h3>
                        <p className="text-muted-foreground whitespace-pre-line">
                          {contactInfo.hours}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-card border border-border rounded-lg p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>
                
                <form 
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const name = formData.get('name');
                    const email = formData.get('email');
                    const phone = formData.get('phone');
                    const message = formData.get('message');
                    
                    // Send to WhatsApp
                    const whatsappMessage = `New Enquiry:%0D%0A%0D%0AName: ${name}%0D%0AEmail: ${email}%0D%0APhone: ${phone}%0D%0A%0D%0AMessage:%0D%0A${message}`;
                    window.open(`https://wa.me/${primaryWhatsApp}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
                    
                    // Also send to email
                    const emailSubject = `New Enquiry from ${name}`;
                    const emailBody = `Name: ${name}%0D%0AEmail: ${email}%0D%0APhone: ${phone}%0D%0A%0D%0AMessage:%0D%0A${message}`;
                    setTimeout(() => {
                      window.location.href = `mailto:${primaryEmail}?subject=${emailSubject}&body=${emailBody}`;
                    }, 500);
                  }}
                >
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Name *
                    </label>
                    <Input name="name" placeholder="Your name" required />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Email *
                    </label>
                    <Input name="email" type="email" placeholder="your.email@example.com" required />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Phone *
                    </label>
                    <Input name="phone" type="tel" placeholder="+971 XX XXX XXXX" required />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Message *
                    </label>
                    <Textarea 
                      name="message"
                      placeholder="Tell us about your requirements..." 
                      className="min-h-32"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Send Enquiry
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Your enquiry will be sent via WhatsApp and Email
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Edit Dialogs */}
      {heroContent && (
        <ContentEditor
          open={editingHero}
          onOpenChange={setEditingHero}
          title="Edit Contact Hero"
          content={heroContent}
          fields={[
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'description', label: 'Description', type: 'textarea' }
          ]}
          onSave={updateHero}
        />
      )}

      {contactInfo && (
        <ContentEditor
          open={editingInfo}
          onOpenChange={setEditingInfo}
          title="Edit Contact Information"
          content={contactInfo}
          fields={[
            { key: 'phone', label: 'Phone Number', type: 'text' },
            { key: 'email', label: 'Email Address', type: 'text' },
            { key: 'address', label: 'Address', type: 'textarea' },
            { key: 'hours', label: 'Business Hours', type: 'textarea', multiline: true }
          ]}
          onSave={updateInfo}
        />
      )}
    </div>
  );
};

export default Contact;
