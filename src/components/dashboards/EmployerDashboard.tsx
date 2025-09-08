import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Plus, 
  Eye, 
  TrendingUp, 
  Clock, 
  CheckCircle2,
  UserCheck,
  MessageSquare,
  Star
} from "lucide-react";

const EmployerDashboard = () => {
  const activeJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      applicants: 24,
      shortlisted: 8,
      status: "active",
      postedDays: 5
    },
    {
      id: 2,
      title: "Product Manager",
      applicants: 31,
      shortlisted: 12,
      status: "active",
      postedDays: 3
    },
    {
      id: 3,
      title: "UX Designer",
      applicants: 18,
      shortlisted: 6,
      status: "paused",
      postedDays: 8
    }
  ];

  const recentApplications = [
    {
      id: 1,
      candidate: "Sarah Johnson",
      position: "Senior Frontend Developer",
      fitmentScore: 92,
      applied: "2 hours ago",
      status: "new"
    },
    {
      id: 2,
      candidate: "Michael Chen",
      position: "Product Manager",
      fitmentScore: 87,
      applied: "5 hours ago",
      status: "reviewed"
    },
    {
      id: 3,
      candidate: "Emily Davis",
      position: "UX Designer",
      fitmentScore: 94,
      applied: "1 day ago",
      status: "shortlisted"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold">Employer Dashboard</h1>
            <p className="text-muted-foreground">Manage your job postings and find the best candidates</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Post New Job
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4 animate-slide-up">
              <Card className="shadow-soft">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-employer/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Users className="w-6 h-6 text-employer" />
                    </div>
                    <p className="text-2xl font-bold">73</p>
                    <p className="text-sm text-muted-foreground">Total Applicants</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-soft">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <UserCheck className="w-6 h-6 text-success" />
                    </div>
                    <p className="text-2xl font-bold">26</p>
                    <p className="text-sm text-muted-foreground">Shortlisted</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-soft">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Eye className="w-6 h-6 text-warning" />
                    </div>
                    <p className="text-2xl font-bold">3</p>
                    <p className="text-sm text-muted-foreground">Active Jobs</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-soft">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <TrendingUp className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-2xl font-bold">89%</p>
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Active Job Postings */}
            <Card className="shadow-medium animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Active Job Postings</CardTitle>
                    <CardDescription>Monitor your job postings and applicant activity</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">Manage All</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeJobs.map((job) => (
                  <div key={job.id} className="border rounded-lg p-4 hover:shadow-soft transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{job.title}</h3>
                        <p className="text-sm text-muted-foreground">Posted {job.postedDays} days ago</p>
                      </div>
                      <Badge variant={job.status === "active" ? "default" : "secondary"}>
                        {job.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-2xl font-bold text-primary">{job.applicants}</p>
                        <p className="text-sm text-muted-foreground">Applicants</p>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-2xl font-bold text-success">{job.shortlisted}</p>
                        <p className="text-sm text-muted-foreground">Shortlisted</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <Progress value={(job.shortlisted / job.applicants) * 100} className="w-32 h-2" />
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">View Details</Button>
                        <Button size="sm">Manage</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Recent Applications */}
            <Card className="shadow-soft animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle className="text-lg">Recent Applications</CardTitle>
                <CardDescription>Latest candidate applications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentApplications.map((application) => (
                  <div key={application.id} className="space-y-3 pb-4 border-b border-border last:border-b-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium">{application.candidate}</h4>
                        <p className="text-sm text-muted-foreground">{application.position}</p>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${
                          application.fitmentScore > 90 ? 'bg-success/10 text-success' : 
                          application.fitmentScore > 80 ? 'bg-warning/10 text-warning' : 
                          'bg-muted'
                        }`}
                      >
                        <Star className="w-3 h-3 mr-1" />
                        {application.fitmentScore}%
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">{application.applied}</span>
                      <Badge variant="outline" className="text-xs">
                        {application.status}
                      </Badge>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full">
                  View All Applications
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-soft animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Job Posting
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Browse Candidates
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>

            {/* Company Performance */}
            <Card className="shadow-soft animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <CardHeader>
                <CardTitle className="text-lg">This Month</CardTitle>
                <CardDescription>Performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Job Views</span>
                  <span className="font-semibold">2,847</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Applications</span>
                  <span className="font-semibold">156</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Hires Made</span>
                  <span className="font-semibold">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Success Rate</span>
                  <Badge variant="secondary" className="bg-success/10 text-success">
                    89%
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;