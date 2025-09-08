import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Building2, Network, Star, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";
import logo from "@/assets/logo.png";

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const [selectedAuthMethod, setSelectedAuthMethod] = useState<string>("");

  const authMethods = [
    { id: "email", label: "Continue with Email", icon: "📧" },
    { id: "phone", label: "Continue with Phone", icon: "📱" },
    { id: "google", label: "Continue with Google", icon: "🔍" },
  ];

  const features = [
    { icon: Users, title: "Smart Matching", desc: "AI-powered job recommendations" },
    { icon: Building2, title: "Verified Companies", desc: "Trusted employer network" },
    { icon: Network, title: "Skill Assessment", desc: "Validate your expertise" },
    { icon: Star, title: "Career Growth", desc: "Track your progress" },
  ];

  return (
    <div className="min-h-screen gradient-hero">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-12 animate-fade-in">
          <div className="flex items-center gap-3">
            <img src={logo} alt="JobConnect" className="w-10 h-10 rounded-lg" />
            <h1 className="text-2xl font-bold text-white">JobConnect</h1>
          </div>
          <Badge variant="secondary" className="shadow-soft">
            <CheckCircle2 className="w-4 h-4 mr-1" />
            Trusted by 10K+ professionals
          </Badge>
        </header>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-slide-up">
            <div className="space-y-4">
              <h2 className="text-5xl font-bold text-white leading-tight">
                Find Your Dream Job
                <span className="block text-secondary">with Confidence</span>
              </h2>
              <p className="text-xl text-white/80 leading-relaxed">
                Connect with top employers, showcase your skills through assessments, 
                and accelerate your career journey with personalized recommendations.
              </p>
            </div>

            {/* Auth Methods */}
            <Card className="shadow-large border-white/20 bg-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Get Started Today</CardTitle>
                <CardDescription className="text-white/70">
                  Choose your preferred way to join thousands of professionals
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {authMethods.map((method) => (
                  <Button
                    key={method.id}
                    variant="outline"
                    size="lg"
                    className="w-full justify-start bg-white/20 border-white/30 text-white hover:bg-white/30 hover:text-white transition-all duration-300"
                    onClick={() => {
                      setSelectedAuthMethod(method.id);
                      navigate("/role-selection");
                    }}
                  >
                    <span className="text-xl mr-3">{method.icon}</span>
                    {method.label}
                    <ArrowRight className="w-4 h-4 ml-auto" />
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <Card key={feature.title} className="shadow-soft bg-white/10 backdrop-blur-sm border-white/20 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-4 text-center">
                    <feature.icon className="w-8 h-8 text-secondary mx-auto mb-2" />
                    <h3 className="font-semibold text-white text-sm">{feature.title}</h3>
                    <p className="text-xs text-white/70 mt-1">{feature.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Job marketplace connecting professionals" 
                className="rounded-2xl shadow-large w-full animate-bounce-gentle"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">5K+</div>
            <div className="text-white/70">Active Jobs</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">2K+</div>
            <div className="text-white/70">Companies</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">95%</div>
            <div className="text-white/70">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;