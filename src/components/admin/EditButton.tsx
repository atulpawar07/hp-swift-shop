import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface EditButtonProps {
  onClick: () => void;
  className?: string;
}

export const EditButton = ({ onClick, className = '' }: EditButtonProps) => {
  const { isAdmin } = useAuth();

  if (!isAdmin) return null;

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={onClick}
      className={`gap-2 ${className}`}
    >
      <Edit className="h-4 w-4" />
      Edit
    </Button>
  );
};
