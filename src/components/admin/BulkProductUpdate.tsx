import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Upload, Download, CheckCircle, XCircle } from 'lucide-react';
import * as XLSX from 'xlsx';

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  highlights?: string[] | null;
}

interface UpdateResult {
  name: string;
  success: boolean;
  error?: string;
}

export const BulkProductUpdate = ({ 
  products, 
  onSuccess 
}: { 
  products: Product[];
  onSuccess?: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [updating, setUpdating] = useState(false);
  const [results, setResults] = useState<UpdateResult[]>([]);

  const downloadTemplate = () => {
    const templateData = products.map(p => ({
      'Product ID': p.id,
      'Product Name': p.name,
      'Brand': p.brand,
      'Category': p.category,
      'Current Highlights': p.highlights?.join(' | ') || '',
      'New Highlights (separate with |)': p.highlights?.join(' | ') || ''
    }));

    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Products');
    
    // Set column widths
    ws['!cols'] = [
      { wch: 40 },
      { wch: 30 },
      { wch: 15 },
      { wch: 15 },
      { wch: 50 },
      { wch: 50 }
    ];

    XLSX.writeFile(wb, 'product_highlights_template.xlsx');
    toast.success('Template downloaded successfully');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResults([]);
    }
  };

  const handleBulkUpdate = async () => {
    if (!file) {
      toast.error('Please select a file');
      return;
    }

    setUpdating(true);
    const updateResults: UpdateResult[] = [];

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      for (const row of jsonData as any[]) {
        const productId = row['Product ID'];
        const productName = row['Product Name'];
        const newHighlights = row['New Highlights (separate with |)'];

        if (!productId || !newHighlights) {
          updateResults.push({
            name: productName || 'Unknown',
            success: false,
            error: 'Missing Product ID or Highlights'
          });
          continue;
        }

        // Parse highlights (split by | and trim)
        const highlightsArray = newHighlights
          .split('|')
          .map((h: string) => h.trim())
          .filter((h: string) => h.length > 0);

        // Update product in database
        const { error } = await supabase
          .from('products')
          .update({ highlights: highlightsArray })
          .eq('id', productId);

        if (error) {
          updateResults.push({
            name: productName,
            success: false,
            error: error.message
          });
        } else {
          updateResults.push({
            name: productName,
            success: true
          });
        }
      }

      setResults(updateResults);
      
      const successCount = updateResults.filter(r => r.success).length;
      const failCount = updateResults.filter(r => !r.success).length;
      
      if (failCount === 0) {
        toast.success(`Successfully updated ${successCount} products`);
      } else {
        toast.warning(`Updated ${successCount} products, ${failCount} failed`);
      }
      
      // Refresh products list if any were updated successfully
      if (successCount > 0 && onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error processing file:', error);
      toast.error('Failed to process Excel file');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Upload className="h-4 w-4" />
          Bulk Update Highlights
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Bulk Product Highlights Update</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <h4 className="font-medium">Instructions:</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
              <li>Download the template with current product data</li>
              <li>Edit the "New Highlights" column (separate multiple highlights with | symbol)</li>
              <li>Save the file and upload it back</li>
              <li>Review results and check for any errors</li>
            </ol>
          </div>

          <div className="flex gap-4">
            <Button onClick={downloadTemplate} variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Download Template
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excel-file">Upload Excel File</Label>
            <Input
              id="excel-file"
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileChange}
            />
            {file && (
              <p className="text-sm text-muted-foreground">
                Selected: {file.name}
              </p>
            )}
          </div>

          <Button 
            onClick={handleBulkUpdate} 
            disabled={!file || updating}
            className="w-full"
          >
            {updating ? 'Updating Products...' : 'Update Products'}
          </Button>

          {results.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">Update Results:</h4>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Status</TableHead>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Error Message</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.map((result, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {result.success ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : (
                            <XCircle className="h-5 w-5 text-destructive" />
                          )}
                        </TableCell>
                        <TableCell>{result.name}</TableCell>
                        <TableCell className="text-destructive text-sm">
                          {result.error || '-'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <p className="text-sm text-muted-foreground">
                Success: {results.filter(r => r.success).length} / Failed: {results.filter(r => !r.success).length}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
