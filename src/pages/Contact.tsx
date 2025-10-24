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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

const contactFormSchema = z.object({
  name: z.string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name must be less than 100 characters" })
    .regex(/^[a-zA-Z\s'-]+$/, { message: "Name can only contain letters, spaces, hyphens and apostrophes" }),
  email: z.string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  phone: z.string()
    .trim()
    .min(8, { message: "Phone number must be at least 8 digits" })
    .max(20, { message: "Phone number must be less than 20 characters" })
    .regex(/^[+\d\s()-]+$/, { message: "Invalid phone number format" }),
  message: z.string()
    .trim()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(1000, { message: "Message must be less than 1000 characters" })
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const { content: heroContent, updateContent: updateHero } = usePageContent('contact', 'hero');
  const { content: contactInfo, updateContent: updateInfo } = usePageContent('contact', 'info');
  
  const [editingHero, setEditingHero] = useState(false);
  const [editingInfo, setEditingInfo] = useState(false);
  const [primaryEmail, setPrimaryEmail] = useState('info@skenterprise.ae');
  const [primaryWhatsApp, setPrimaryWhatsApp] = useState('9769805184');
  const [primaryPhone, setPrimaryPhone] = useState('+971 563 569089');

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

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

  const onSubmit = (data: ContactFormData) => {
    try {
      // Sanitize and encode data for WhatsApp
      const whatsappMessage = `New Enquiry:

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}

Message:
${data.message}`;
      
      const encodedWhatsApp = encodeURIComponent(whatsappMessage);
      window.open(`https://wa.me/${primaryWhatsApp}?text=${encodedWhatsApp}`, '_blank');
      
      // Sanitize and encode data for email
      const emailSubject = encodeURIComponent(`New Enquiry from ${data.name}`);
      const emailBody = encodeURIComponent(`Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}

Message:
${data.message}`);
      
      setTimeout(() => {
        window.location.href = `mailto:${primaryEmail}?subject=${emailSubject}&body=${emailBody}`;
      }, 500);

      // Reset form and show success message
      form.reset();
      toast.success("Your enquiry has been submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit enquiry. Please try again.");
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
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone *</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="+971 XX XXX XXXX" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about your requirements..." 
                              className="min-h-32"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting ? "Sending..." : "Send Enquiry"}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      Your enquiry will be sent via WhatsApp and Email
                    </p>
                  </form>
                </Form>
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
