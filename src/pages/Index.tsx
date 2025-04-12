
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
  staffId: string;
  email: string;
  name: string;
  role: 'admin' | 'staff';
  password: string;
  department?: string;
  position?: string;
  dob?: string;
  gender?: string;
}

interface AttendanceRecord {
  id: number;
  userId: number;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: 'present' | 'absent' | 'late' | 'leave';
  note?: string;
}

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);

  // Initialize attendance records with sample data
  useEffect(() => {
    // This would normally come from an API or database
    const sampleAttendanceRecords = [
      {
        id: 1,
        userId: 1,
        date: "2025-04-12",
        checkIn: "08:15:00",
        checkOut: "16:30:00",
        status: "present" as const,
      },
      {
        id: 2,
        userId: 2,
        date: "2025-04-12",
        checkIn: "09:10:00",
        checkOut: "16:20:00",
        status: "late" as const,
      },
      {
        id: 3,
        userId: 3,
        date: "2025-04-12",
        status: "absent" as const,
      },
    ];
    
    setAttendanceRecords(sampleAttendanceRecords);
    
    // Try to restore saved users from localStorage
    const savedUsers = localStorage.getItem('staffSyncUsers');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  // Save users to localStorage whenever they change
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('staffSyncUsers', JSON.stringify(users));
    }
  }, [users]);

  // Check if currentUser has access to a page
  const hasAccess = (page: string) => {
    if (!currentUser) return false;
    
    if (currentUser.role === 'admin') {
      return true;
    }
    
    // Staff access limitations
    if (['staff', 'analytics', 'reports', 'dashboard'].includes(page)) {
      return false;
    }
    
    return true;
  };

  useEffect(() => {
    // If user doesn't have access to current page, redirect to attendance
    if (isAuthenticated && !hasAccess(currentPage)) {
      setCurrentPage('attendance');
      toast.error("You don't have access to that page");
    }
  }, [currentPage, currentUser]);

  const handleLogin = (staffId: string, email: string, password: string) => {
    const user = users.find(u => u.staffId === staffId && u.email === email && u.password === password);
    
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      toast.success(`Welcome back, ${user.name}!`);
      setCurrentPage(user.role === 'admin' ? 'dashboard' : 'attendance');
    } else {
      toast.error("Invalid staff ID, email or password");
    }
  };

  const handleSignup = (name: string, email: string, password: string, role: 'admin' | 'staff', department: string, position: string, dob: string, gender: string) => {
    // Check if email already exists
    if (users.some(user => user.email === email)) {
      toast.error("Email already exists");
      return;
    }
    
    // Generate staff ID
    let staffId = '';
    
    if (role === 'admin') {
      // For admin, use ADMIN prefix
      const existingAdmins = users.filter(user => user.role === 'admin');
      const newAdminNumber = (existingAdmins.length + 1).toString().padStart(3, '0');
      staffId = `ADMIN${newAdminNumber}`;
    } else {
      // For staff, use department prefix
      const deptPrefix = department.substring(0, 3).toUpperCase();
      const existingDeptUsers = users.filter(user => 
        user.department === department || 
        (user.staffId && user.staffId.startsWith(deptPrefix))
      );
      const newStaffNumber = (existingDeptUsers.length + 1).toString().padStart(3, '0');
      staffId = `${deptPrefix}${newStaffNumber}`;
    }
    
    // Create new user
    const newUser: User = {
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      staffId,
      email,
      password,
      name,
      role,
      department: role === 'staff' ? department : undefined,
      position: role === 'staff' ? position : undefined,
      dob,
      gender
    };
    
    setUsers([...users, newUser]);
    toast.success(`Account created successfully! Your Staff ID is: ${staffId}`);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setCurrentPage("dashboard");
    toast.success("You have been logged out successfully!");
  };

  const handleUpdateCredentials = (currentPassword: string, newPassword: string, newEmail: string, newName: string) => {
    if (!currentUser) return false;
    
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
    
    toast.success("Credentials updated successfully");
    return true;
  };
  
  const handleUpdateProfile = (department?: string, position?: string, gender?: string) => {
    if (!currentUser) return false;
    
    // Update user in the users array
    const updatedUsers = users.map(user => {
      if (user.id === currentUser.id) {
        return {
          ...user,
          department: department || user.department,
          position: position || user.position,
          gender: gender || user.gender
        };
      }
      return user;
    });
    
    setUsers(updatedUsers);
    
    // Update current user
    setCurrentUser({
      ...currentUser,
      department: department || currentUser.department,
      position: position || currentUser.position,
      gender: gender || currentUser.gender
    });
    
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
        return <DashboardPage users={users} attendanceRecords={attendanceRecords} />;
      case "attendance":
        return <AttendancePage />;
      case "staff":
        return <StaffPage />;
      case "calendar":
        return <CalendarPage />;
      case "reports":
        return <ReportsPage />;
      case "analytics":
        return <AnalyticsPage attendanceRecords={attendanceRecords} />;
      case "profile":
        return currentUser ? (
          <ProfilePage 
            user={currentUser} 
            onUpdateCredentials={handleUpdateCredentials} 
            onUpdateProfile={handleUpdateProfile} 
          />
        ) : null;
      default:
        return <DashboardPage users={users} attendanceRecords={attendanceRecords} />;
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
              {currentUser?.staffId && (
                <span className="ml-2 font-mono text-xs bg-gray-100 px-2 py-0.5 rounded">
                  ID: {currentUser.staffId}
                </span>
              )}
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
                Staff Login and Log Out Management System
              </p>
            </div>
            <LoginForm onLogin={handleLogin} onSignup={handleSignup} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
