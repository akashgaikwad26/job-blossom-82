import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  MapPin, 
  DollarSign, 
  Clock, 
  Building2, 
  Star, 
  Filter,
  Heart,
  Share2
} from "lucide-react";

const JobListings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedSalary, setSelectedSalary] = useState("");

  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "Mumbai, Maharashtra",
      salary: "₹8-12 LPA",
      type: "Full-time",
      experience: "3-5 years",
      skills: ["React", "TypeScript", "Node.js"],
      match: 95,
      posted: "2 days ago",
      description: "Join our dynamic team to build cutting-edge web applications using modern React ecosystem.",
      remote: false,
      verified: true
    },
    {
      id: 2,
      title: "Product Manager",
      company: "StartupXYZ",
      location: "Bangalore, Karnataka",
      salary: "₹15-20 LPA",
      type: "Full-time",
      experience: "5-7 years",
      skills: ["Product Strategy", "Analytics", "Agile"],
      match: 88,
      posted: "1 day ago",
      description: "Lead product development and strategy for our flagship SaaS platform.",
      remote: true,
      verified: true
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "Design Studio",
      location: "Pune, Maharashtra",
      salary: "₹5-8 LPA",
      type: "Full-time",
      experience: "2-4 years",
      skills: ["Figma", "Prototyping", "User Research"],
      match: 78,
      posted: "4 hours ago",
      description: "Create beautiful and functional user experiences for mobile and web applications.",
      remote: false,
      verified: false
    },
    {
      id: 4,
      title: "DevOps Engineer",
      company: "CloudTech Solutions",
      location: "Hyderabad, Telangana",
      salary: "₹10-15 LPA",
      type: "Full-time",
      experience: "3-6 years",
      skills: ["AWS", "Docker", "Kubernetes"],
      match: 85,
      posted: "1 week ago",
      description: "Build and maintain scalable cloud infrastructure and deployment pipelines.",
      remote: true,
      verified: true
    },
    {
      id: 5,
      title: "Data Scientist",
      company: "Analytics Pro",
      location: "Delhi, NCR",
      salary: "₹12-18 LPA",
      type: "Full-time",
      experience: "4-6 years",
      skills: ["Python", "Machine Learning", "SQL"],
      match: 92,
      posted: "3 days ago",
      description: "Analyze complex datasets and build predictive models to drive business insights.",
      remote: false,
      verified: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">Find Your Dream Job</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover opportunities that match your skills and career aspirations
          </p>
        </div>

        {/* Search & Filters */}
        <Card className="shadow-medium mb-8 animate-slide-up">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search jobs, companies, skills..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mumbai">Mumbai</SelectItem>
                  <SelectItem value="bangalore">Bangalore</SelectItem>
                  <SelectItem value="pune">Pune</SelectItem>
                  <SelectItem value="delhi">Delhi NCR</SelectItem>
                  <SelectItem value="hyderabad">Hyderabad</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedSalary} onValueChange={setSelectedSalary}>
                <SelectTrigger>
                  <SelectValue placeholder="Salary Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-5">₹0-5 LPA</SelectItem>
                  <SelectItem value="5-10">₹5-10 LPA</SelectItem>
                  <SelectItem value="10-15">₹10-15 LPA</SelectItem>
                  <SelectItem value="15-20">₹15-20 LPA</SelectItem>
                  <SelectItem value="20+">₹20+ LPA</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-muted-foreground">
                Showing {jobs.length} jobs • Sorted by relevance
              </p>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Job Listings */}
        <div className="space-y-6">
          {jobs.map((job, index) => (
            <Card 
              key={job.id} 
              className="shadow-soft hover:shadow-medium transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-semibold">{job.title}</h2>
                      {job.verified && (
                        <Badge variant="secondary" className="bg-success/10 text-success text-xs">
                          Verified
                        </Badge>
                      )}
                      <Badge 
                        variant="secondary" 
                        className="bg-primary/10 text-primary text-xs"
                      >
                        {job.match}% match
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium text-primary">{job.company}</span>
                      {job.remote && (
                        <Badge variant="outline" className="text-xs">Remote</Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {job.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <DollarSign className="w-4 h-4" />
                    {job.salary}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {job.experience} • {job.posted}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {job.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-warning fill-current" />
                    <span className="text-sm text-muted-foreground">
                      {job.match}% skill match
                    </span>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button variant="outline">
                      View Details
                    </Button>
                    <Button>
                      Apply Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12 animate-fade-in">
          <Button variant="outline" size="lg">
            Load More Jobs
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Showing 5 of 127 matching jobs
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobListings;