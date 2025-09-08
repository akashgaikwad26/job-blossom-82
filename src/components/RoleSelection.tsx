import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserCircle, Building2, Users, ArrowRight, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";

const RoleSelection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string>("");

  const roles = [
    {
      id: "job-seeker",
      title: t("roleSelection.roles.jobSeeker.title"),
      description: t("roleSelection.roles.jobSeeker.description"),
      icon: UserCircle,
      color: "job-seeker",
      features: t("roleSelection.roles.jobSeeker.features", { returnObjects: true }) as string[],
      stats: t("roleSelection.roles.jobSeeker.stats")
    },
    {
      id: "employer",
      title: t("roleSelection.roles.employer.title"),
      description: t("roleSelection.roles.employer.description"),
      icon: Building2,
      color: "employer",
      features: t("roleSelection.roles.employer.features", { returnObjects: true }) as string[],
      stats: t("roleSelection.roles.employer.stats")
    },
    {
      id: "franchise",
      title: t("roleSelection.roles.franchise.title"),
      description: t("roleSelection.roles.franchise.description"),
      icon: Users,
      color: "franchise",
      features: t("roleSelection.roles.franchise.features", { returnObjects: true }) as string[],
      stats: t("roleSelection.roles.franchise.stats")
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
        <div className="flex justify-between items-center mb-8">
          <div></div>
          <LanguageSwitcher />
        </div>
        
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">{t("roleSelection.title")}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("roleSelection.description")}
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
            {t("roleSelection.continue")} {selectedRole ? roles.find(r => r.id === selectedRole)?.title : "..."}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          {selectedRole && (
            <p className="text-sm text-muted-foreground mt-4">
              {t("roleSelection.changeRole")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;