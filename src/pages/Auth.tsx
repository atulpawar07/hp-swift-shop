import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const authSchema = z.object({
  email: z.string().trim().min(1, { message: 'Email is required' }).email({ message: 'Please enter a valid email address (e.g., user@example.com)' }).max(255),
  password: z.string()
    .min(12, { message: 'Password must be at least 12 characters' })
    .max(100)
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[^A-Za-z0-9]/, { message: 'Password must contain at least one special character' }),
});

const signUpSchema = authSchema.extend({
  fullName: z.string().trim().min(2, { message: 'Name must be at least 2 characters' }).max(100, { message: 'Name must be less than 100 characters' }),
  phone: z.string().trim().regex(/^\+?[1-9]\d{1,14}$/, { message: 'Please enter a valid phone number (e.g., +1234567890)' }),
});

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; fullName?: string; phone?: string }>({});
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean; fullName?: boolean; phone?: boolean }>({});
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const validateField = (field: 'email' | 'password' | 'fullName' | 'phone', value: string, isSignUp = false) => {
    try {
      if (field === 'email') {
        authSchema.shape.email.parse(value);
      } else if (field === 'password') {
        authSchema.shape.password.parse(value);
      } else if (field === 'fullName' && isSignUp) {
        signUpSchema.shape.fullName.parse(value);
      } else if (field === 'phone' && isSignUp) {
        signUpSchema.shape.phone.parse(value);
      }
      setErrors(prev => ({ ...prev, [field]: undefined }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [field]: error.errors[0]?.message }));
      }
      return false;
    }
  };

  const validateForm = () => {
    try {
      authSchema.parse({ email, password });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: { email?: string; password?: string } = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            formattedErrors[err.path[0] as 'email' | 'password'] = err.message;
          }
        });
        setErrors(formattedErrors);
        toast.error('Please fix the validation errors');
      }
      return false;
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (touched.email) {
      validateField('email', value);
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (touched.password) {
      validateField('password', value);
    }
  };

  const handleBlur = (field: 'email' | 'password' | 'fullName' | 'phone', isSignUp = false) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const value = field === 'email' ? email : field === 'password' ? password : field === 'fullName' ? fullName : phone;
    validateField(field, value, isSignUp);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      await signIn(email, password);
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  const validateSignUpForm = () => {
    try {
      signUpSchema.parse({ email, password, fullName, phone });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: { email?: string; password?: string; fullName?: string; phone?: string } = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            formattedErrors[err.path[0] as 'email' | 'password' | 'fullName' | 'phone'] = err.message;
          }
        });
        setErrors(formattedErrors);
        toast.error('Please fix the validation errors');
      }
      return false;
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSignUpForm()) return;
    
    setLoading(true);
    try {
      await signUp(email, password, fullName, phone);
      toast.success('Please check your email to verify your account');
    } catch (error) {
      console.error('Sign up error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Welcome</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account or create a new one
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    onBlur={() => handleBlur('email')}
                    className={errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'signin-email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="signin-email-error" className="text-sm text-destructive font-medium">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    onBlur={() => handleBlur('password')}
                    className={errors.password ? 'border-destructive focus-visible:ring-destructive' : ''}
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? 'signin-password-error' : undefined}
                  />
                  {errors.password && (
                    <p id="signin-password-error" className="text-sm text-destructive font-medium">
                      {errors.password}
                    </p>
                  )}
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-fullname">Full Name</Label>
                  <Input
                    id="signup-fullname"
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (touched.fullName) validateField('fullName', e.target.value, true);
                    }}
                    onBlur={() => handleBlur('fullName', true)}
                    className={errors.fullName ? 'border-destructive focus-visible:ring-destructive' : ''}
                    aria-invalid={!!errors.fullName}
                    aria-describedby={errors.fullName ? 'signup-fullname-error' : undefined}
                  />
                  {errors.fullName && (
                    <p id="signup-fullname-error" className="text-sm text-destructive font-medium">
                      {errors.fullName}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-phone">Phone Number</Label>
                  <Input
                    id="signup-phone"
                    type="tel"
                    placeholder="+1234567890"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (touched.phone) validateField('phone', e.target.value, true);
                    }}
                    onBlur={() => handleBlur('phone', true)}
                    className={errors.phone ? 'border-destructive focus-visible:ring-destructive' : ''}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'signup-phone-error' : undefined}
                  />
                  {errors.phone && (
                    <p id="signup-phone-error" className="text-sm text-destructive font-medium">
                      {errors.phone}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    onBlur={() => handleBlur('email', true)}
                    className={errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'signup-email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="signup-email-error" className="text-sm text-destructive font-medium">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    onBlur={() => handleBlur('password', true)}
                    className={errors.password ? 'border-destructive focus-visible:ring-destructive' : ''}
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? 'signup-password-error' : undefined}
                  />
                  {errors.password && (
                    <p id="signup-password-error" className="text-sm text-destructive font-medium">
                      {errors.password}
                    </p>
                  )}
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Creating account...' : 'Sign Up'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          
          <Button
            variant="ghost"
            className="w-full mt-4"
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
