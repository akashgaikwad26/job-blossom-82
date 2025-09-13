import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Users, 
  Building2, 
  Network, 
  TrendingUp,
  Filter,
  Download,
  Eye,
  MoreHorizontal,
  MapPin,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock
} from "lucide-react";
import { useState } from "react";
import LanguageSwitcher from "../LanguageSwitcher";

const AdminDashboard = () => {
  const { t } = useTranslation();
  const [selectedFranchise, setSelectedFranchise] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const stats = {
    totalUsers: 12847,
    jobSeekers: 8932,
    employers: 2456,
    franchises: 1459,
    activeJobs: 3421,
    applications: 15632
  };

  const franchises = [
    { id: "all", name: "All Franchises", location: "All Locations" },
    { id: "mumbai-central", name: "Mumbai Central", location: "Mumbai, Maharashtra" },
    { id: "bangalore-tech", name: "Bangalore Tech Hub", location: "Bangalore, Karnataka" },
    { id: "delhi-metro", name: "Delhi Metro", location: "New Delhi" },
    { id: "pune-west", name: "Pune West", location: "Pune, Maharashtra" },
    { id: "hyderabad-cyber", name: "Hyderabad Cyber City", location: "Hyderabad, Telangana" }
  ];

  const users = [
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh.kumar@email.com",
      role: "Job Seeker",
      franchise: "Mumbai Central",
      joinDate: "2024-01-15",
      status: "verified",
      applications: 12,
      profession: "Electrician"
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya.sharma@company.com",
      role: "Employer",
      franchise: "Bangalore Tech Hub", 
      joinDate: "2024-01-20",
      status: "verified",
      jobs: 8,
      company: "Tech Solutions Ltd"
    },
    {
      id: 3,
      name: "Amit Patel",
      email: "amit.patel@franchise.com",
      role: "Franchise",
      franchise: "Pune West",
      joinDate: "2024-01-10",
      status: "pending",
      users: 145,
      region: "Western Maharashtra"
    },
    {
      id: 4,
      name: "Sunita Reddy",
      email: "sunita.reddy@email.com", 
      role: "Job Seeker",
      franchise: "Hyderabad Cyber City",
      joinDate: "2024-01-25",
      status: "verified",
      applications: 6,
      profession: "Plumber"
    },
    {
      id: 5,
      name: "Vijay Singh",
      email: "vijay@construction.com",
      role: "Employer", 
      franchise: "Delhi Metro",
      joinDate: "2024-01-18",
      status: "pending",
      jobs: 15,
      company: "Singh Construction"
    }
  ];

  const filteredUsers = users.filter(user => {
    if (selectedFranchise !== "all" && user.franchise !== franchises.find(f => f.id === selectedFranchise)?.name) {
      return false;
    }
    if (selectedStatus !== "all" && user.status !== selectedStatus) {
      return false;
    }
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-success/10 text-success"><CheckCircle2 className="w-3 h-3 mr-1" />Verified</Badge>;
      case "pending":
        return <Badge className="bg-warning/10 text-warning"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case "rejected":
        return <Badge className="bg-destructive/10 text-destructive"><AlertCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Job Seeker":
        return <Badge className="bg-job-seeker/10 text-job-seeker">{role}</Badge>;
      case "Employer":
        return <Badge className="bg-employer/10 text-employer">{role}</Badge>;
      case "Franchise":
        return <Badge className="bg-franchise/10 text-franchise">{role}</Badge>;
      default:
        return <Badge variant="secondary">{role}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage users, franchises, and system overview</p>
          </div>
          <div className="flex gap-3">
            <LanguageSwitcher />
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button size="sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8 animate-slide-up">
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-job-seeker/10 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-job-seeker" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.jobSeekers.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Job Seekers</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-employer/10 rounded-full flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-employer" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.employers.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Employers</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-franchise/10 rounded-full flex items-center justify-center">
                  <Network className="w-6 h-6 text-franchise" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.franchises.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Franchises</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.activeJobs.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Active Jobs</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.applications.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Applications</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users Management */}
        <Card className="shadow-medium animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage all users across franchises</CardDescription>
              </div>
              <div className="flex gap-2">
                <Select value={selectedFranchise} onValueChange={setSelectedFranchise}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by franchise" />
                  </SelectTrigger>
                  <SelectContent>
                    {franchises.map((franchise) => (
                      <SelectItem key={franchise.id} value={franchise.id}>
                        {franchise.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Franchise</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        {user.profession && (
                          <p className="text-xs text-muted-foreground">{user.profession}</p>
                        )}
                        {user.company && (
                          <p className="text-xs text-muted-foreground">{user.company}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getRoleBadge(user.role)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-muted-foreground" />
                        <span className="text-sm">{user.franchise}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        <span className="text-sm">{user.joinDate}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(user.status)}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {user.applications && (
                          <p>{user.applications} applications</p>
                        )}
                        {user.jobs && (
                          <p>{user.jobs} job postings</p>
                        )}
                        {user.users && (
                          <p>{user.users} users managed</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;