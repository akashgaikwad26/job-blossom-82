import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';

interface LoginFormData {
  email: string;
  password: string;
}

// Dummy users for testing
const DUMMY_USERS = [
  { email: 'jobseeker@demo.com', password: 'password123', role: 'jobSeeker', name: 'John Doe' },
  { email: 'employer@demo.com', password: 'password123', role: 'employer', name: 'Jane Smith' },
  { email: 'admin@demo.com', password: 'password123', role: 'admin', name: 'Admin User' },
  { email: 'franchise@demo.com', password: 'password123', role: 'franchise', name: 'Franchise Owner' },
];

export const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check dummy users
    const user = DUMMY_USERS.find(u => u.email === data.email && u.password === data.password);
    
    if (user) {
      // Store user in localStorage for demo purposes
      localStorage.setItem('demoUser', JSON.stringify(user));
      
      toast.success(`Welcome back, ${user.name}!`);
      
      // Navigate based on role
      if (user.role === 'admin') {
        navigate('/dashboard/admin');
      } else {
        navigate(`/dashboard/${user.role}`);
      }
    } else {
      toast.error('Invalid email or password. Try jobseeker@demo.com / password123');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto shadow-elegant">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold text-primary">
            {t('auth.login.title', 'Welcome Back')}
          </CardTitle>
          <CardDescription>
            {t('auth.login.description', 'Sign in to your account')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {t('auth.fields.email', 'Email')}
              </Label>
              <Input
                id="email"
                type="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address'
                  }
                })}
                placeholder={t('auth.placeholders.email', 'Enter your email')}
                className="transition-smooth"
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                {t('auth.fields.password', 'Password')}
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', { required: 'Password is required' })}
                  placeholder={t('auth.placeholders.password', 'Enter your password')}
                  className="transition-smooth pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                className="text-sm text-primary hover:underline"
              >
                {t('auth.login.forgotPassword', 'Forgot password?')}
              </button>
            </div>

            <Button 
              type="submit" 
              className="w-full transition-smooth hover-scale"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing in...' : t('auth.login.submit', 'Sign In')}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              {t('auth.login.noAccount', "Don't have an account?")}{' '}
              <Link to="/register" className="text-primary hover:underline">
                {t('auth.register.title', 'Sign up')}
              </Link>
            </p>

            {/* Demo credentials */}
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium text-muted-foreground mb-2">Demo Credentials:</p>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p>Job Seeker: jobseeker@demo.com / password123</p>
                <p>Employer: employer@demo.com / password123</p>
                <p>Admin: admin@demo.com / password123</p>
                <p>Franchise: franchise@demo.com / password123</p>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};