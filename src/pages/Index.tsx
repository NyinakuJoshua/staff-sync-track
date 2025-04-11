
import { useState } from "react";
import LoginForm from "@/components/auth/LoginForm";
import AppLayout from "@/components/layout/AppLayout";
import DashboardPage from "@/components/dashboard/DashboardPage";
import AttendancePage from "@/components/attendance/AttendancePage";
import StaffPage from "@/components/staff/StaffPage";
import CalendarPage from "@/components/calendar/CalendarPage";
import ReportsPage from "@/components/reports/ReportsPage";
import AnalyticsPage from "@/components/analytics/AnalyticsPage";
import { toast } from "sonner";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");

  const handleLogin = (email: string, password: string) => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    toast.success("You have been logged out successfully!");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardPage />;
      case "attendance":
        return <AttendancePage />;
      case "staff":
        return <StaffPage />;
      case "calendar":
        return <CalendarPage />;
      case "reports":
        return <ReportsPage />;
      case "analytics":
        return <AnalyticsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {isAuthenticated ? (
        <AppLayout
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onLogout={handleLogout}
        >
          {renderPage()}
        </AppLayout>
      ) : (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-primary">Staff Sync Track</h1>
              <p className="text-muted-foreground mt-2">
                Employee Attendance Management System
              </p>
            </div>
            <LoginForm onLogin={handleLogin} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
