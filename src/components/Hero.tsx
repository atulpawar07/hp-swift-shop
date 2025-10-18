import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { usePageContent } from "@/hooks/usePageContent";
import { EditButton } from "@/components/admin/EditButton";
import { ContentEditor } from "@/components/admin/ContentEditor";

const Hero = () => {
  const { content, updateContent } = usePageContent('home', 'hero');
  const [editing, setEditing] = useState(false);

  return (
    <>
      <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white">
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="flex justify-between items-start gap-4 mb-6">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                {content?.title || 'Welcome to SK Enterprise'}
              </h1>
              <EditButton onClick={() => setEditing(true)} className="text-white border-white hover:bg-white/10" />
            </div>
            {content?.subtitle && (
              <h2 className="text-3xl md:text-4xl font-normal mb-6">
                {content.subtitle}
              </h2>
            )}
            <p className="text-lg md:text-xl mb-8 text-gray-300 leading-relaxed max-w-2xl">
              {content?.description || 'Leading provider of IT equipment, office supplies, and technology solutions in UAE since 2010'}
            </p>
            <Link to="/products">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8">
                View Our Products
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Decorative element */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block opacity-20">
          <div className="relative h-full w-full">
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-gray-900"></div>
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      {content && (
        <ContentEditor
          open={editing}
          onOpenChange={setEditing}
          title="Edit Hero Section"
          content={content}
          fields={[
            { key: 'title', label: 'Main Title', type: 'text' },
            { key: 'subtitle', label: 'Subtitle (Optional)', type: 'text' },
            { key: 'description', label: 'Description', type: 'textarea', multiline: true }
          ]}
          onSave={updateContent}
        />
      )}
    </>
  );
};

export default Hero;
