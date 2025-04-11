
import { useState, useEffect } from "react";
import LoginForm from "@/components/auth/LoginForm";
import AppLayout from "@/components/layout/AppLayout";
import DashboardPage from "@/components/dashboard/DashboardPage";
import AttendancePage from "@/components/attendance/AttendancePage";
import StaffPage from "@/components/staff/StaffPage";
import CalendarPage from "@/components/calendar/CalendarPage";
import ReportsPage from "@/components/reports/ReportsPage";
import AnalyticsPage from "@/components/analytics/AnalyticsPage";
import ProfilePage from "@/components/profile/ProfilePage";
import { toast } from "sonner";

interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'staff';
  password: string;
}

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([
    { id: 1, email: "admin@school.edu", password: "password", name: "Admin User", role: "admin" },
    { id: 2, email: "jsmith@school.edu", password: "password", name: "John Smith", role: "staff" },
    { id: 3, email: "sjohnson@school.edu", password: "password", name: "Sarah Johnson", role: "staff" },
  ]);

  // Check if currentUser has access to a page
  const hasAccess = (page: string) => {
    if (!currentUser) return false;
    
    if (currentUser.role === 'admin') {
      return true;
    }
    
    // Staff access limitations
    if (['staff', 'analytics', 'reports'].includes(page)) {
      return false;
    }
    
    return true;
  };

  useEffect(() => {
    // If user doesn't have access to current page, redirect to dashboard
    if (isAuthenticated && !hasAccess(currentPage)) {
      setCurrentPage('dashboard');
      toast.error("You don't have access to that page");
    }
  }, [currentPage, currentUser]);

  const handleLogin = (email: string, password: string) => {
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      toast.success(`Welcome back, ${user.name}!`);
    } else {
      toast.error("Invalid email or password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setCurrentPage("dashboard");
    toast.success("You have been logged out successfully!");
  };

  const handleUpdateCredentials = (currentPassword: string, newPassword: string, newEmail: string, newName: string) => {
    if (!currentUser) return;
    
    // Verify current password
    if (currentPassword !== currentUser.password) {
      toast.error("Current password is incorrect");
      return false;
    }
    
    // Update user in the users array
    const updatedUsers = users.map(user => {
      if (user.id === currentUser.id) {
        return {
          ...user,
          password: newPassword || user.password,
          email: newEmail || user.email,
          name: newName || user.name
        };
      }
      return user;
    });
    
    setUsers(updatedUsers);
    
    // Update current user
    setCurrentUser({
      ...currentUser,
      password: newPassword || currentUser.password,
      email: newEmail || currentUser.email,
      name: newName || currentUser.name
    });
    
    toast.success("Profile updated successfully");
    return true;
  };

  const renderPage = () => {
    // If user has no access, show unauthorized message
    if (!hasAccess(currentPage)) {
      return (
        <div className="flex items-center justify-center h-[70vh] flex-col gap-4">
          <h2 className="text-2xl font-bold">Access Denied</h2>
          <p className="text-muted-foreground">You don't have permission to access this page.</p>
        </div>
      );
    }
    
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
      case "profile":
        return currentUser ? <ProfilePage user={currentUser} onUpdateCredentials={handleUpdateCredentials} /> : null;
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
          currentUser={currentUser}
        >
          <div className="mb-4 border-b pb-2">
            <div className="text-sm text-muted-foreground">
              Logged in as: <span className="font-medium">{currentUser?.name}</span> ({currentUser?.role.charAt(0).toUpperCase() + currentUser?.role.slice(1)})
            </div>
          </div>
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
            <div className="mt-6 p-4 bg-muted rounded-md">
              <h3 className="font-medium mb-2">Available Login Credentials:</h3>
              <ul className="space-y-2 text-sm">
                <li><strong>Admin:</strong> admin@school.edu / password</li>
                <li><strong>Staff:</strong> jsmith@school.edu / password</li>
                <li><strong>Staff:</strong> sjohnson@school.edu / password</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
