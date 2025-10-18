import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const usePageContent = (page: string, section: string) => {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchContent = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('page_content')
      .select('*')
      .eq('page', page)
      .eq('section', section)
      .maybeSingle();

    if (error) {
      console.error('Error fetching content:', error);
    } else {
      setContent(data?.content || null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchContent();
  }, [page, section]);

  const updateContent = async (newContent: any) => {
    const { error } = await supabase
      .from('page_content')
      .upsert({
        page,
        section,
        content: newContent
      }, {
        onConflict: 'page,section'
      });

    if (error) {
      toast.error('Failed to update content');
      console.error(error);
      return false;
    }

    toast.success('Content updated successfully');
    setContent(newContent);
    return true;
  };

  return { content, loading, updateContent, refetch: fetchContent };
};
