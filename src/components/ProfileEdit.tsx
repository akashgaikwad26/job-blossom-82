import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useTranslation } from 'react-i18next';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Wrench, 
  Star, 
  Camera,
  Save,
  Edit,
  Plus,
  X
} from 'lucide-react';

interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  experience: string;
  profession: string;
  skills: string[];
  portfolio: string;
  companyName?: string;
}

const ProfileEdit = () => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  
  // Dummy user data
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    phone: "+91 98765 43210",
    location: "Mumbai, Maharashtra",
    bio: "Experienced electrician with 8+ years in residential and commercial electrical work. Specialized in electrical installations, maintenance, and troubleshooting.",
    experience: "5+",
    profession: "electrician",
    skills: ["Electrical Wiring", "Circuit Installation", "Troubleshooting", "Panel Upgrades", "Safety Compliance"],
    portfolio: "https://portfolio.example.com"
  });

  const { register, handleSubmit, watch, setValue } = useForm<ProfileData>({
    defaultValues: profileData
  });

  const onSubmit = (data: ProfileData) => {
    console.log('Profile updated:', data);
    setProfileData(data);
    setIsEditing(false);
  };

  const addSkill = () => {
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      const updatedSkills = [...profileData.skills, newSkill.trim()];
      setProfileData(prev => ({ ...prev, skills: updatedSkills }));
      setValue('skills', updatedSkills);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const updatedSkills = profileData.skills.filter(skill => skill !== skillToRemove);
    setProfileData(prev => ({ ...prev, skills: updatedSkills }));
    setValue('skills', updatedSkills);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Profile Header */}
      <Card className="shadow-medium">
        <CardContent className="pt-6">
          <div className="flex items-start gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src="/api/placeholder/96/96" alt={profileData.fullName} />
                <AvatarFallback className="text-lg">
                  {profileData.fullName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button 
                  size="sm" 
                  className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              )}
            </div>
            
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{profileData.fullName}</h2>
                <Button 
                  variant={isEditing ? "destructive" : "outline"}
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? (
                    <>
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </>
                  ) : (
                    <>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </>
                  )}
                </Button>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Wrench className="w-4 h-4" />
                  <span className="capitalize">{profileData.profession}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{profileData.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="w-4 h-4" />
                  <span>{profileData.experience} experience</span>
                </div>
              </div>
              
              <p className="text-muted-foreground">{profileData.bio}</p>
              
              {/* Skills */}
              <div className="flex flex-wrap gap-2 mt-3">
                {profileData.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    {isEditing && (
                      <button
                        onClick={() => removeSkill(skill)}
                        className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Form */}
      {isEditing && (
        <Card className="shadow-medium animate-fade-in">
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>Update your profile information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    {...register('fullName')}
                    className="transition-smooth"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    className="transition-smooth"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    {...register('phone')}
                    className="transition-smooth"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Location
                  </Label>
                  <Input
                    id="location"
                    {...register('location')}
                    className="transition-smooth"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Experience Level</Label>
                  <Select 
                    value={watch('experience')} 
                    onValueChange={(value) => setValue('experience', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
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
                    Profession
                  </Label>
                  <Select 
                    value={watch('profession')} 
                    onValueChange={(value) => setValue('profession', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio/Summary</Label>
                <Textarea
                  id="bio"
                  {...register('bio')}
                  placeholder="Tell employers about yourself, your experience, and what makes you unique..."
                  className="min-h-[100px]"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="portfolio">Portfolio/Website (Optional)</Label>
                <Input
                  id="portfolio"
                  {...register('portfolio')}
                  placeholder="https://your-portfolio.com"
                />
              </div>

              {/* Skills Management */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Skills
                </Label>
                
                <div className="flex gap-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a new skill"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  />
                  <Button type="button" onClick={addSkill} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="flex items-center gap-1">
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-success hover:bg-success/90">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Profile Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-soft">
          <CardContent className="pt-6 text-center">
            <div className="w-12 h-12 bg-job-seeker/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Briefcase className="w-6 h-6 text-job-seeker" />
            </div>
            <p className="text-2xl font-bold">12</p>
            <p className="text-sm text-muted-foreground">Applications Sent</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="pt-6 text-center">
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 text-success" />
            </div>
            <p className="text-2xl font-bold">4.8</p>
            <p className="text-sm text-muted-foreground">Average Rating</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="pt-6 text-center">
            <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <User className="w-6 h-6 text-warning" />
            </div>
            <p className="text-2xl font-bold">156</p>
            <p className="text-sm text-muted-foreground">Profile Views</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileEdit;