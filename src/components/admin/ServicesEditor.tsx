import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Service {
  title: string;
  description: string;
  icon: string;
}

interface ServicesEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  content: { services: Service[] };
  onSave: (content: any) => Promise<boolean>;
}

const iconOptions = [
  'Package', 'Building', 'Wrench', 'Network', 'Users', 'ShoppingCart',
  'Settings', 'Database', 'Shield', 'Zap', 'Globe', 'Smartphone'
];

export const ServicesEditor = ({
  open,
  onOpenChange,
  content,
  onSave,
}: ServicesEditorProps) => {
  const [services, setServices] = useState<Service[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (content?.services) {
      setServices(content.services);
    }
  }, [content]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const success = await onSave({ services });
    setSaving(false);
    if (success) {
      onOpenChange(false);
    }
  };

  const addService = () => {
    setServices([...services, { title: '', description: '', icon: 'Package' }]);
  };

  const removeService = (index: number) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const updateService = (index: number, field: keyof Service, value: string) => {
    const updated = [...services];
    updated[index] = { ...updated[index], [field]: value };
    setServices(updated);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Services</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {services.map((service, index) => (
            <div key={index} className="border border-border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold">Service {index + 1}</h4>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeService(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={service.title}
                  onChange={(e) => updateService(index, 'title', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={service.description}
                  onChange={(e) => updateService(index, 'description', e.target.value)}
                  required
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Icon</Label>
                <Select 
                  value={service.icon} 
                  onValueChange={(value) => updateService(index, 'icon', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((icon) => (
                      <SelectItem key={icon} value={icon}>
                        {icon}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))}
          
          <Button type="button" variant="outline" onClick={addService} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </Button>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
