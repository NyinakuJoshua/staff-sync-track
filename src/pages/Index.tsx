
import { useState, useEffect } from "react";
import LoginForm from "@/components/auth/LoginForm";
import AppLayout from "@/components/layout/AppLayout";
import MainContent from "@/components/MainContent";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { AttendanceProvider, useAttendance } from "@/contexts/AttendanceContext";
import { useNavigation } from "@/hooks/useNavigation";
import { User } from "@/types";

const AuthenticatedApp = () => {
  const { currentUser, checkInStatus, setCheckInStatus, logout, updateCredentials, updateProfile } = useAuth();
  const { attendanceRecords } = useAttendance();
  const [users, setUsers] = useState<User[]>([]);
  const { currentPage, setCurrentPage, hasAccess } = useNavigation(currentUser);

  useEffect(() => {
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

  return (
    <AppLayout
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      onLogout={logout}
      currentUser={currentUser}
      checkInStatus={checkInStatus}
    >
      <div className="mb-4 border-b pb-2">
        <div className="text-sm text-muted-foreground">
          Logged in as: <span className="font-medium">{currentUser?.name}</span> ({currentUser?.role.charAt(0).toUpperCase() + currentUser?.role.slice(1)})
          {currentUser?.staffId && (
            <span className="ml-2 font-mono text-xs bg-gray-100 px-2 py-0.5 rounded">
              ID: {currentUser.staffId}
            </span>
          )}
          {checkInStatus.isCheckedIn && (
            <span className="ml-2 font-mono text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
              Checked In: {checkInStatus.checkInTime}
            </span>
          )}
        </div>
      </div>
      <MainContent
        currentPage={currentPage}
        hasAccess={hasAccess}
        currentUser={currentUser}
        users={users}
        attendanceRecords={attendanceRecords}
        checkInStatus={checkInStatus}
        setCheckInStatus={setCheckInStatus}
        onUpdateCredentials={updateCredentials}
        onUpdateProfile={updateProfile}
      />
    </AppLayout>
  );
};

const UnauthenticatedApp = () => {
  const { login, signup } = useAuth();
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Staff Sync Track</h1>
          <p className="text-muted-foreground mt-2">
            Staff Login and Log Out Management System
          </p>
        </div>
        <LoginForm onLogin={login} onSignup={signup} />
      </div>
    </div>
  );
};

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const savedUsers = localStorage.getItem('staffSyncUsers');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  return isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />;
};

const Index = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const savedUsers = localStorage.getItem('staffSyncUsers');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <AttendanceProvider>
        <AuthProvider users={users} setUsers={setUsers}>
          <AppContent />
        </AuthProvider>
      </AttendanceProvider>
    </div>
  );
};

export default Index;
