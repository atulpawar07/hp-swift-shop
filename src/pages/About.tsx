import { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle } from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";
import { EditButton } from "@/components/admin/EditButton";
import { ContentEditor } from "@/components/admin/ContentEditor";

const About = () => {
  const { content: heroContent, updateContent: updateHero } = usePageContent('about', 'hero');
  const { content: storyContent, updateContent: updateStory } = usePageContent('about', 'story');
  
  const [editingHero, setEditingHero] = useState(false);
  const [editingStory, setEditingStory] = useState(false);

  const features = [
    "Worldwide Sourcing",
    "Broad Range of IT Products and Services",
    "Flexible Logistics",
    "Right Price",
    "Speedy Service"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-black py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  {heroContent?.title || 'About SK Enterprise'}
                </h1>
                <p className="text-lg text-muted-foreground max-w-3xl">
                  {heroContent?.description || 'Your trusted partner in IT distribution across UAE'}
                </p>
              </div>
              <EditButton onClick={() => setEditingHero(true)} />
            </div>
          </div>
        </section>

        {/* Company Info */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="lg:w-1/3">
                <img 
                  src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&h=400&fit=crop" 
                  alt="Business Partnership" 
                  className="rounded-lg shadow-lg w-full"
                />
              </div>

              <div className="lg:w-2/3">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-bold text-foreground">
                    {storyContent?.title || 'Who We Are'}
                  </h2>
                  <EditButton onClick={() => setEditingStory(true)} />
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed whitespace-pre-line">
                  {storyContent?.content || 'In today\'s demanding and dynamic world of IT Distribution, it takes a special kind of organization to deliver consistently on all key business metrics: availability, right price, prompt delivery, efficient logistics and top-class service. With decades of experience in worldwide sourcing of IT products and services and robust relationships across the IT value-chain, SK Enterprise is ideally positioned to be your supplier of choice.'}
                </p>

                <h3 className="text-xl font-semibold text-foreground mb-4">Our Key USPs:</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To be the most trusted and reliable IT distribution partner in the UAE region, known for excellence in service delivery and customer satisfaction.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To provide world-class IT products and services with competitive pricing, efficient logistics, and exceptional customer support to businesses across all sectors.
                </p>
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
          title="Edit About Hero"
          content={heroContent}
          fields={[
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'description', label: 'Description', type: 'textarea' }
          ]}
          onSave={updateHero}
        />
      )}

      {storyContent && (
        <ContentEditor
          open={editingStory}
          onOpenChange={setEditingStory}
          title="Edit Company Story"
          content={storyContent}
          fields={[
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'content', label: 'Content', type: 'textarea', multiline: true }
          ]}
          onSave={updateStory}
        />
      )}
    </div>
  );
};

export default About;
