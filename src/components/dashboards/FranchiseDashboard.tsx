import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  MapPin, 
  DollarSign, 
  Users, 
  Building2, 
  TrendingUp, 
  Target,
  Award,
  Calendar,
  Phone,
  Mail
} from "lucide-react";

const FranchiseDashboard = () => {
  const franchiseData = {
    code: "FC-MUM-001",
    city: "Mumbai",
    state: "Maharashtra",
    monthlyTarget: 50,
    achieved: 32,
    commission: 45600
  };

  const branches = [
    {
      id: 1,
      name: "Andheri Branch",
      manager: "Priya Sharma",
      placements: 12,
      target: 15,
      revenue: 18500
    },
    {
      id: 2,
      name: "Bandra Branch",
      manager: "Rahul Gupta",
      placements: 20,
      target: 20,
      revenue: 32000
    },
    {
      id: 3,
      name: "Powai Branch",
      manager: "Anjali Patel",
      placements: 8,
      target: 12,
      revenue: 12100
    }
  ];

  const recentPlacements = [
    {
      id: 1,
      candidate: "Amit Kumar",
      company: "TechCorp Inc.",
      position: "Software Engineer",
      salary: "₹8 LPA",
      commission: "₹4,000",
      date: "2 days ago"
    },
    {
      id: 2,
      candidate: "Sneha Joshi",
      company: "StartupXYZ",
      position: "Product Manager",
      salary: "₹12 LPA",
      commission: "₹6,000",
      date: "1 week ago"
    },
    {
      id: 3,
      candidate: "Rohan Mehta",
      company: "Design Studio",
      position: "UI Designer",
      salary: "₹6 LPA",
      commission: "₹3,000",
      date: "1 week ago"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold">Franchise Dashboard</h1>
            <p className="text-muted-foreground">
              {franchiseData.city}, {franchiseData.state} • Code: {franchiseData.code}
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Users className="w-4 h-4 mr-2" />
              Find Candidates
            </Button>
            <Button size="sm">
              <Building2 className="w-4 h-4 mr-2" />
              Add Branch
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Performance Overview */}
            <div className="grid grid-cols-4 gap-4 animate-slide-up">
              <Card className="shadow-soft">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-franchise/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Target className="w-6 h-6 text-franchise" />
                    </div>
                    <p className="text-2xl font-bold">{franchiseData.achieved}</p>
                    <p className="text-sm text-muted-foreground">Placements</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-soft">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <DollarSign className="w-6 h-6 text-success" />
                    </div>
                    <p className="text-2xl font-bold">₹{(franchiseData.commission / 1000).toFixed(0)}K</p>
                    <p className="text-sm text-muted-foreground">Commission</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-soft">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-2xl font-bold">{branches.length}</p>
                    <p className="text-sm text-muted-foreground">Branches</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-soft">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <TrendingUp className="w-6 h-6 text-warning" />
                    </div>
                    <p className="text-2xl font-bold">{Math.round((franchiseData.achieved / franchiseData.monthlyTarget) * 100)}%</p>
                    <p className="text-sm text-muted-foreground">Target</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Monthly Target Progress */}
            <Card className="shadow-medium animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <CardHeader>
                <CardTitle>Monthly Performance</CardTitle>
                <CardDescription>Track your placement targets and commission earnings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Placement Target</span>
                      <span className="font-semibold">{franchiseData.achieved} / {franchiseData.monthlyTarget}</span>
                    </div>
                    <Progress value={(franchiseData.achieved / franchiseData.monthlyTarget) * 100} className="h-3" />
                    <p className="text-sm text-muted-foreground mt-2">
                      {franchiseData.monthlyTarget - franchiseData.achieved} more placements needed to reach target
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-success/10 rounded-lg">
                      <DollarSign className="w-8 h-8 text-success mx-auto mb-2" />
                      <p className="text-2xl font-bold text-success">₹{franchiseData.commission.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Total Commission</p>
                    </div>
                    <div className="text-center p-4 bg-primary/10 rounded-lg">
                      <Award className="w-8 h-8 text-primary mx-auto mb-2" />
                      <p className="text-2xl font-bold text-primary">Gold</p>
                      <p className="text-sm text-muted-foreground">Partner Status</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Branch Performance */}
            <Card className="shadow-medium animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Branch Performance</CardTitle>
                    <CardDescription>Monitor individual branch performance</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {branches.map((branch) => (
                  <div key={branch.id} className="border rounded-lg p-4 hover:shadow-soft transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{branch.name}</h3>
                        <p className="text-sm text-muted-foreground">Manager: {branch.manager}</p>
                      </div>
                      <Badge 
                        variant={branch.placements >= branch.target ? "default" : "secondary"}
                        className={branch.placements >= branch.target ? "bg-success text-success-foreground" : ""}
                      >
                        {branch.placements >= branch.target ? "Target Met" : "In Progress"}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-2 bg-muted/50 rounded">
                        <p className="text-lg font-bold text-primary">{branch.placements}</p>
                        <p className="text-xs text-muted-foreground">Placements</p>
                      </div>
                      <div className="text-center p-2 bg-muted/50 rounded">
                        <p className="text-lg font-bold text-warning">{branch.target}</p>
                        <p className="text-xs text-muted-foreground">Target</p>
                      </div>
                      <div className="text-center p-2 bg-muted/50 rounded">
                        <p className="text-lg font-bold text-success">₹{branch.revenue.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Revenue</p>
                      </div>
                    </div>
                    
                    <Progress value={(branch.placements / branch.target) * 100} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Recent Placements */}
            <Card className="shadow-soft animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <CardHeader>
                <CardTitle className="text-lg">Recent Placements</CardTitle>
                <CardDescription>Latest successful placements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentPlacements.map((placement) => (
                  <div key={placement.id} className="space-y-3 pb-4 border-b border-border last:border-b-0 last:pb-0">
                    <div>
                      <h4 className="font-medium">{placement.candidate}</h4>
                      <p className="text-sm text-muted-foreground">{placement.position}</p>
                      <p className="text-sm font-medium text-primary">{placement.company}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Salary: </span>
                        <span className="font-medium">{placement.salary}</span>
                      </div>
                      <Badge variant="secondary" className="bg-success/10 text-success">
                        {placement.commission}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{placement.date}</p>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full">
                  View All Placements
                </Button>
              </CardContent>
            </Card>

            {/* Quick Contact */}
            <Card className="shadow-soft animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <CardHeader>
                <CardTitle className="text-lg">Quick Contact</CardTitle>
                <CardDescription>Reach out to headquarters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Support
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Support
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Meeting
                </Button>
              </CardContent>
            </Card>

            {/* Location Card */}
            <Card className="shadow-soft animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <CardHeader>
                <CardTitle className="text-lg">Territory Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">{franchiseData.city}</p>
                    <p className="text-sm text-muted-foreground">{franchiseData.state}</p>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm"><span className="font-medium">Franchise Code:</span> {franchiseData.code}</p>
                  <p className="text-sm"><span className="font-medium">Partner Since:</span> Jan 2023</p>
                  <p className="text-sm"><span className="font-medium">Status:</span> <Badge variant="secondary" className="bg-success/10 text-success text-xs">Active</Badge></p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FranchiseDashboard;