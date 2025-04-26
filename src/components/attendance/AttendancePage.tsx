
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CheckInOut from "./CheckInOut";
import AttendanceHistory from "./AttendanceHistory";
import ManualAttendance from "./ManualAttendance";
import { AttendanceRecord, CheckInStatus } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";

interface AttendancePageProps {
  checkInStatus?: CheckInStatus;
  setCheckInStatus?: React.Dispatch<React.SetStateAction<CheckInStatus>>;
}

const AttendancePage = ({ checkInStatus, setCheckInStatus }: AttendancePageProps) => {
  const { currentUser } = useAuth();
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className={`font-bold tracking-tight ${isMobile ? "text-2xl" : "text-3xl"}`}>Attendance Management</h2>
        <p className="text-muted-foreground">
          Track and manage your attendance records
        </p>
      </div>

      <Tabs defaultValue="check" className="space-y-4">
        <TabsList className={`${isMobile ? "w-full" : ""}`}>
          <TabsTrigger value="check" className={`${isMobile ? "flex-1" : ""}`}>Check In/Out</TabsTrigger>
          <TabsTrigger value="comment" className={`${isMobile ? "flex-1" : ""}`}>Submit Comment</TabsTrigger>
          <TabsTrigger value="history" className={`${isMobile ? "flex-1" : ""}`}>History</TabsTrigger>
        </TabsList>
        <TabsContent value="check" className="space-y-4">
          <CheckInOut />
        </TabsContent>
        <TabsContent value="comment" className="space-y-4">
          <ManualAttendance />
        </TabsContent>
        <TabsContent value="history" className="space-y-4">
          <AttendanceHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AttendancePage;
