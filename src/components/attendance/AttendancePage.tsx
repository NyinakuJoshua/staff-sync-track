
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CheckInOut from "./CheckInOut";
import AttendanceHistory from "./AttendanceHistory";
import ManualAttendance from "./ManualAttendance";
import { AttendanceRecord, CheckInStatus } from "@/types";
import { useAuth } from "@/contexts/AuthContext";

interface AttendancePageProps {
  checkInStatus?: CheckInStatus;
  setCheckInStatus?: React.Dispatch<React.SetStateAction<CheckInStatus>>;
}

const AttendancePage = ({ checkInStatus, setCheckInStatus }: AttendancePageProps) => {
  const { currentUser } = useAuth();
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Attendance Management</h2>
        <p className="text-muted-foreground">
          Track and manage your attendance records
        </p>
      </div>

      <Tabs defaultValue="check" className="space-y-4">
        <TabsList>
          <TabsTrigger value="check">Check In/Out</TabsTrigger>
          <TabsTrigger value="comment">Submit Comment</TabsTrigger>
          <TabsTrigger value="history">Attendance History</TabsTrigger>
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
