import { useParams } from "react-router-dom";
import JobSeekerDashboard from "./dashboards/JobSeekerDashboard";
import EmployerDashboard from "./dashboards/EmployerDashboard";
import FranchiseDashboard from "./dashboards/FranchiseDashboard";
import AdminDashboard from "./dashboards/AdminDashboard";
import { VerificationBadge } from "./VerificationBadge";

const Dashboard = () => {
  const { role } = useParams<{ role: string }>();

  const renderDashboard = () => {
    switch (role) {
      case "job-seeker":
        return (
          <div className="space-y-4">
            <VerificationBadge />
            <JobSeekerDashboard />
          </div>
        );
      case "employer":
        return (
          <div className="space-y-4">
            <VerificationBadge />
            <EmployerDashboard />
          </div>
        );
      case "franchise":
        return (
          <div className="space-y-4">
            <VerificationBadge />
            <FranchiseDashboard />
          </div>
        );
      case "admin":
        return <AdminDashboard />;
      default:
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Invalid Role</h1>
              <p className="text-muted-foreground">Please select a valid role to continue.</p>
            </div>
          </div>
        );
    }
  };

  return renderDashboard();
};

export default Dashboard;