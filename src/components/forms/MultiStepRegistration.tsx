import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useTranslation } from 'react-i18next';
import { User, Mail, Phone, MapPin, Briefcase, Wrench, Star, Upload, FileText, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RegistrationFormData {
  fullName: string;
  email: string;
  phone: string;
  role: 'jobSeeker' | 'employer' | 'franchise';
  location: string;
  experience?: string;
  companyName?: string;
  profession?: string;
  skills?: string;
  bio?: string;
  portfolio?: string;
  documents?: FileList;
  aadharCard?: FileList;
  panCard?: FileList;
  certificates?: FileList;
}

const steps = [
  { id: 1, title: 'Basic Info', description: 'Personal details' },
  { id: 2, title: 'Profile', description: 'Professional information' },
  { id: 3, title: 'Verification', description: 'Document upload' }
];

export const MultiStepRegistration = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegistrationFormData>();
  const selectedRole = watch('role');

  const onSubmit = (data: RegistrationFormData) => {
    console.log('Registration data:', data);
    // Navigate to appropriate dashboard based on role
    const roleMap = {
      jobSeeker: 'job-seeker',
      employer: 'employer', 
      franchise: 'franchise'
    };
    navigate(`/dashboard/${roleMap[data.role]}`);
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const progressPercentage = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto shadow-large">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold text-primary">
            {t('auth.register.title', 'Create Account')}
          </CardTitle>
          <CardDescription>
            {t('auth.register.description', 'Join thousands of professionals')}
          </CardDescription>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between mb-2">
              {steps.map((step) => (
                <div key={step.id} className={`flex items-center ${currentStep >= step.id ? 'text-primary' : 'text-muted-foreground'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    currentStep >= step.id ? 'bg-primary text-white border-primary' : 'border-muted-foreground'
                  }`}>
                    {currentStep > step.id ? <CheckCircle2 className="w-4 h-4" /> : step.id}
                  </div>
                  <div className="ml-2 hidden sm:block">
                    <p className="text-sm font-medium">{step.title}</p>
                    <p className="text-xs">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-fade-in">
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
              </div>
            )}

            {/* Step 2: Profile Information */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-fade-in">
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

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio/Summary</Label>
                      <Textarea
                        id="bio"
                        {...register('bio')}
                        placeholder="Tell employers about yourself, your experience, and what makes you unique..."
                        className="transition-smooth min-h-[100px]"
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="portfolio">Portfolio/Previous Work (Optional)</Label>
                      <Input
                        id="portfolio"
                        {...register('portfolio')}
                        placeholder="Link to your previous work or portfolio"
                        className="transition-smooth"
                      />
                    </div>
                  </>
                )}

                {selectedRole === 'employer' && (
                  <>
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

                    <div className="space-y-2">
                      <Label htmlFor="bio">Company Description</Label>
                      <Textarea
                        id="bio"
                        {...register('bio')}
                        placeholder="Describe your company, industry, and what you're looking for..."
                        className="transition-smooth min-h-[100px]"
                        rows={4}
                      />
                    </div>
                  </>
                )}

                {selectedRole === 'franchise' && (
                  <div className="space-y-2">
                    <Label htmlFor="bio">Business Plan</Label>
                    <Textarea
                      id="bio"
                      {...register('bio')}
                      placeholder="Describe your franchise business plan and target market..."
                      className="transition-smooth min-h-[100px]"
                      rows={4}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Document Verification */}
            {currentStep === 3 && (
              <div className="space-y-4 animate-fade-in">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold mb-2">Document Verification</h3>
                  <p className="text-muted-foreground">Upload your documents for identity verification</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="aadharCard" className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Aadhar Card
                    </Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <Input
                        id="aadharCard"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        {...register('aadharCard')}
                        className="hidden"
                      />
                      <Label htmlFor="aadharCard" className="cursor-pointer">
                        <p className="text-sm font-medium">Click to upload Aadhar Card</p>
                        <p className="text-xs text-muted-foreground">PDF, JPG, PNG up to 5MB</p>
                      </Label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="panCard" className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      PAN Card
                    </Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <Input
                        id="panCard"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        {...register('panCard')}
                        className="hidden"
                      />
                      <Label htmlFor="panCard" className="cursor-pointer">
                        <p className="text-sm font-medium">Click to upload PAN Card</p>
                        <p className="text-xs text-muted-foreground">PDF, JPG, PNG up to 5MB</p>
                      </Label>
                    </div>
                  </div>

                  {selectedRole === 'jobSeeker' && (
                    <div className="space-y-2">
                      <Label htmlFor="certificates" className="flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        Certificates (Optional)
                      </Label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <Input
                          id="certificates"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          multiple
                          {...register('certificates')}
                          className="hidden"
                        />
                        <Label htmlFor="certificates" className="cursor-pointer">
                          <p className="text-sm font-medium">Click to upload Skill Certificates</p>
                          <p className="text-xs text-muted-foreground">Multiple files allowed</p>
                        </Label>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Verification Process</p>
                      <p className="text-xs text-muted-foreground">
                        Your documents will be reviewed within 24-48 hours. You'll be notified once verification is complete.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              {currentStep > 1 ? (
                <Button type="button" variant="outline" onClick={prevStep}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
              ) : (
                <div></div>
              )}

              {currentStep < 3 ? (
                <Button type="button" onClick={nextStep}>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button type="submit" className="bg-success hover:bg-success/90">
                  Complete Registration
                  <CheckCircle2 className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};