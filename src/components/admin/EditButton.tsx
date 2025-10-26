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
      onClick={onClick}
      className={`gap-2 flex-shrink-0 cursor-pointer bg-[#bf0d0d] text-white hover:bg-[#a60b0b] border border-[#a60b0b] shadow-sm transition-all ${className}`}
    >
      <Edit className="h-4 w-4" />
      Edit
    </Button>
  );
};
