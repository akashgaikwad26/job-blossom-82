import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Target,
  Home,
  FileText,
  User,
  Lock,
  Play,
  Brain,
  ArrowRight
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

  const [assessments, setAssessments] = useState([
    { 
      id: 1,
      title: "JavaScript Fundamentals", 
      progress: 100, 
      score: 85, 
      status: "completed",
      unlocked: true 
    },
    { 
      id: 2,
      title: "React Development", 
      progress: 60, 
      score: null, 
      status: "in-progress",
      unlocked: true 
    },
    { 
      id: 3,
      title: "System Design", 
      progress: 0, 
      score: null, 
      status: "locked",
      unlocked: false 
    },
    { 
      id: 4,
      title: "Node.js Backend", 
      progress: 0, 
      score: null, 
      status: "locked",
      unlocked: false 
    }
  ]);

  // Check and update unlock status based on completion
  const updateUnlockStatus = () => {
    setAssessments(prev => {
      const updated = [...prev];
      for (let i = 1; i < updated.length; i++) {
        const previousCompleted = updated[i - 1].status === "completed";
        if (previousCompleted && !updated[i].unlocked) {
          updated[i] = { ...updated[i], unlocked: true, status: "available" };
        }
      }
      return updated;
    });
  };

  // Handle starting an assessment
  const handleStartAssessment = (assessmentId: number) => {
    // Navigate to assessment page
    window.location.href = `/assessment/${assessmentId}`;
  };

  // Handle continuing an assessment
  const handleContinueAssessment = (assessmentId: number) => {
    // Navigate to assessment page
    window.location.href = `/assessment/${assessmentId}`;
  };

  React.useEffect(() => {
    updateUnlockStatus();
  }, []);

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

        {/* Tabs Layout */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="applications" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              My Applications
            </TabsTrigger>
            <TabsTrigger value="preparedness" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Preparedness
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Job Map
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile & Skills
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
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
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            <Card className="shadow-medium">
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
          </TabsContent>

          {/* Preparedness Tab */}
          <TabsContent value="preparedness" className="space-y-6">
            {/* Preparedness Score Bar */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-xl">Interview Preparedness Score</CardTitle>
                <CardDescription>Your overall readiness for job interviews</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Overall Score</span>
                    <span className="text-2xl font-bold text-success">{preparednessScore}/100</span>
                  </div>
                  <Progress value={preparednessScore} className="h-3" />
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-success">85</div>
                      <div className="text-sm text-muted-foreground">Technical Skills</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-warning">72</div>
                      <div className="text-sm text-muted-foreground">Communication</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-primary">90</div>
                      <div className="text-sm text-muted-foreground">Industry Knowledge</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Prep Modules */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-xl">Preparation Modules</CardTitle>
                <CardDescription>Complete these modules to improve your interview readiness</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    {
                      id: 1,
                      title: "Technical Interview Prep",
                      description: "Practice coding problems and system design",
                      progress: 75,
                      icon: "🔧",
                      status: "in-progress"
                    },
                    {
                      id: 2,
                      title: "Behavioral Questions",
                      description: "Master common behavioral interview questions",
                      progress: 100,
                      icon: "💬",
                      status: "completed"
                    },
                    {
                      id: 3,
                      title: "Industry Knowledge",
                      description: "Stay updated with latest industry trends",
                      progress: 60,
                      icon: "📚",
                      status: "in-progress"
                    },
                    {
                      id: 4,
                      title: "Company Research",
                      description: "Learn how to research potential employers",
                      progress: 0,
                      icon: "🏢",
                      status: "not-started"
                    }
                  ].map((module) => (
                    <div key={module.id} className="border rounded-lg p-4 hover:shadow-soft transition-shadow">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="text-2xl">{module.icon}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{module.title}</h3>
                          <p className="text-sm text-muted-foreground">{module.description}</p>
                        </div>
                        <Badge 
                          variant={module.status === 'completed' ? 'default' : module.status === 'in-progress' ? 'secondary' : 'outline'}
                          className={
                            module.status === 'completed' ? 'bg-success/10 text-success' :
                            module.status === 'in-progress' ? 'bg-primary/10 text-primary' :
                            'border-muted-foreground/20'
                          }
                        >
                          {module.status === 'completed' ? 'Completed' :
                           module.status === 'in-progress' ? 'In Progress' :
                           'Not Started'}
                        </Badge>
                      </div>
                      
                      {module.progress > 0 && (
                        <div className="mb-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Progress</span>
                            <span>{module.progress}%</span>
                          </div>
                          <Progress value={module.progress} className="h-1" />
                        </div>
                      )}
                      
                      <Button 
                        variant={module.status === 'completed' ? 'outline' : 'default'} 
                        size="sm" 
                        className="w-full"
                      >
                        {module.status === 'completed' ? 'Review' :
                         module.status === 'in-progress' ? 'Continue' :
                         'Start Module'}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Mock Assessment */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-xl">Quick Assessment</CardTitle>
                <CardDescription>Test your knowledge with these sample questions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Question 1 */}
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">1. What is your greatest strength as a professional?</h4>
                    <div className="space-y-2">
                      {['Problem-solving abilities', 'Team collaboration', 'Technical expertise', 'Leadership skills'].map((option, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <input type="radio" name="q1" id={`q1-${idx}`} className="text-primary" />
                          <label htmlFor={`q1-${idx}`} className="text-sm cursor-pointer">{option}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Question 2 */}
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">2. How do you handle working under pressure?</h4>
                    <div className="space-y-2">
                      {['I prioritize tasks and stay organized', 'I work better under pressure', 'I take breaks to manage stress', 'I communicate with my team for support'].map((option, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <input type="radio" name="q2" id={`q2-${idx}`} className="text-primary" />
                          <label htmlFor={`q2-${idx}`} className="text-sm cursor-pointer">{option}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Question 3 */}
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">3. Where do you see yourself in 5 years?</h4>
                    <div className="space-y-2">
                      {['Leading a team in my field', 'Mastering advanced technical skills', 'Starting my own business', 'Mentoring junior professionals'].map((option, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <input type="radio" name="q3" id={`q3-${idx}`} className="text-primary" />
                          <label htmlFor={`q3-${idx}`} className="text-sm cursor-pointer">{option}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 justify-end">
                    <Button variant="outline">Save Draft</Button>
                    <Button>Submit Assessment</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Map Tab */}
          <TabsContent value="map" className="space-y-6">
            <JobsMap />
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Profile Completeness */}
              <Card className="shadow-soft">
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
              <Card className="shadow-soft">
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
            </div>

            {/* Assessment Progress */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">Skill Assessments</CardTitle>
                <CardDescription>Complete modules progressively to unlock advanced skills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {assessments.slice(0, 3).map((assessment) => (
                    <div key={assessment.id} className="flex items-center justify-between p-3 border rounded-lg hover:shadow-soft transition-all">
                      <div className="flex items-center gap-3">
                        {assessment.status === "locked" ? (
                          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                            <Lock className="w-4 h-4 text-muted-foreground" />
                          </div>
                        ) : assessment.status === "completed" ? (
                          <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-success" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <Play className="w-4 h-4 text-primary" />
                          </div>
                        )}
                        <div>
                          <span className="font-medium text-sm">{assessment.title}</span>
                          <div className="flex items-center gap-2 mt-1">
                            {assessment.status === "completed" && (
                              <Badge variant="secondary" className="bg-success/10 text-success text-xs h-5">
                                <Star className="w-3 h-3 mr-1" />
                                {assessment.score}
                              </Badge>
                            )}
                            {assessment.status === "locked" && (
                              <Badge variant="outline" className="text-xs h-5">
                                Locked
                              </Badge>
                            )}
                            {assessment.status === "in-progress" && (
                              <Badge variant="secondary" className="bg-primary/10 text-primary text-xs h-5">
                                {assessment.progress}% Done
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        {assessment.status === "locked" ? (
                          <Button variant="ghost" size="sm" disabled className="cursor-not-allowed">
                            <Lock className="w-4 h-4" />
                          </Button>
                        ) : assessment.status === "available" ? (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleStartAssessment(assessment.id)}
                          >
                            Start
                          </Button>
                        ) : assessment.status === "in-progress" ? (
                          <Button 
                            variant="default" 
                            size="sm"
                            onClick={() => handleContinueAssessment(assessment.id)}
                          >
                            Continue
                          </Button>
                        ) : (
                          <Button variant="ghost" size="sm">
                            <CheckCircle2 className="w-4 h-4 text-success" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {assessments.length > 3 && (
                    <div className="max-h-40 overflow-y-auto space-y-3 pt-2 border-t">
                      {assessments.slice(3).map((assessment) => (
                        <div key={assessment.id} className="flex items-center justify-between p-3 border rounded-lg hover:shadow-soft transition-all">
                          <div className="flex items-center gap-3">
                            {assessment.status === "locked" ? (
                              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                                <Lock className="w-4 h-4 text-muted-foreground" />
                              </div>
                            ) : assessment.status === "completed" ? (
                              <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                                <CheckCircle2 className="w-4 h-4 text-success" />
                              </div>
                            ) : (
                              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                <Play className="w-4 h-4 text-primary" />
                              </div>
                            )}
                            <div>
                              <span className="font-medium text-sm">{assessment.title}</span>
                              <div className="flex items-center gap-2 mt-1">
                                {assessment.status === "completed" && (
                                  <Badge variant="secondary" className="bg-success/10 text-success text-xs h-5">
                                    <Star className="w-3 h-3 mr-1" />
                                    {assessment.score}
                                  </Badge>
                                )}
                                {assessment.status === "locked" && (
                                  <Badge variant="outline" className="text-xs h-5">
                                    Locked
                                  </Badge>
                                )}
                                {assessment.status === "in-progress" && (
                                  <Badge variant="secondary" className="bg-primary/10 text-primary text-xs h-5">
                                    {assessment.progress}% Done
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            {assessment.status === "locked" ? (
                              <Button variant="ghost" size="sm" disabled className="cursor-not-allowed">
                                <Lock className="w-4 h-4" />
                              </Button>
                            ) : assessment.status === "available" ? (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleStartAssessment(assessment.id)}
                              >
                                Start
                              </Button>
                            ) : assessment.status === "in-progress" ? (
                              <Button 
                                variant="default" 
                                size="sm"
                                onClick={() => handleContinueAssessment(assessment.id)}
                              >
                                Continue
                              </Button>
                            ) : (
                              <Button variant="ghost" size="sm">
                                <CheckCircle2 className="w-4 h-4 text-success" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <Button variant="outline" size="sm" className="w-full mt-4">
                  <BookOpen className="w-4 h-4 mr-2" />
                  View All Assessments
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default JobSeekerDashboard;