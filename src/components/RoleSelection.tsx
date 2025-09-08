import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserCircle, Building2, Users, ArrowRight, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RoleSelection = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string>("");

  const roles = [
    {
      id: "job-seeker",
      title: "Job Seeker",
      description: "Find your dream job with personalized recommendations",
      icon: UserCircle,
      color: "job-seeker",
      features: [
        "AI-powered job matching",
        "Skill assessments & certificates",
        "Interview preparation tools",
        "Career progression tracking"
      ],
      stats: "5,000+ active positions"
    },
    {
      id: "employer",
      title: "Employer",
      description: "Find the perfect candidates for your organization",
      icon: Building2,
      color: "employer",
      features: [
        "Advanced candidate filtering",
        "Skill-based assessments",
        "Applicant tracking system",
        "Company branding tools"
      ],
      stats: "2,000+ companies trust us"
    },
    {
      id: "franchise",
      title: "Franchise Partner",
      description: "Expand our network and earn with every placement",
      icon: Users,
      color: "franchise",
      features: [
        "Territory management",
        "Commission tracking",
        "Local job market insights",
        "Marketing support & tools"
      ],
      stats: "500+ franchise locations"
    }
  ];

  const handleContinue = () => {
    if (selectedRole) {
      navigate(`/dashboard/${selectedRole}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">Choose Your Role</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select how you'd like to use JobConnect to get personalized features and content
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {roles.map((role, index) => (
            <Card 
              key={role.id}
              className={`cursor-pointer transition-all duration-300 shadow-soft hover:shadow-medium animate-slide-up ${
                selectedRole === role.id 
                  ? `ring-2 ring-${role.color} shadow-medium` 
                  : 'hover:scale-105'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedRole(role.id)}
            >
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-${role.color}/10 flex items-center justify-center`}>
                  <role.icon className={`w-8 h-8 text-${role.color}`} />
                </div>
                <CardTitle className="text-xl">{role.title}</CardTitle>
                <CardDescription className="text-sm">
                  {role.description}
                </CardDescription>
                <Badge variant="secondary" className="w-fit mx-auto mt-2">
                  {role.stats}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {role.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <CheckCircle2 className={`w-4 h-4 text-${role.color} flex-shrink-0`} />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Continue Button */}
        <div className="text-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <Button 
            size="lg" 
            className="px-8"
            disabled={!selectedRole}
            onClick={handleContinue}
          >
            Continue as {selectedRole ? roles.find(r => r.id === selectedRole)?.title : "..."}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          {selectedRole && (
            <p className="text-sm text-muted-foreground mt-4">
              You can change your role anytime in settings
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;