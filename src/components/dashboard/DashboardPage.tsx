import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UsersIcon, ClipboardCheckIcon, ClockIcon, CalendarIcon, AlertTriangleIcon } from "lucide-react";
import AttendanceSummary from "./AttendanceSummary";
import StaffStatusList from "./StaffStatusList";
import RecentActivity from "./RecentActivity";
import { User, AttendanceRecord } from "@/types";

interface DashboardPageProps {
  users: User[];
  attendanceRecords: AttendanceRecord[];
}

const DashboardPage = ({ users, attendanceRecords }: DashboardPageProps) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Calculate staff statistics from real data
  const totalStaff = users.length;
  
  // Get today's attendance
  const todayString = new Date().toISOString().split('T')[0];
  const todayRecords = attendanceRecords.filter(record => 
    record.date.split('T')[0] === todayString
  );
  
  const presentToday = todayRecords.filter(record => record.status === 'present').length;
  const lateCheckIns = todayRecords.filter(record => record.status === 'late').length;
  const onLeave = todayRecords.filter(record => record.status === 'leave').length;

  const attendanceRate = totalStaff > 0 ? Math.round((presentToday / totalStaff) * 100) : 0;

  const stats = [
    {
      title: "Total Staff",
      value: totalStaff.toString(),
      icon: UsersIcon,
      description: "Active faculty members",
      change: ""
    },
    {
      title: "Present Today",
      value: presentToday.toString(),
      icon: ClipboardCheckIcon,
      description: `${attendanceRate}% attendance rate`,
      change: ""
    },
    {
      title: "Late Check-ins",
      value: lateCheckIns.toString(),
      icon: ClockIcon,
      description: "Arrived after 9:00 AM",
      change: ""
    },
    {
      title: "On Leave",
      value: onLeave.toString(),
      icon: CalendarIcon,
      description: "Approved absences",
      change: ""
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">{currentDate}</p>
        </div>
        {onLeave > 0 && (
          <div className="flex items-center gap-2 p-2 bg-amber-50 text-amber-800 rounded-md border border-amber-200">
            <AlertTriangleIcon className="h-4 w-4" />
            <span className="text-sm">{onLeave} staff member{onLeave !== 1 ? 's' : ''} on leave today</span>
          </div>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
              {stat.change && <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>}
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="summary" className="space-y-4">
        <TabsList>
          <TabsTrigger value="summary">Attendance Summary</TabsTrigger>
          <TabsTrigger value="status">Staff Status</TabsTrigger>
          <TabsTrigger value="recent">Recent Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="summary" className="space-y-4">
          <AttendanceSummary />
        </TabsContent>
        <TabsContent value="status" className="space-y-4">
          <StaffStatusList />
        </TabsContent>
        <TabsContent value="recent" className="space-y-4">
          <RecentActivity />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardPage;
