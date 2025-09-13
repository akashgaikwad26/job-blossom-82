import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useTranslation } from 'react-i18next';
import { Briefcase, MapPin, DollarSign, Clock, Users, Tag } from 'lucide-react';

interface JobPostingFormData {
  jobTitle: string;
  companyName: string;
  department: string;
  location: string;
  jobType: string;
  experienceLevel: string;
  salaryMin: string;
  salaryMax: string;
  description: string;
  requirements: string;
  benefits: string;
  skills: string;
  isRemote: boolean;
  urgentHiring: boolean;
  applicationDeadline: string;
}

interface JobPostingFormProps {
  onSubmit?: (data: JobPostingFormData) => void;
}

export const JobPostingForm = ({ onSubmit }: JobPostingFormProps) => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<JobPostingFormData>();
  const isRemote = watch('isRemote', false);

  const handleFormSubmit = (data: JobPostingFormData) => {
    console.log('Job posting data:', data);
    if (onSubmit) {
      onSubmit(data);
    }
    // This will be connected to Supabase later
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-elegant">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl font-bold text-primary flex items-center gap-2">
              <Briefcase className="w-6 h-6" />
              {t('jobs.posting.title', 'Post a New Job')}
            </CardTitle>
            <CardDescription>
              {t('jobs.posting.description', 'Find the perfect candidates for your organization')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
              {/* Basic Job Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  {t('jobs.posting.sections.basic', 'Basic Information')}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle" className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      {t('jobs.posting.fields.title', 'Job Title')}
                    </Label>
                    <Input
                      id="jobTitle"
                      {...register('jobTitle', { required: 'Job title is required' })}
                      placeholder={t('jobs.posting.placeholders.title', 'e.g., Senior Software Developer')}
                      className="transition-smooth"
                    />
                    {errors.jobTitle && (
                      <p className="text-sm text-destructive">{errors.jobTitle.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyName">
                      {t('jobs.posting.fields.company', 'Company Name')}
                    </Label>
                    <Input
                      id="companyName"
                      {...register('companyName', { required: 'Company name is required' })}
                      placeholder={t('jobs.posting.placeholders.company', 'Enter company name')}
                      className="transition-smooth"
                    />
                    {errors.companyName && (
                      <p className="text-sm text-destructive">{errors.companyName.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">
                      {t('jobs.posting.fields.department', 'Department')}
                    </Label>
                    <Select onValueChange={(value) => setValue('department', value)}>
                      <SelectTrigger className="transition-smooth">
                        <SelectValue placeholder={t('jobs.posting.placeholders.department', 'Select department')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="hr">Human Resources</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="operations">Operations</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {t('jobs.posting.fields.location', 'Location')}
                    </Label>
                    <Input
                      id="location"
                      {...register('location', { required: !isRemote && 'Location is required' })}
                      placeholder={t('jobs.posting.placeholders.location', 'e.g., Mumbai, Maharashtra')}
                      className="transition-smooth"
                      disabled={isRemote}
                    />
                    {errors.location && (
                      <p className="text-sm text-destructive">{errors.location.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isRemote"
                    onCheckedChange={(checked) => setValue('isRemote', checked as boolean)}
                  />
                  <Label htmlFor="isRemote" className="text-sm font-medium">
                    {t('jobs.posting.fields.remote', 'This is a remote position')}
                  </Label>
                </div>
              </div>

              {/* Job Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {t('jobs.posting.sections.details', 'Job Details')}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="jobType">
                      {t('jobs.posting.fields.type', 'Job Type')}
                    </Label>
                    <Select onValueChange={(value) => setValue('jobType', value)}>
                      <SelectTrigger className="transition-smooth">
                        <SelectValue placeholder={t('jobs.posting.placeholders.type', 'Select job type')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full Time</SelectItem>
                        <SelectItem value="part-time">Part Time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="freelance">Freelance</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experienceLevel" className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {t('jobs.posting.fields.experience', 'Experience Level')}
                    </Label>
                    <Select onValueChange={(value) => setValue('experienceLevel', value)}>
                      <SelectTrigger className="transition-smooth">
                        <SelectValue placeholder={t('jobs.posting.placeholders.experience', 'Select experience level')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fresher">Fresher</SelectItem>
                        <SelectItem value="junior">Junior (1-3 years)</SelectItem>
                        <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                        <SelectItem value="senior">Senior (5-8 years)</SelectItem>
                        <SelectItem value="lead">Lead (8+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="salaryMin" className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      {t('jobs.posting.fields.salaryMin', 'Minimum Salary')}
                    </Label>
                    <Input
                      id="salaryMin"
                      {...register('salaryMin', { required: 'Minimum salary is required' })}
                      placeholder={t('jobs.posting.placeholders.salaryMin', 'e.g., 500000')}
                      className="transition-smooth"
                    />
                    {errors.salaryMin && (
                      <p className="text-sm text-destructive">{errors.salaryMin.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="salaryMax">
                      {t('jobs.posting.fields.salaryMax', 'Maximum Salary')}
                    </Label>
                    <Input
                      id="salaryMax"
                      {...register('salaryMax', { required: 'Maximum salary is required' })}
                      placeholder={t('jobs.posting.placeholders.salaryMax', 'e.g., 800000')}
                      className="transition-smooth"
                    />
                    {errors.salaryMax && (
                      <p className="text-sm text-destructive">{errors.salaryMax.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="applicationDeadline">
                    {t('jobs.posting.fields.deadline', 'Application Deadline')}
                  </Label>
                  <Input
                    id="applicationDeadline"
                    type="date"
                    {...register('applicationDeadline', { required: 'Application deadline is required' })}
                    className="transition-smooth"
                  />
                  {errors.applicationDeadline && (
                    <p className="text-sm text-destructive">{errors.applicationDeadline.message}</p>
                  )}
                </div>
              </div>

              {/* Job Content */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  {t('jobs.posting.sections.content', 'Job Content')}
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="description">
                    {t('jobs.posting.fields.description', 'Job Description')}
                  </Label>
                  <Textarea
                    id="description"
                    rows={5}
                    {...register('description', { required: 'Job description is required' })}
                    placeholder={t('jobs.posting.placeholders.description', 'Describe the role, responsibilities, and what makes this opportunity exciting...')}
                    className="transition-smooth resize-none"
                  />
                  {errors.description && (
                    <p className="text-sm text-destructive">{errors.description.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">
                    {t('jobs.posting.fields.requirements', 'Requirements')}
                  </Label>
                  <Textarea
                    id="requirements"
                    rows={4}
                    {...register('requirements', { required: 'Requirements are required' })}
                    placeholder={t('jobs.posting.placeholders.requirements', 'List the essential qualifications, experience, and skills required...')}
                    className="transition-smooth resize-none"
                  />
                  {errors.requirements && (
                    <p className="text-sm text-destructive">{errors.requirements.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills">
                    {t('jobs.posting.fields.skills', 'Key Skills')}
                  </Label>
                  <Input
                    id="skills"
                    {...register('skills', { required: 'Key skills are required' })}
                    placeholder={t('jobs.posting.placeholders.skills', 'e.g., React, Node.js, MongoDB, AWS')}
                    className="transition-smooth"
                  />
                  {errors.skills && (
                    <p className="text-sm text-destructive">{errors.skills.message}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {t('jobs.posting.skillsHint', 'Separate skills with commas')}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="benefits">
                    {t('jobs.posting.fields.benefits', 'Benefits & Perks')}
                  </Label>
                  <Textarea
                    id="benefits"
                    rows={3}
                    {...register('benefits')}
                    placeholder={t('jobs.posting.placeholders.benefits', 'Health insurance, flexible working hours, learning opportunities...')}
                    className="transition-smooth resize-none"
                  />
                </div>
              </div>

              {/* Additional Options */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  {t('jobs.posting.sections.options', 'Additional Options')}
                </h3>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="urgentHiring"
                    onCheckedChange={(checked) => setValue('urgentHiring', checked as boolean)}
                  />
                  <Label htmlFor="urgentHiring" className="text-sm font-medium">
                    {t('jobs.posting.fields.urgent', 'Mark as urgent hiring')}
                  </Label>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <Button type="submit" className="flex-1 transition-smooth hover-scale">
                  {t('jobs.posting.submit', 'Post Job')}
                </Button>
                <Button type="button" variant="outline" className="px-8 transition-smooth">
                  {t('jobs.posting.draft', 'Save as Draft')}
                </Button>
                <Button type="button" variant="ghost" className="px-8 transition-smooth">
                  {t('common.cancel', 'Cancel')}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};