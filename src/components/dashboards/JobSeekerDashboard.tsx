import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  BookOpen, 
  Award, 
  TrendingUp, 
  MapPin, 
  Clock, 
  DollarSign,
  Star,
  CheckCircle2,
  Target
} from "lucide-react";
import LanguageSwitcher from "../LanguageSwitcher";
import JobsMap from "../JobsMap";

const JobSeekerDashboard = () => {
  const { t } = useTranslation();
  const profileCompleteness = 75;
  const preparednessScore = 82;

  const recommendedJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechCorp Inc.",
      location: "Mumbai, Maharashtra",
      salary: "₹8-12 LPA",
      type: "Full-time",
      match: 95,
      posted: "2 days ago"
    },
    {
      id: 2,
      title: "React.js Developer",
      company: "StartupXYZ",
      location: "Bangalore, Karnataka",
      salary: "₹6-10 LPA",
      type: "Remote",
      match: 88,
      posted: "1 day ago"
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "Design Studio",
      location: "Pune, Maharashtra",
      salary: "₹5-8 LPA",
      type: "Hybrid",
      match: 78,
      posted: "4 hours ago"
    }
  ];

  const assessments = [
    { title: "JavaScript Fundamentals", progress: 100, score: 85, status: "completed" },
    { title: "React Development", progress: 60, score: null, status: "in-progress" },
    { title: "System Design", progress: 0, score: null, status: "available" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold">{t("dashboard.jobSeeker.welcome")}</h1>
            <p className="text-muted-foreground">{t("dashboard.jobSeeker.subtitle")}</p>
          </div>
          <div className="flex gap-3">
            <LanguageSwitcher />
            <Button variant="outline" size="sm" onClick={() => window.location.href = "/profile/edit"}>
              <Search className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
            <Button variant="outline" size="sm">
              <Search className="w-4 h-4 mr-2" />
              {t("dashboard.jobSeeker.browseJobs")}
            </Button>
            <Button size="sm">
              <Target className="w-4 h-4 mr-2" />
              {t("dashboard.jobSeeker.completeProfile")}
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 animate-slide-up">
              <Card className="shadow-soft">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-job-seeker/10 rounded-full flex items-center justify-center">
                      <Search className="w-6 h-6 text-job-seeker" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">127</p>
                      <p className="text-sm text-muted-foreground">Job Matches</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-soft">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-success" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">8</p>
                      <p className="text-sm text-muted-foreground">Applications</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-soft">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-warning" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">3</p>
                      <p className="text-sm text-muted-foreground">Certificates</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recommended Jobs */}
            <Card className="shadow-medium animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Recommended for You</CardTitle>
                    <CardDescription>Jobs that match your skills and preferences</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendedJobs.map((job) => (
                  <div key={job.id} className="border rounded-lg p-4 hover:shadow-soft transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{job.title}</h3>
                        <p className="text-muted-foreground">{job.company}</p>
                      </div>
                      <Badge variant="secondary" className="bg-success/10 text-success">
                        {job.match}% match
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {job.salary}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.posted}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <Badge variant="outline">{job.type}</Badge>
                      <Button size="sm">Apply Now</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Applied Jobs */}
            <Card className="shadow-medium animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle>My Applications</CardTitle>
                <CardDescription>Track your job applications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    id: 1,
                    title: "Senior Electrician",
                    company: "Metro Construction",
                    location: "Mumbai, Maharashtra",
                    appliedDate: "2024-01-20",
                    status: "interview",
                    salary: "₹25,000-35,000"
                  },
                  {
                    id: 2,
                    title: "Electrical Technician",
                    company: "BuildTech Solutions",
                    location: "Pune, Maharashtra", 
                    appliedDate: "2024-01-18",
                    status: "under-review",
                    salary: "₹20,000-28,000"
                  },
                  {
                    id: 3,
                    title: "Maintenance Electrician",
                    company: "Industrial Corp",
                    location: "Nashik, Maharashtra",
                    appliedDate: "2024-01-15",
                    status: "rejected",
                    salary: "₹22,000-30,000"
                  }
                ].map((application) => (
                  <div key={application.id} className="border rounded-lg p-4 hover:shadow-soft transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold">{application.title}</h3>
                        <p className="text-muted-foreground">{application.company}</p>
                      </div>
                      <Badge 
                        variant={
                          application.status === 'interview' ? 'default' :
                          application.status === 'under-review' ? 'secondary' : 
                          'destructive'
                        }
                        className={
                          application.status === 'interview' ? 'bg-success/10 text-success' :
                          application.status === 'under-review' ? 'bg-warning/10 text-warning' :
                          'bg-destructive/10 text-destructive'
                        }
                      >
                        {application.status === 'interview' ? 'Interview Scheduled' :
                         application.status === 'under-review' ? 'Under Review' :
                         'Not Selected'}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {application.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {application.salary}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Applied {application.appliedDate}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <Button variant="outline" size="sm">View Details</Button>
                      {application.status === 'interview' && (
                        <Button size="sm" className="bg-success hover:bg-success/90">
                          View Interview Details
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Nearby Jobs Map */}
            <Card className="shadow-medium animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <CardContent className="p-0">
                <JobsMap />
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Profile Completeness */}
            <Card className="shadow-soft animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle className="text-lg">Profile Completeness</CardTitle>
                <CardDescription>Complete your profile to get better matches</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{profileCompleteness}%</span>
                    </div>
                    <Progress value={profileCompleteness} className="h-2" />
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Complete Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Preparedness Score */}
            <Card className="shadow-soft animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <CardHeader>
                <CardTitle className="text-lg">Preparedness Score</CardTitle>
                <CardDescription>Your readiness for job interviews</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="relative w-24 h-24 mx-auto">
                    <div className="w-24 h-24 rounded-full bg-success/20 flex items-center justify-center">
                      <span className="text-2xl font-bold text-success">{preparednessScore}</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-success">Excellent!</p>
                    <p className="text-sm text-muted-foreground">You're well-prepared for interviews</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Assessment Progress */}
            <Card className="shadow-soft animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <CardHeader>
                <CardTitle className="text-lg">Skill Assessments</CardTitle>
                <CardDescription>Validate your skills with assessments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {assessments.map((assessment, index) => (
                  <div key={assessment.title} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{assessment.title}</span>
                      {assessment.status === "completed" && (
                        <Badge variant="secondary" className="bg-success/10 text-success text-xs">
                          <Star className="w-3 h-3 mr-1" />
                          {assessment.score}
                        </Badge>
                      )}
                    </div>
                    <Progress value={assessment.progress} className="h-1" />
                    {index < assessments.length - 1 && <Separator className="mt-3" />}
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full mt-4">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Take Assessment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerDashboard;