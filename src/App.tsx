import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import WelcomeScreen from "./components/WelcomeScreen";
import RoleSelection from "./components/RoleSelection";
import Dashboard from "./components/Dashboard";
import JobListings from "./components/JobListings";
import { RegistrationForm } from "./components/forms/RegistrationForm";
import { MultiStepRegistration } from "./components/forms/MultiStepRegistration";
import { JobApplicationForm } from "./components/forms/JobApplicationForm";
import { JobPostingForm } from "./components/forms/JobPostingForm";
import AdminDashboard from "./components/dashboards/AdminDashboard";
import ProfileEdit from "./components/ProfileEdit";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/register-multistep" element={<MultiStepRegistration />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          <Route path="/dashboard/:role" element={<Dashboard />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
          <Route path="/jobs" element={<JobListings />} />
          <Route path="/jobs/apply/:jobId" element={<JobApplicationForm />} />
          <Route path="/jobs/post" element={<JobPostingForm />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
