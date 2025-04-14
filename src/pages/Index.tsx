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
  phoneNumber?: string;
}

interface AttendanceRecord {
  id: number;
  userId: number;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: 'present' | 'absent' | 'late' | 'leave' | 'completed';
  hoursWorked?: string;
  note?: string;
}

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);

  useEffect(() => {
    const savedRecords = localStorage.getItem('attendanceRecords');
    if (savedRecords) {
      setAttendanceRecords(JSON.parse(savedRecords));
    } else {
      const sampleAttendanceRecords = [
        {
          id: 1,
          userId: 1,
          date: "2025-04-12",
          checkIn: "08:15:00",
          checkOut: "16:30:00",
          status: "present" as const,
          hoursWorked: "8.25"
        },
        {
          id: 2,
          userId: 2,
          date: "2025-04-12",
          checkIn: "09:10:00",
          checkOut: "16:20:00",
          status: "late" as const,
          hoursWorked: "7.17"
        },
        {
          id: 3,
          userId: 3,
          date: "2025-04-12",
          status: "absent" as const,
          hoursWorked: "0"
        },
      ];
      
      setAttendanceRecords(sampleAttendanceRecords);
      localStorage.setItem('attendanceRecords', JSON.stringify(sampleAttendanceRecords));
    }
    
    const savedUsers = localStorage.getItem('staffSyncUsers');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('staffSyncUsers', JSON.stringify(users));
    }
  }, [users]);

  useEffect(() => {
    if (attendanceRecords.length > 0) {
      localStorage.setItem('attendanceRecords', JSON.stringify(attendanceRecords));
    }
  }, [attendanceRecords]);

  const hasAccess = (page: string) => {
    if (!currentUser) return false;
    
    if (currentUser.role === 'admin') {
      return true;
    }
    
    if (['staff', 'analytics', 'reports'].includes(page)) {
      return false;
    }
    
    return true;
  };

  useEffect(() => {
    if (isAuthenticated && !hasAccess(currentPage)) {
      setCurrentPage('attendance');
      toast.error("You don't have access to that page");
    }
  }, [currentPage, currentUser, isAuthenticated]);

  const handleLogin = (staffId: string, email: string, password: string) => {
    const user = users.find(u => u.staffId === staffId && u.email === email && u.password === password);
    
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      toast.success(`Welcome back, ${user.name}!`);
      setCurrentPage(user.role === 'admin' ? 'dashboard' : 'attendance');
    } else {
      toast.error("Invalid staff ID, email or password");
    }
  };

  const handleSignup = (name: string, email: string, password: string, role: 'admin' | 'staff', department: string, position: string, dob: string, gender: string, phoneNumber: string) => {
    if (users.some(user => user.email === email)) {
      toast.error("Email already exists");
      return;
    }
    
    let staffId = '';
    
    if (role === 'admin') {
      const existingAdmins = users.filter(user => user.role === 'admin');
      const newAdminNumber = (existingAdmins.length + 1).toString().padStart(3, '0');
      staffId = `ADMIN${newAdminNumber}`;
    } else {
      const deptPrefix = department.substring(0, 3).toUpperCase();
      const existingDeptUsers = users.filter(user => 
        user.department === department || 
        (user.staffId && user.staffId.startsWith(deptPrefix))
      );
      const newStaffNumber = (existingDeptUsers.length + 1).toString().padStart(3, '0');
      staffId = `${deptPrefix}${newStaffNumber}`;
    }
    
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
      gender,
      phoneNumber
    };
    
    setUsers([...users, newUser]);
    toast.success(`Account created successfully! Your Staff ID is: ${staffId}`);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setCurrentPage("dashboard");
    localStorage.removeItem('currentUser');
    localStorage.removeItem('staffCheckStatus');
    localStorage.removeItem('staffCheckInTime');
    localStorage.removeItem('staffCheckOutTime');
    
    toast.success("You have been logged out successfully!");
  };

  const handleUpdateCredentials = (currentPassword: string, newPassword: string, newEmail: string, newName: string) => {
    if (!currentUser) return false;
    
    if (currentPassword !== currentUser.password) {
      toast.error("Current password is incorrect");
      return false;
    }
    
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
    
    const updatedUser = {
      ...currentUser,
      password: newPassword || currentUser.password,
      email: newEmail || currentUser.email,
      name: newName || currentUser.name
    };
    
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    toast.success("Credentials updated successfully");
    return true;
  };

  const handleUpdateProfile = (department?: string, position?: string, gender?: string, phoneNumber?: string) => {
    if (!currentUser) return false;
    
    const updatedUsers = users.map(user => {
      if (user.id === currentUser.id) {
        return {
          ...user,
          department: department || user.department,
          position: position || user.position,
          gender: gender || user.gender,
          phoneNumber: phoneNumber || user.phoneNumber
        };
      }
      return user;
    });
    
    setUsers(updatedUsers);
    
    const updatedUser = {
      ...currentUser,
      department: department || currentUser.department,
      position: position || currentUser.position,
      gender: gender || currentUser.gender,
      phoneNumber: phoneNumber || currentUser.phoneNumber
    };
    
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    return true;
  };

  const renderPage = () => {
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
        return <CalendarPage currentUser={currentUser} />;
      case "reports":
        return <ReportsPage attendanceRecords={attendanceRecords} users={users} />;
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
