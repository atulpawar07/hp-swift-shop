import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Users, Shield, Mail, Phone, Calendar, CheckCircle, XCircle, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { logActivity } from '@/lib/activityLogger';

interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  email_verified: boolean;
  created_at: string;
  roles: string[];
}

export const UserManagement = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserProfile | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Fetch all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Fetch all user roles
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) throw rolesError;

      // Combine profiles with their roles
      const usersWithRoles: UserProfile[] = (profiles || []).map((profile) => ({
        id: profile.id,
        email: profile.email || 'No email',
        full_name: profile.full_name,
        phone: profile.phone,
        email_verified: profile.email_verified || false,
        created_at: profile.created_at,
        roles: userRoles
          ?.filter((ur) => ur.user_id === profile.id)
          .map((ur) => ur.role) || [],
      }));

      setUsers(usersWithRoles);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: 'admin' | 'moderator' | 'user', currentRoles: string[]) => {
    try {
      // Check if user already has this role
      if (currentRoles.includes(newRole)) {
        toast.info('User already has this role');
        return;
      }

      // Add the new role
      const { error } = await supabase
        .from('user_roles')
        .insert([{ user_id: userId, role: newRole }]);

      if (error) throw error;

      // Log the activity
      await logActivity({
        action: 'Assign Role',
        entityType: 'user',
        entityId: userId,
        details: { role: newRole },
      });

      toast.success(`Role "${newRole}" assigned successfully`);
      fetchUsers();
    } catch (error: any) {
      console.error('Error assigning role:', error);
      toast.error(error.message || 'Failed to assign role');
    }
  };

  const handleRemoveRole = async (userId: string, role: 'admin' | 'moderator' | 'user') => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId)
        .eq('role', role);

      if (error) throw error;

      // Log the activity
      await logActivity({
        action: 'Remove Role',
        entityType: 'user',
        entityId: userId,
        details: { role },
      });

      toast.success(`Role "${role}" removed successfully`);
      fetchUsers();
    } catch (error: any) {
      console.error('Error removing role:', error);
      toast.error(error.message || 'Failed to remove role');
    }
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;

    try {
      // First delete user roles
      const { error: rolesError } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userToDelete.id);

      if (rolesError) throw rolesError;

      // Then delete profile
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userToDelete.id);

      if (profileError) throw profileError;

      // Log the activity
      await logActivity({
        action: 'Delete User',
        entityType: 'user',
        entityId: userToDelete.id,
        details: { email: userToDelete.email },
      });

      toast.success('User deleted successfully');
      setDeleteDialogOpen(false);
      setUserToDelete(null);
      fetchUsers();
    } catch (error: any) {
      console.error('Error deleting user:', error);
      toast.error(error.message || 'Failed to delete user');
    }
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateString));
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>Loading users...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            User Management
          </CardTitle>
          <CardDescription>
            Manage user accounts, roles, and permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Roles</TableHead>
                  <TableHead>Registered</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{user.full_name || 'No name'}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {user.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {user.phone ? (
                          <div className="text-sm flex items-center gap-1">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            {user.phone}
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">No phone</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {user.email_verified ? (
                          <Badge variant="default" className="gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Verified
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="gap-1">
                            <XCircle className="h-3 w-3" />
                            Unverified
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {user.roles.length > 0 ? (
                            user.roles.map((role) => (
                              <Badge
                                key={role}
                                variant={role === 'admin' ? 'destructive' : 'outline'}
                                className="gap-1"
                              >
                                <Shield className="h-3 w-3" />
                                {role}
                                <button
                                  onClick={() => handleRemoveRole(user.id, role as 'admin' | 'moderator' | 'user')}
                                  className="ml-1 hover:text-destructive"
                                >
                                  ×
                                </button>
                              </Badge>
                            ))
                          ) : (
                            <Badge variant="outline">user</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm flex items-center gap-1 text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {formatDate(user.created_at)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Select
                            onValueChange={(value) =>
                              handleRoleChange(user.id, value as 'admin' | 'moderator' | 'user', user.roles)
                            }
                          >
                            <SelectTrigger className="w-[120px] h-8">
                              <SelectValue placeholder="Add role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="moderator">Moderator</SelectItem>
                              <SelectItem value="user">User</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              setUserToDelete(user);
                              setDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete user "{userToDelete?.email}"? This action cannot
              be undone and will remove all user data including roles.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setUserToDelete(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};