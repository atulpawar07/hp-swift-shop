import { useState, useEffect } from "react";
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
import { z } from "zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Form validation schema
const contactFormSchema = z.object({
  name: z.string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be less than 100 characters" }),
  email: z.string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  phone: z.string()
    .trim()
    .min(1, { message: "Phone number is required" })
    .regex(/^[\d\s+()-]+$/, { message: "Please enter a valid phone number (digits, spaces, +, -, () only)" })
    .min(8, { message: "Phone number must be at least 8 digits" })
    .max(20, { message: "Phone number must be less than 20 characters" }),
  message: z.string()
    .trim()
    .min(1, { message: "Message is required" })
    .max(2000, { message: "Message must be less than 2000 characters" })
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const { content: heroContent, updateContent: updateHero } = usePageContent(
    "contact",
    "hero"
  );
  const { content: contactInfo, updateContent: updateInfo } = usePageContent(
    "contact",
    "info"
  );

  const [editingHero, setEditingHero] = useState(false);
  const [editingInfo, setEditingInfo] = useState(false);

  const [primaryEmail, setPrimaryEmail] = useState("info@skenterprise.ae");
  const [primaryWhatsApp, setPrimaryWhatsApp] = useState("9769805184");
  const [primaryPhone, setPrimaryPhone] = useState("+971 563 569089");

  // channel: 'whatsapp' | 'email' | 'both'
  const [sendChannel, setSendChannel] = useState<"whatsapp" | "email" | "both">(
    "whatsapp"
  );

  // Form setup with validation
  const form = useForm<ContactFormValues>({
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
      .from("settings")
      .select("*")
      .eq("key", "primary_contact")
      .maybeSingle();

    if (!error && data) {
      let value = data.value;
      try {
        if (typeof value === "string") {
          value = JSON.parse(value);
        }
      } catch (e) {
        // ignore
      }

      if (value && typeof value === "object" && !Array.isArray(value)) {
        const obj = value as Record<string, any>;
        setPrimaryEmail(
          (obj.email || obj.email_address) || "sales@skenterpriseuae.com"
        );
        const wp =
          obj.whatsapp || obj.whatsapp_number || obj.phone || "+971563569089";
        setPrimaryWhatsApp(wp);
        setPrimaryPhone(obj.phone || obj.telephone || "+971563569089");
      }
    }
  };

  const sanitizeWhatsappNumber = (raw: string) => {
    const digits = String(raw).replace(/\D+/g, "");
    return digits;
  };

  const onSubmit = (data: ContactFormValues) => {
    const { name, email, phone, message } = data;

    const plainMessage = [
      "New Enquiry:",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      "",
      "Message:",
      message,
    ].join("\n");

    const encodedForWhatsApp = encodeURIComponent(plainMessage);
    const emailSubject = encodeURIComponent(`New Enquiry from ${name}`);
    const emailBody = encodeURIComponent(plainMessage);
    const wpNumber = sanitizeWhatsappNumber(primaryWhatsApp);

    if (sendChannel === "whatsapp") {
      window.open(
        `https://wa.me/${wpNumber}?text=${encodedForWhatsApp}`,
        "_blank"
      );
      toast.success("Opening WhatsApp...");
      form.reset();
      return;
    }

    if (sendChannel === "email") {
      window.location.href = `mailto:${primaryEmail}?subject=${emailSubject}&body=${emailBody}`;
      toast.success("Opening email client...");
      form.reset();
      return;
    }

    if (sendChannel === "both") {
      window.open(
        `https://wa.me/${wpNumber}?text=${encodedForWhatsApp}`,
        "_blank"
      );
      setTimeout(() => {
        window.location.href = `mailto:${primaryEmail}?subject=${emailSubject}&body=${emailBody}`;
      }, 600);
      toast.success("Opening WhatsApp and Email...");
      form.reset();
    }
  };

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
                  {heroContent?.title || "Contact Us"}
                </h1>
                <p className="text-lg text-gray-200 max-w-3xl">
                  {heroContent?.description ||
                    "Get in touch with our team for any inquiries or support"}
                </p>
              </div>
              <EditButton onClick={() => setEditingHero(true)} />
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-bold text-white">Get In Touch</h2>
                  <EditButton onClick={() => setEditingInfo(true)} />
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Phone</h3>
                      <a
                        href={`tel:${primaryPhone}`}
                        className="text-gray-200 hover:text-primary"
                      >
                        {primaryPhone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Email</h3>
                      <a
                        href={`mailto:${primaryEmail}`}
                        className="text-gray-200 hover:text-primary"
                      >
                        {primaryEmail}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Location</h3>
                      <p className="text-gray-200">
                        {contactInfo?.address || "Dubai, United Arab Emirates"}
                      </p>
                    </div>
                  </div>

                  {contactInfo?.hours && (
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white mb-1">
                          Business Hours
                        </h3>
                        <p className="text-gray-200 whitespace-pre-line">
                          {contactInfo.hours}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

             {/* Contact Form */}
<div className="bg-black border border-gray-800 rounded-lg p-8 shadow-lg">
  <h2 className="text-2xl font-bold text-white mb-6">
    Send us a Message
  </h2>

  <Form {...form}>
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Name *</FormLabel>
            <FormControl>
              <Input
                placeholder="Your name"
                className="bg-neutral-900 text-white border-gray-700 placeholder:text-gray-400"
                {...field}
              />
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
            <FormLabel className="text-white">Email *</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="your.email@example.com"
                className="bg-neutral-900 text-white border-gray-700 placeholder:text-gray-400"
                {...field}
              />
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
            <FormLabel className="text-white">Phone *</FormLabel>
            <FormControl>
              <Input
                type="tel"
                placeholder="+971 XX XXX XXXX"
                className="bg-neutral-900 text-white border-gray-700 placeholder:text-gray-400"
                {...field}
              />
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
            <FormLabel className="text-white">Message *</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Tell us about your requirements..."
                className="bg-neutral-900 text-white border-gray-700 placeholder:text-gray-400 min-h-[8rem]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Send via selector — only WhatsApp and Email */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <label className="text-sm font-medium mr-2 text-white">Send via:</label>
        <div className="flex items-center gap-3">
          <label className="inline-flex items-center gap-2 cursor-pointer text-white">
            <input
              type="radio"
              name="sendChannel"
              value="whatsapp"
              checked={sendChannel === "whatsapp"}
              onChange={() => setSendChannel("whatsapp")}
              className="accent-primary"
            />
            <span>WhatsApp</span>
          </label>

          <label className="inline-flex items-center gap-2 cursor-pointer text-white">
            <input
              type="radio"
              name="sendChannel"
              value="email"
              checked={sendChannel === "email"}
              onChange={() => setSendChannel("email")}
              className="accent-primary"
            />
            <span>Email</span>
          </label>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-red-700 hover:bg-red-600 text-white font-semibold"
        disabled={form.formState.isSubmitting}
      >
        Send Enquiry
      </Button>

      <p className="text-xs text-gray-400 text-center">
        Your enquiry will be sent via the selected method.
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
            { key: "title", label: "Title", type: "text" },
            { key: "description", label: "Description", type: "textarea" },
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
            { key: "phone", label: "Phone Number", type: "text" },
            { key: "email", label: "Email Address", type: "text" },
            { key: "address", label: "Address", type: "textarea" },
            { key: "hours", label: "Business Hours", type: "textarea", multiline: true },
          ]}
          onSave={updateInfo}
        />
      )}
    </div>
  );
};

export default Contact;
