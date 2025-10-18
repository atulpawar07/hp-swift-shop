import { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { usePageContent } from "@/hooks/usePageContent";
import { EditButton } from "@/components/admin/EditButton";
import { ContentEditor } from "@/components/admin/ContentEditor";

const Contact = () => {
  const { content: heroContent, updateContent: updateHero } = usePageContent('contact', 'hero');
  const { content: contactInfo, updateContent: updateInfo } = usePageContent('contact', 'info');
  
  const [editingHero, setEditingHero] = useState(false);
  const [editingInfo, setEditingInfo] = useState(false);

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
                      <a href={`tel:${contactInfo?.phone}`} className="text-muted-foreground hover:text-primary">
                        {contactInfo?.phone || '+971 563 569089'}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Email</h3>
                      <a href={`mailto:${contactInfo?.email}`} className="text-muted-foreground hover:text-primary">
                        {contactInfo?.email || 'info@skenterprise.ae'}
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
                
                <form className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Name
                    </label>
                    <Input placeholder="Your name" />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Email
                    </label>
                    <Input type="email" placeholder="your.email@example.com" />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Phone
                    </label>
                    <Input type="tel" placeholder="+971 XX XXX XXXX" />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Message
                    </label>
                    <Textarea 
                      placeholder="Tell us about your requirements..." 
                      className="min-h-32"
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
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
