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
  const [primaryWhatsApp, setPrimaryWhatsApp] = useState("+971563569089");
  const [primaryPhone, setPrimaryPhone] = useState("+971563569089");

  // channel: 'whatsapp' | 'email' | 'both'
  const [sendChannel, setSendChannel] = useState<
    "whatsapp" | "email" | "both"
  >("whatsapp");

  useEffect(() => {
    fetchPrimaryContact();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPrimaryContact = async () => {
    try {
      const { data, error } = await supabase
        .from("settings")
        .select("*")
        .eq("key", "primary_contact")
        .maybeSingle();

      if (error) {
        console.error("Error fetching primary contact:", error);
        return;
      }

      if (!data) return;

      let value: any = data.value;

      // value might be JSON string or object — handle both
      if (typeof value === "string") {
        try {
          value = JSON.parse(value);
        } catch (e) {
          // leave as-is
        }
      }

      if (value && typeof value === "object" && !Array.isArray(value)) {
        const obj = value as Record<string, any>;
        const email =
          (obj.email || obj.email_address || obj.contact_email) ||
          "sales@skenterpriseuae.com";
        const phone =
          (obj.phone || obj.telephone || obj.contact_phone) ||
          "+971563569089";
        const whatsapp =
          (obj.whatsapp || obj.whatsapp_number || obj.contact_whatsapp) ||
          phone;

        setPrimaryEmail(String(email));
        setPrimaryPhone(String(phone));
        setPrimaryWhatsApp(String(whatsapp));
      }
    } catch (err) {
      console.error("Unexpected error fetching contact settings:", err);
    }
  };

  const sanitizeWhatsappNumber = (raw: string) => {
    if (!raw) return "";
    // Remove everything except digits
    const digits = String(raw).replace(/\D+/g, "");
    // If the number looks like local (8-10 digits) and doesn't have country code, you may need to add it externally.
    return digits;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !phone || !message) {
      alert("Please fill all required fields.");
      return;
    }

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

    const wpNumberDigits = sanitizeWhatsappNumber(primaryWhatsApp || primaryPhone);

    // Build URLs
    const waUrl = wpNumberDigits
      ? `https://wa.me/${wpNumberDigits}?text=${encodedForWhatsApp}`
      : null;
    const mailtoUrl = `mailto:${encodeURIComponent(primaryEmail)}?subject=${emailSubject}&body=${emailBody}`;

    if (sendChannel === "whatsapp") {
      if (!waUrl) {
        alert("WhatsApp number not configured.");
        return;
      }
      window.open(waUrl, "_blank");
      return;
    }

    if (sendChannel === "email") {
      window.location.href = mailtoUrl;
      return;
    }

    if (sendChannel === "both") {
      if (!waUrl) {
        // fallback to email if whatsapp missing
        window.location.href = mailtoUrl;
        return;
      }
      window.open(waUrl, "_blank");
      // slight delay to allow the new tab to open first
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 600);
      return;
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
                        <h3 className="font-semibold text-white mb-1">Business Hours</h3>
                        <p className="text-gray-200 whitespace-pre-line">{contactInfo.hours}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-card border border-border rounded-lg p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>

                <form
                  className="space-y-4"
                  onSubmit={handleSubmit}
                  aria-label="Contact form"
                  role="form"
                >
                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">
                      Name *
                    </label>
                    <Input
                      name="name"
                      placeholder="Your name"
                      required
                      className="bg-white text-black"
                      aria-required="true"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">
                      Email *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      required
                      className="bg-white text-black"
                      aria-required="true"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">
                      Phone *
                    </label>
                    <Input
                      name="phone"
                      type="tel"
                      placeholder="+971 XX XXX XXXX"
                      required
                      className="bg-white text-black"
                      aria-required="true"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">
                      Message *
                    </label>
                    <Textarea
                      name="message"
                      placeholder="Tell us about your requirements..."
                      className="min-h-[8rem] bg-white text-black"
                      required
                      aria-required="true"
                    />
                  </div>

                  {/* Channel selector */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <p className="text-sm font-medium text-white mr-2">Send via:</p>
                    <div className="flex items-center gap-3">
                      <label className="inline-flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="sendChannel"
                          value="whatsapp"
                          checked={sendChannel === "whatsapp"}
                          onChange={() => setSendChannel("whatsapp")}
                          className="accent-primary"
                          aria-checked={sendChannel === "whatsapp"}
                        />
                        <span className="text-sm">WhatsApp</span>
                      </label>

                      <label className="inline-flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="sendChannel"
                          value="email"
                          checked={sendChannel === "email"}
                          onChange={() => setSendChannel("email")}
                          className="accent-primary"
                          aria-checked={sendChannel === "email"}
                        />
                        <span className="text-sm">Email</span>
                      </label>

                      <label className="inline-flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="sendChannel"
                          value="both"
                          checked={sendChannel === "both"}
                          onChange={() => setSendChannel("both")}
                          className="accent-primary"
                          aria-checked={sendChannel === "both"}
                        />
                        <span className="text-sm">Both</span>
                      </label>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    aria-label="Send enquiry"
                  >
                    Send Enquiry
                  </Button>

                  <p className="text-xs text-gray-300 text-center">
                    Your enquiry will be sent via the selected method.
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
