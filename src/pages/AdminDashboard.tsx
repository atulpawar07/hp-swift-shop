import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number | null;
  images: string[];
  in_stock: boolean;
}

interface Category {
  id: string;
  name: string;
}

interface Brand {
  id: string;
  name: string;
  logo_url: string | null;
}

const AdminDashboard = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  
  // Products state
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [uploading, setUploading] = useState(false);

  // Categories state
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryName, setCategoryName] = useState('');

  // Brands state
  const [brands, setBrands] = useState<Brand[]>([]);
  const [brandDialogOpen, setBrandDialogOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [brandName, setBrandName] = useState('');

  // Product form state
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [inStock, setInStock] = useState(true);
  const [imageFiles, setImageFiles] = useState<FileList | null>(null);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/auth');
      toast.error('Admin access required');
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchProducts();
      fetchCategories();
      fetchBrands();
    }
  }, [isAdmin]);

  const fetchProducts = async () => {
    setLoadingProducts(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to fetch products');
      console.error(error);
    } else {
      setProducts(data || []);
    }
    setLoadingProducts(false);
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (error) {
      toast.error('Failed to fetch categories');
      console.error(error);
    } else {
      setCategories(data || []);
    }
  };

  const fetchBrands = async () => {
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .order('name');

    if (error) {
      toast.error('Failed to fetch brands');
      console.error(error);
    } else {
      setBrands(data || []);
    }
  };

  const uploadImages = async (files: FileList): Promise<string[]> => {
    const uploadedUrls: string[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        continue;
      }

      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      uploadedUrls.push(data.publicUrl);
    }

    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrls: string[] = editingProduct?.images || [];

      if (imageFiles && imageFiles.length > 0) {
        const newUrls = await uploadImages(imageFiles);
        imageUrls = [...imageUrls, ...newUrls];
      }

      const productData = {
        name,
        brand,
        category,
        price: price ? parseFloat(price) : null,
        images: imageUrls,
        in_stock: inStock,
      };

      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id);

        if (error) throw error;
        toast.success('Product updated successfully');
      } else {
        const { error } = await supabase
          .from('products')
          .insert([productData]);

        if (error) throw error;
        toast.success('Product added successfully');
      }

      resetProductForm();
      setProductDialogOpen(false);
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Failed to save product');
    } finally {
      setUploading(false);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setBrand(product.brand);
    setCategory(product.category);
    setPrice(product.price?.toString() || '');
    setInStock(product.in_stock);
    setProductDialogOpen(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Failed to delete product');
      console.error(error);
    } else {
      toast.success('Product deleted successfully');
      fetchProducts();
    }
  };

  const resetProductForm = () => {
    setName('');
    setBrand('');
    setCategory('');
    setPrice('');
    setInStock(true);
    setImageFiles(null);
    setEditingProduct(null);
  };

  // Category Management
  const handleSubmitCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingCategory) {
        const { error } = await supabase
          .from('categories')
          .update({ name: categoryName })
          .eq('id', editingCategory.id);

        if (error) throw error;
        toast.success('Category updated successfully');
      } else {
        const { error } = await supabase
          .from('categories')
          .insert([{ name: categoryName }]);

        if (error) throw error;
        toast.success('Category added successfully');
      }

      resetCategoryForm();
      setCategoryDialogOpen(false);
      fetchCategories();
    } catch (error) {
      console.error('Error saving category:', error);
      toast.error('Failed to save category');
    }
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setCategoryName(category.name);
    setCategoryDialogOpen(true);
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Failed to delete category');
      console.error(error);
    } else {
      toast.success('Category deleted successfully');
      fetchCategories();
    }
  };

  const resetCategoryForm = () => {
    setCategoryName('');
    setEditingCategory(null);
  };

  // Brand Management
  const handleSubmitBrand = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingBrand) {
        const { error } = await supabase
          .from('brands')
          .update({ name: brandName })
          .eq('id', editingBrand.id);

        if (error) throw error;
        toast.success('Brand updated successfully');
      } else {
        const { error } = await supabase
          .from('brands')
          .insert([{ name: brandName }]);

        if (error) throw error;
        toast.success('Brand added successfully');
      }

      resetBrandForm();
      setBrandDialogOpen(false);
      fetchBrands();
    } catch (error) {
      console.error('Error saving brand:', error);
      toast.error('Failed to save brand');
    }
  };

  const handleEditBrand = (brand: Brand) => {
    setEditingBrand(brand);
    setBrandName(brand.name);
    setBrandDialogOpen(true);
  };

  const handleDeleteBrand = async (id: string) => {
    if (!confirm('Are you sure you want to delete this brand?')) return;

    const { error } = await supabase
      .from('brands')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Failed to delete brand');
      console.error(error);
    } else {
      toast.success('Brand deleted successfully');
      fetchBrands();
    }
  };

  const resetBrandForm = () => {
    setBrandName('');
    setEditingBrand(null);
  };

  if (loading || loadingProducts) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <p>Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="brands">Brands</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Product Management</CardTitle>
                <Dialog open={productDialogOpen} onOpenChange={setProductDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={resetProductForm}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Product
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>
                        {editingProduct ? 'Edit Product' : 'Add New Product'}
                      </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Product Name</Label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="brand">Brand</Label>
                          <Select value={brand} onValueChange={setBrand} required>
                            <SelectTrigger className="bg-background">
                              <SelectValue placeholder="Select brand" />
                            </SelectTrigger>
                            <SelectContent className="bg-popover z-50">
                              {brands.map((b) => (
                                <SelectItem key={b.id} value={b.name}>
                                  {b.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Select value={category} onValueChange={setCategory} required>
                            <SelectTrigger className="bg-background">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent className="bg-popover z-50">
                              {categories.map((c) => (
                                <SelectItem key={c.id} value={c.name}>
                                  {c.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="price">Price (AED)</Label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          placeholder="Leave empty for 'Contact for price'"
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="in_stock"
                          checked={inStock}
                          onCheckedChange={(checked) => setInStock(checked as boolean)}
                        />
                        <Label htmlFor="in_stock">In Stock</Label>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="images">Product Images</Label>
                        <Input
                          id="images"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => setImageFiles(e.target.files)}
                        />
                        {editingProduct && editingProduct.images.length > 0 && (
                          <p className="text-sm text-muted-foreground">
                            Current images: {editingProduct.images.length}
                          </p>
                        )}
                      </div>

                      <Button type="submit" className="w-full" disabled={uploading}>
                        {uploading ? 'Saving...' : editingProduct ? 'Update Product' : 'Add Product'}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Brand</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.brand}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>
                          {product.price ? `AED ${product.price}` : 'Contact for price'}
                        </TableCell>
                        <TableCell>
                          {product.in_stock ? 'In Stock' : 'Out of Stock'}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditProduct(product)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Category Management</CardTitle>
                <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={resetCategoryForm}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Category
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {editingCategory ? 'Edit Category' : 'Add New Category'}
                      </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmitCategory} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="category-name">Category Name</Label>
                        <Input
                          id="category-name"
                          value={categoryName}
                          onChange={(e) => setCategoryName(e.target.value)}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        {editingCategory ? 'Update Category' : 'Add Category'}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category Name</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell>{category.name}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditCategory(category)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteCategory(category.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Brands Tab */}
          <TabsContent value="brands">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Brand Management</CardTitle>
                <Dialog open={brandDialogOpen} onOpenChange={setBrandDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={resetBrandForm}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Brand
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {editingBrand ? 'Edit Brand' : 'Add New Brand'}
                      </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmitBrand} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="brand-name">Brand Name</Label>
                        <Input
                          id="brand-name"
                          value={brandName}
                          onChange={(e) => setBrandName(e.target.value)}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        {editingBrand ? 'Update Brand' : 'Add Brand'}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Brand Name</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {brands.map((brand) => (
                      <TableRow key={brand.id}>
                        <TableCell>{brand.name}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditBrand(brand)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteBrand(brand.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
