// src/pages/about.tsx
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle } from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";
import { EditButton } from "@/components/admin/EditButton";
import { ContentEditor } from "@/components/admin/ContentEditor";
import { useAuth } from "@/context/AuthProvider"; // adjust path if different
import { Spinner } from "@/components/Spinner"; // optional: replace with your loader

const About = () => {
  const { content, loading: contentLoading, error, refresh } = usePageContent("about");
  const { user, isAdmin, loading: authLoading } = useAuth();

  // local UI state for editor modal/drawer (controlled by admin)
  const [editorOpen, setEditorOpen] = useState(false);

  // derived loading: either auth or content loading prevents UI from showing admin controls
  const isInitialLoading = authLoading || contentLoading;

  // keep a small guard to avoid flashing admin UI before auth resolves
  useEffect(() => {
    // close editor if user becomes non-admin
    if (!isAdmin && editorOpen) {
      setEditorOpen(false);
    }
  }, [isAdmin, editorOpen]);

  const handleOpenEditor = () => setEditorOpen(true);
  const handleCloseEditor = () => setEditorOpen(false);

  const handleSave = async (newContent: string) => {
    // ContentEditor should handle saving; if it calls a callback, you can refresh content here.
    await refresh();
    handleCloseEditor();
  };

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* top row: heading + optional admin edit button */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl font-semibold">About</h1>

          {/* show a small loader while auth is resolving; once resolved, show EditButton only for admin */}
          {isInitialLoading ? (
            <div aria-hidden className="ml-4">
              {/* Replace with your spinner component or a simple skeleton */}
              <Spinner />
            </div>
          ) : (
            isAdmin && (
              <EditButton onClick={handleOpenEditor} aria-label="Edit About page" />
            )
          )}
        </div>

        {/* page content */}
        <section className="prose lg:prose-lg max-w-none">
          {content ? (
            <div dangerouslySetInnerHTML={{ __html: content }} />
          ) : error ? (
            <div className="rounded-md bg-red-50 p-4 text-red-700">
              <strong>Error loading content.</strong>
              <div className="mt-1 text-sm">{String(error)}</div>
            </div>
          ) : (
            <div className="text-muted">
              {/* fallback when no content is present */}
              <p>No content found for the About page yet.</p>
              {isAdmin && (
                <p className="text-sm text-muted">Use the edit button to add content.</p>
              )}
            </div>
          )}
        </section>

        {/* small success/info box (example) */}
        <div className="mt-8 flex items-center gap-2 text-sm text-slate-600">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <span>Updated content is saved to your CMS.</span>
        </div>
      </main>

      <Footer />

      {/* Editor modal/drawer */}
      {editorOpen && (
        <ContentEditor
          defaultContent={content ?? ""}
          onClose={handleCloseEditor}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default About;
