import { supabase } from '@/integrations/supabase/client';

interface LogActivity {
  action: string;
  entityType: string;
  entityId?: string;
  details?: Record<string, any>;
}

export const logActivity = async ({ action, entityType, entityId, details }: LogActivity) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.warn('No user found for activity logging');
      return;
    }

    const { error } = await supabase
      .from('activity_logs')
      .insert({
        user_id: user.id,
        user_email: user.email,
        action,
        entity_type: entityType,
        entity_id: entityId,
        details: details || null,
      });

    if (error) {
      console.error('Error logging activity:', error);
    }
  } catch (error) {
    console.error('Error in logActivity:', error);
  }
};