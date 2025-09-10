import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Building2, Network, Star, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";
import logo from "@/assets/logo.png";
import LanguageSwitcher from "./LanguageSwitcher";

const WelcomeScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedAuthMethod, setSelectedAuthMethod] = useState<string>("");

  const authMethods = [
    { id: "email", label: t("welcome.continueWith.email"), icon: "📧" },
    { id: "phone", label: t("welcome.continueWith.phone"), icon: "📱" },
    { id: "google", label: t("welcome.continueWith.google"), icon: "🔍" },
  ];

  const features = [
    { 
      icon: Users, 
      title: t("welcome.features.smartMatching.title"), 
      desc: t("welcome.features.smartMatching.desc") 
    },
    { 
      icon: Building2, 
      title: t("welcome.features.verifiedCompanies.title"), 
      desc: t("welcome.features.verifiedCompanies.desc") 
    },
    { 
      icon: Network, 
      title: t("welcome.features.skillAssessment.title"), 
      desc: t("welcome.features.skillAssessment.desc") 
    },
    { 
      icon: Star, 
      title: t("welcome.features.careerGrowth.title"), 
      desc: t("welcome.features.careerGrowth.desc") 
    },
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
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Badge variant="secondary" className="shadow-soft">
              <CheckCircle2 className="w-4 h-4 mr-1" />
              {t("welcome.trusted")}
            </Badge>
          </div>
        </header>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-slide-up">
            <div className="space-y-4">
              <h2 className="text-5xl font-bold text-white leading-tight">
                {t("welcome.title")}
                <span className="block text-secondary">{t("welcome.subtitle")}</span>
              </h2>
              <p className="text-xl text-white/80 leading-relaxed">
                {t("welcome.description")}
              </p>
            </div>

            {/* Auth Methods */}
            <Card className="shadow-large border-white/20 bg-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">{t("welcome.getStarted")}</CardTitle>
                <CardDescription className="text-white/70">
                  {t("welcome.chooseMethod")}
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

            {/* Registration Button */}
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="lg"
                className="flex-1 bg-white/20 border-white/30 text-white hover:bg-white/30 hover:text-white transition-all duration-300"
                onClick={() => navigate("/register-multistep")}
              >
                {t("auth.register.title", "Create Account")}
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="flex-1 bg-white/20 border-white/30 text-white hover:bg-white/30 hover:text-white transition-all duration-300"
              >
                {t("auth.login.title", "Sign In")}
              </Button>
            </div>

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
            <div className="text-white/70">{t("welcome.stats.jobs")}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">2K+</div>
            <div className="text-white/70">{t("welcome.stats.companies")}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">95%</div>
            <div className="text-white/70">{t("welcome.stats.successRate")}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;