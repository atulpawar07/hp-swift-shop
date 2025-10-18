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

interface User {
  id: string;
  email: string;
  full_name: string | null;
}

interface UserRole {
  id: string;
  user_id: string;
  role: string;
  created_at: string;
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

  // Users state
  const [users, setUsers] = useState<User[]>([]);
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserDialogOpen, setNewUserDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'admin' | 'moderator' | 'user'>('user');

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
      fetchUsers();
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

  const fetchUsers = async () => {
    // Fetch all users from profiles
    const { data: profilesData, error: profilesError } = await supabase
      .from('profiles')
      .select('id, email, full_name')
      .order('email');

    if (profilesError) {
      console.error('Error fetching users:', profilesError);
    } else {
      setUsers(profilesData || []);
    }

    // Fetch user roles
    const { data: rolesData, error: rolesError } = await supabase
      .from('user_roles')
      .select('*');

    if (rolesError) {
      console.error('Error fetching user roles:', rolesError);
    } else {
      setUserRoles(rolesData || []);
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
      // Check if there's a logo file to upload
      const fileInput = document.getElementById('brand-logo') as HTMLInputElement;
      let logoUrl = editingBrand?.logo_url || null;

      if (fileInput?.files && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `brand-logos/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, file);

        if (uploadError) {
          console.error('Upload error:', uploadError);
          toast.error('Failed to upload logo');
          return;
        }

        const { data } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);

        logoUrl = data.publicUrl;
      }

      if (editingBrand) {
        const { error } = await supabase
          .from('brands')
          .update({ name: brandName, logo_url: logoUrl })
          .eq('id', editingBrand.id);

        if (error) throw error;
        toast.success('Brand updated successfully');
      } else {
        const { error } = await supabase
          .from('brands')
          .insert([{ name: brandName, logo_url: logoUrl }]);

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

  // User Management
  const handleGrantAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // First check if user exists
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', newAdminEmail.trim())
        .single();

      if (userError || !userData) {
        toast.error('User not found. They must sign up first.');
        return;
      }

      // Check if already admin
      const { data: existingRole } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', userData.id)
        .eq('role', 'admin')
        .maybeSingle();

      if (existingRole) {
        toast.error('User is already an admin');
        return;
      }

      // Grant admin role
      const { error } = await supabase
        .from('user_roles')
        .insert([{ user_id: userData.id, role: 'admin' }]);

      if (error) throw error;

      toast.success('Admin access granted successfully');
      setNewAdminEmail('');
      fetchUsers();
    } catch (error) {
      console.error('Error granting admin access:', error);
      toast.error('Failed to grant admin access');
    }
  };

  const handleRevokeAdmin = async (userId: string) => {
    if (!confirm('Are you sure you want to revoke admin access for this user?')) return;

    // Prevent revoking own admin access
    if (userId === user?.id) {
      toast.error('You cannot revoke your own admin access');
      return;
    }

    try {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId)
        .eq('role', 'admin');

      if (error) throw error;

      toast.success('Admin access revoked successfully');
      fetchUsers();
    } catch (error) {
      console.error('Error revoking admin access:', error);
      toast.error('Failed to revoke admin access');
    }
  };

  const isUserAdmin = (userId: string) => {
    return userRoles.some(role => role.user_id === userId && role.role === 'admin');
  };

  const getUserRoles = (userId: string): string[] => {
    return userRoles
      .filter(role => role.user_id === userId)
      .map(role => role.role);
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Create the user account
      const redirectUrl = `${window.location.origin}/`;
      const { data, error } = await supabase.auth.signUp({
        email: newUserEmail.trim(),
        password: newUserPassword,
        options: {
          emailRedirectTo: redirectUrl
        }
      });

      if (error) throw error;

      if (!data.user) {
        toast.error('Failed to create user');
        return;
      }

      // If a specific role is selected, assign it
      if (selectedRole) {
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert([{ user_id: data.user.id, role: selectedRole }]);

        if (roleError) {
          console.error('Error assigning role:', roleError);
          toast.error('User created but failed to assign role');
        }
      }

      toast.success(`User created successfully with ${selectedRole} role`);
      setNewUserEmail('');
      setNewUserPassword('');
      setSelectedRole('user');
      setNewUserDialogOpen(false);
      
      // Wait a bit for the profile to be created by the trigger
      setTimeout(fetchUsers, 1000);
    } catch (error: any) {
      console.error('Error creating user:', error);
      toast.error(error.message || 'Failed to create user');
    }
  };

  const handleDeleteUser = async (userId: string, userEmail: string) => {
    // Prevent deleting admin users
    if (isUserAdmin(userId)) {
      toast.error('Cannot delete admin users');
      return;
    }

    // Prevent deleting self
    if (userId === user?.id) {
      toast.error('You cannot delete your own account');
      return;
    }

    if (!confirm(`Are you sure you want to delete user ${userEmail}? This action cannot be undone.`)) {
      return;
    }

    try {
      // Delete user roles first
      const { error: rolesError } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId);

      if (rolesError) throw rolesError;

      // Delete profile (this will cascade to auth.users due to FK)
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (profileError) throw profileError;

      toast.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user. Note: Deleting auth users requires additional permissions.');
    }
  };

  const handleGrantRole = async (userId: string, role: 'admin' | 'moderator' | 'user') => {
    try {
      // Check if user already has this role
      const { data: existingRole } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', userId)
        .eq('role', role)
        .maybeSingle();

      if (existingRole) {
        toast.error(`User already has ${role} role`);
        return;
      }

      // Grant the role
      const { error } = await supabase
        .from('user_roles')
        .insert([{ user_id: userId, role }]);

      if (error) throw error;

      toast.success(`${role} role granted successfully`);
      fetchUsers();
    } catch (error) {
      console.error('Error granting role:', error);
      toast.error('Failed to grant role');
    }
  };

  const handleRevokeRole = async (userId: string, role: string) => {
    // Prevent revoking own admin role
    if (userId === user?.id && role === 'admin') {
      toast.error('You cannot revoke your own admin role');
      return;
    }

    if (!confirm(`Are you sure you want to revoke ${role} role from this user?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId)
        .eq('role', role as 'admin' | 'moderator' | 'user');

      if (error) throw error;

      toast.success(`${role} role revoked successfully`);
      fetchUsers();
    } catch (error) {
      console.error('Error revoking role:', error);
      toast.error('Failed to revoke role');
    }
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
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="brands">Brands</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
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

          <TabsContent value="brands">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Brand & Partner Management</CardTitle>
                <Dialog open={brandDialogOpen} onOpenChange={setBrandDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={resetBrandForm}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Brand/Partner
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>
                        {editingBrand ? 'Edit Brand/Partner' : 'Add New Brand/Partner'}
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
                      <div className="space-y-2">
                        <Label htmlFor="brand-logo">Partner Logo</Label>
                        <Input
                          id="brand-logo"
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              // Store file for upload
                              const fileInput = e.target;
                              fileInput.dataset.file = 'pending';
                            }
                          }}
                        />
                        {editingBrand?.logo_url && (
                          <div className="mt-2">
                            <img 
                              src={editingBrand.logo_url} 
                              alt="Current logo" 
                              className="h-16 object-contain"
                            />
                            <p className="text-sm text-muted-foreground mt-1">Current logo</p>
                          </div>
                        )}
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
                      <TableHead>Logo</TableHead>
                      <TableHead>Brand Name</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {brands.map((brand) => (
                      <TableRow key={brand.id}>
                        <TableCell>
                          {brand.logo_url ? (
                            <img 
                              src={brand.logo_url} 
                              alt={brand.name} 
                              className="h-12 w-20 object-contain"
                            />
                          ) : (
                            <div className="h-12 w-20 bg-secondary flex items-center justify-center text-xs">
                              No logo
                            </div>
                          )}
                        </TableCell>
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

          {/* Users Tab */}
          <TabsContent value="users">
            <div className="grid gap-6">
              {/* Create New User */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>User Management</CardTitle>
                  <Dialog open={newUserDialogOpen} onOpenChange={setNewUserDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Create New User
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New User</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleCreateUser} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="new-user-email">Email</Label>
                          <Input
                            id="new-user-email"
                            type="email"
                            value={newUserEmail}
                            onChange={(e) => setNewUserEmail(e.target.value)}
                            placeholder="user@example.com"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-user-password">Password</Label>
                          <Input
                            id="new-user-password"
                            type="password"
                            value={newUserPassword}
                            onChange={(e) => setNewUserPassword(e.target.value)}
                            placeholder="Minimum 6 characters"
                            required
                            minLength={6}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-user-role">Initial Role</Label>
                          <Select value={selectedRole} onValueChange={(value: any) => setSelectedRole(value)}>
                            <SelectTrigger className="bg-background">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-popover">
                              <SelectItem value="user">User</SelectItem>
                              <SelectItem value="moderator">Moderator</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button type="submit" className="w-full">
                          Create User
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Create new users with specific roles. Users will receive a confirmation email.
                  </p>
                </CardContent>
              </Card>

              {/* All Users List */}
              <Card>
                <CardHeader>
                  <CardTitle>All Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Roles</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((userItem) => {
                        const roles = getUserRoles(userItem.id);
                        const isAdmin = roles.includes('admin');
                        
                        return (
                          <TableRow key={userItem.id}>
                            <TableCell>{userItem.email}</TableCell>
                            <TableCell>{userItem.full_name || '-'}</TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {roles.length > 0 ? (
                                  roles.map((role) => (
                                    <span
                                      key={role}
                                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                        role === 'admin'
                                          ? 'bg-primary/10 text-primary'
                                          : role === 'moderator'
                                          ? 'bg-accent/10 text-accent-foreground'
                                          : 'bg-secondary text-secondary-foreground'
                                      }`}
                                    >
                                      {role}
                                    </span>
                                  ))
                                ) : (
                                  <span className="text-sm text-muted-foreground">No roles</span>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              {userItem.id === user?.id ? (
                                <span className="text-sm text-muted-foreground">You</span>
                              ) : (
                                <div className="flex flex-col gap-2">
                                  <div className="flex gap-2 flex-wrap">
                                    {/* Grant Role Buttons */}
                                    {!roles.includes('admin') && (
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleGrantRole(userItem.id, 'admin')}
                                      >
                                        Grant Admin
                                      </Button>
                                    )}
                                    {!roles.includes('moderator') && (
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleGrantRole(userItem.id, 'moderator')}
                                      >
                                        Grant Moderator
                                      </Button>
                                    )}
                                    {!roles.includes('user') && (
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleGrantRole(userItem.id, 'user')}
                                      >
                                        Grant User
                                      </Button>
                                    )}
                                  </div>
                                  <div className="flex gap-2 flex-wrap">
                                    {/* Revoke Role Buttons */}
                                    {roles.map((role) => (
                                      <Button
                                        key={role}
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleRevokeRole(userItem.id, role)}
                                      >
                                        <Trash2 className="h-3 w-3 mr-1" />
                                        Revoke {role}
                                      </Button>
                                    ))}
                                    {/* Delete User Button (only for non-admins) */}
                                    {!isAdmin && (
                                      <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleDeleteUser(userItem.id, userItem.email)}
                                      >
                                        <Trash2 className="h-3 w-3 mr-1" />
                                        Delete User
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
