
import { ReactNode } from "react";
import DashboardPage from "@/components/dashboard/DashboardPage";
import AttendancePage from "@/components/attendance/AttendancePage";
import StaffPage from "@/components/staff/StaffPage";
import CalendarPage from "@/components/calendar/CalendarPage";
import ReportsPage from "@/components/reports/ReportsPage";
import AnalyticsPage from "@/components/analytics/AnalyticsPage";
import ProfilePage from "@/components/profile/ProfilePage";
import { User, CheckInStatus, AttendanceRecord } from "@/types";

interface MainContentProps {
  currentPage: string;
  hasAccess: (page: string) => boolean;
  currentUser: User | null;
  users: User[];
  attendanceRecords: AttendanceRecord[];
  checkInStatus: CheckInStatus;
  setCheckInStatus: React.Dispatch<React.SetStateAction<CheckInStatus>>;
  onUpdateCredentials: (currentPassword: string, newPassword: string, newEmail: string, newName: string) => boolean;
  onUpdateProfile: (department?: string, position?: string, gender?: string, phoneNumber?: string) => boolean;
}

const MainContent = ({
  currentPage,
  hasAccess,
  currentUser,
  users,
  attendanceRecords,
  checkInStatus,
  setCheckInStatus,
  onUpdateCredentials,
  onUpdateProfile
}: MainContentProps) => {
  
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
      return <AttendancePage checkInStatus={checkInStatus} setCheckInStatus={setCheckInStatus} />;
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
          onUpdateCredentials={onUpdateCredentials} 
          onUpdateProfile={onUpdateProfile} 
        />
      ) : null;
    default:
      return <DashboardPage users={users} attendanceRecords={attendanceRecords} />;
  }
};

export default MainContent;
