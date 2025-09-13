import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from 'react-i18next';
import { User, Mail, Phone, MapPin, Briefcase, Wrench, Star } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

interface RegistrationFormData {
  fullName: string;
  email: string;
  phone: string;
  role: 'jobSeeker' | 'employer' | 'franchise' | 'admin';
  location: string;
  experience?: string;
  companyName?: string;
  profession?: string;
  skills?: string;
}

export const RegistrationForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<RegistrationFormData>();
  const selectedRole = watch('role');

  const onSubmit = async (data: RegistrationFormData) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Registration data:', data);
    
    // Create dummy user from registration data
    const newUser = {
      email: data.email,
      name: data.fullName,
      role: data.role,
      isVerified: false, // New users are not verified by default
    };
    
    // Auto-login the user after registration
    login(newUser);
    toast.success(`Welcome ${data.fullName}! Your account has been created.`);
    
    // Navigate based on role
    if (data.role === 'admin') {
      navigate('/dashboard/admin');
    } else {
      navigate(`/dashboard/${data.role}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto shadow-elegant">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold text-primary">
            {t('auth.register.title', 'Create Account')}
          </CardTitle>
          <CardDescription>
            {t('auth.register.description', 'Join thousands of professionals')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {t('auth.fields.fullName', 'Full Name')}
              </Label>
              <Input
                id="fullName"
                {...register('fullName', { required: 'Full name is required' })}
                placeholder={t('auth.placeholders.fullName', 'Enter your full name')}
                className="transition-smooth"
              />
              {errors.fullName && (
                <p className="text-sm text-destructive">{errors.fullName.message}</p>
              )}
            </div>

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
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {t('auth.fields.phone', 'Phone')}
              </Label>
              <Input
                id="phone"
                {...register('phone', { required: 'Phone number is required' })}
                placeholder={t('auth.placeholders.phone', 'Enter your phone number')}
                className="transition-smooth"
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                {t('auth.fields.role', 'Role')}
              </Label>
              <Select onValueChange={(value) => register('role').onChange({ target: { value } })}>
                <SelectTrigger className="transition-smooth">
                  <SelectValue placeholder={t('auth.placeholders.role', 'Select your role')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jobSeeker">{t('roleSelection.roles.jobSeeker.title', 'Job Seeker')}</SelectItem>
                  <SelectItem value="employer">{t('roleSelection.roles.employer.title', 'Employer')}</SelectItem>
                  <SelectItem value="franchise">{t('roleSelection.roles.franchise.title', 'Franchise Partner')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {t('auth.fields.location', 'Location')}
              </Label>
              <Input
                id="location"
                {...register('location', { required: 'Location is required' })}
                placeholder={t('auth.placeholders.location', 'Enter your city')}
                className="transition-smooth"
              />
              {errors.location && (
                <p className="text-sm text-destructive">{errors.location.message}</p>
              )}
            </div>

            {selectedRole === 'jobSeeker' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="experience">
                    {t('auth.fields.experience', 'Experience')}
                  </Label>
                  <Select onValueChange={(value) => register('experience').onChange({ target: { value } })}>
                    <SelectTrigger className="transition-smooth bg-background">
                      <SelectValue placeholder={t('auth.placeholders.experience', 'Select experience level')} />
                    </SelectTrigger>
                    <SelectContent className="bg-background border z-50">
                      <SelectItem value="fresher">Fresher</SelectItem>
                      <SelectItem value="1-2">1-2 Years</SelectItem>
                      <SelectItem value="3-5">3-5 Years</SelectItem>
                      <SelectItem value="5+">5+ Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profession" className="flex items-center gap-2">
                    <Wrench className="w-4 h-4" />
                    {t('auth.fields.profession', 'Profession')}
                  </Label>
                  <Select onValueChange={(value) => register('profession').onChange({ target: { value } })}>
                    <SelectTrigger className="transition-smooth bg-background">
                      <SelectValue placeholder={t('auth.placeholders.profession', 'Select your profession')} />
                    </SelectTrigger>
                    <SelectContent className="bg-background border z-50">
                      <SelectItem value="plumber">Plumber</SelectItem>
                      <SelectItem value="electrician">Electrician</SelectItem>
                      <SelectItem value="carpenter">Carpenter</SelectItem>
                      <SelectItem value="painter">Painter</SelectItem>
                      <SelectItem value="mechanic">Mechanic</SelectItem>
                      <SelectItem value="welder">Welder</SelectItem>
                      <SelectItem value="mason">Mason</SelectItem>
                      <SelectItem value="driver">Driver</SelectItem>
                      <SelectItem value="security-guard">Security Guard</SelectItem>
                      <SelectItem value="cleaner">Cleaner</SelectItem>
                      <SelectItem value="cook">Cook</SelectItem>
                      <SelectItem value="gardener">Gardener</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills" className="flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    {t('auth.fields.skills', 'Skills')}
                  </Label>
                  <Textarea
                    id="skills"
                    {...register('skills')}
                    placeholder={t('auth.placeholders.skills', 'List your skills (e.g., pipe fitting, electrical wiring, tile work)')}
                    className="transition-smooth min-h-[80px]"
                    rows={3}
                  />
                </div>
              </>
            )}

            {selectedRole === 'employer' && (
              <div className="space-y-2">
                <Label htmlFor="companyName">
                  {t('auth.fields.companyName', 'Company Name')}
                </Label>
                <Input
                  id="companyName"
                  {...register('companyName', { required: 'Company name is required' })}
                  placeholder={t('auth.placeholders.companyName', 'Enter company name')}
                  className="transition-smooth"
                />
                {errors.companyName && (
                  <p className="text-sm text-destructive">{errors.companyName.message}</p>
                )}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full transition-smooth hover-scale"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Account...' : t('auth.register.submit', 'Create Account')}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              {t('auth.register.hasAccount', 'Already have an account?')}{' '}
              <Link to="/login" className="text-primary hover:underline">
                {t('auth.login.title', 'Sign In')}
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};