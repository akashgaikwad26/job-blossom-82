import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from 'react-i18next';
import { FileText, Upload, User, Mail, Phone, Briefcase } from 'lucide-react';

interface JobApplicationFormData {
  applicantName: string;
  email: string;
  phone: string;
  experience: string;
  expectedSalary: string;
  coverLetter: string;
  resume?: FileList;
  availability: string;
}

interface JobApplicationFormProps {
  jobTitle?: string;
  companyName?: string;
  onSubmit?: (data: JobApplicationFormData) => void;
}

export const JobApplicationForm = ({ 
  jobTitle = "Software Developer", 
  companyName = "Tech Company",
  onSubmit 
}: JobApplicationFormProps) => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm<JobApplicationFormData>();

  const handleFormSubmit = (data: JobApplicationFormData) => {
    console.log('Job application data:', data);
    if (onSubmit) {
      onSubmit(data);
    }
    // This will be connected to Supabase later
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-elegant">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl font-bold text-primary flex items-center gap-2">
              <Briefcase className="w-6 h-6" />
              {t('jobs.application.title', 'Apply for Position')}
            </CardTitle>
            <CardDescription className="text-lg">
              <span className="font-semibold">{jobTitle}</span> at <span className="font-semibold">{companyName}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="applicantName" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {t('jobs.application.fields.name', 'Full Name')}
                  </Label>
                  <Input
                    id="applicantName"
                    {...register('applicantName', { required: 'Name is required' })}
                    placeholder={t('jobs.application.placeholders.name', 'Enter your full name')}
                    className="transition-smooth"
                  />
                  {errors.applicantName && (
                    <p className="text-sm text-destructive">{errors.applicantName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {t('jobs.application.fields.email', 'Email')}
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
                    placeholder={t('jobs.application.placeholders.email', 'Enter your email')}
                    className="transition-smooth"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {t('jobs.application.fields.phone', 'Phone')}
                  </Label>
                  <Input
                    id="phone"
                    {...register('phone', { required: 'Phone number is required' })}
                    placeholder={t('jobs.application.placeholders.phone', 'Enter your phone')}
                    className="transition-smooth"
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">
                    {t('jobs.application.fields.experience', 'Experience')}
                  </Label>
                  <Select onValueChange={(value) => register('experience').onChange({ target: { value } })}>
                    <SelectTrigger className="transition-smooth">
                      <SelectValue placeholder={t('jobs.application.placeholders.experience', 'Select experience')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fresher">Fresher</SelectItem>
                      <SelectItem value="1-2">1-2 Years</SelectItem>
                      <SelectItem value="3-5">3-5 Years</SelectItem>
                      <SelectItem value="5-10">5-10 Years</SelectItem>
                      <SelectItem value="10+">10+ Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expectedSalary">
                    {t('jobs.application.fields.salary', 'Expected Salary')}
                  </Label>
                  <Input
                    id="expectedSalary"
                    {...register('expectedSalary', { required: 'Expected salary is required' })}
                    placeholder={t('jobs.application.placeholders.salary', 'e.g., ₹5,00,000')}
                    className="transition-smooth"
                  />
                  {errors.expectedSalary && (
                    <p className="text-sm text-destructive">{errors.expectedSalary.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availability">
                    {t('jobs.application.fields.availability', 'Availability')}
                  </Label>
                  <Select onValueChange={(value) => register('availability').onChange({ target: { value } })}>
                    <SelectTrigger className="transition-smooth">
                      <SelectValue placeholder={t('jobs.application.placeholders.availability', 'When can you start?')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="2weeks">2 Weeks</SelectItem>
                      <SelectItem value="1month">1 Month</SelectItem>
                      <SelectItem value="2months">2 Months</SelectItem>
                      <SelectItem value="3months">3 Months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="resume" className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  {t('jobs.application.fields.resume', 'Resume')}
                </Label>
                <Input
                  id="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  {...register('resume')}
                  className="transition-smooth file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
                />
                <p className="text-xs text-muted-foreground">
                  {t('jobs.application.fileInfo', 'Upload PDF, DOC, or DOCX (Max 5MB)')}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="coverLetter" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  {t('jobs.application.fields.coverLetter', 'Cover Letter')}
                </Label>
                <Textarea
                  id="coverLetter"
                  rows={4}
                  {...register('coverLetter', { required: 'Cover letter is required' })}
                  placeholder={t('jobs.application.placeholders.coverLetter', 'Tell us why you\'re perfect for this role...')}
                  className="transition-smooth resize-none"
                />
                {errors.coverLetter && (
                  <p className="text-sm text-destructive">{errors.coverLetter.message}</p>
                )}
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1 transition-smooth hover-scale">
                  {t('jobs.application.submit', 'Submit Application')}
                </Button>
                <Button type="button" variant="outline" className="px-8 transition-smooth">
                  {t('common.cancel', 'Cancel')}
                </Button>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                <p>{t('jobs.application.privacy', 'Your information will be kept confidential and used only for this application.')}</p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};