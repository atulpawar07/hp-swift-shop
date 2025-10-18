import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface EditButtonProps {
  onClick: () => void;
  className?: string;
}

export const EditButton = ({ onClick, className = '' }: EditButtonProps) => {
  const { isAdmin, loading, user } = useAuth();

  console.log('EditButton - isAdmin:', isAdmin, 'loading:', loading, 'user:', user?.email);

  if (loading) {
    return (
      <Button
        size="sm"
        variant="outline"
        disabled
        className={`gap-2 flex-shrink-0 ${className}`}
      >
        <Edit className="h-4 w-4" />
        ...
      </Button>
    );
  }

  if (!isAdmin) {
    console.log('EditButton - Not showing because isAdmin is false');
    return null;
  }

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={onClick}
      className={`gap-2 flex-shrink-0 ${className}`}
    >
      <Edit className="h-4 w-4" />
      Edit
    </Button>
  );
};
