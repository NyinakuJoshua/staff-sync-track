
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UsersIcon, ClipboardCheckIcon, ClockIcon, CalendarIcon, AlertTriangleIcon } from "lucide-react";
import AttendanceSummary from "./AttendanceSummary";
import StaffStatusList from "./StaffStatusList";
import RecentActivity from "./RecentActivity";

const DashboardPage = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const stats = [
    {
      title: "Total Staff",
      value: "48",
      icon: UsersIcon,
      description: "Active faculty members",
      change: "+3 from last month"
    },
    {
      title: "Present Today",
      value: "42",
      icon: ClipboardCheckIcon,
      description: "87.5% attendance rate",
      change: "+2 from yesterday"
    },
    {
      title: "Late Check-ins",
      value: "3",
      icon: ClockIcon,
      description: "Arrived after 9:00 AM",
      change: "-2 from yesterday"
    },
    {
      title: "On Leave",
      value: "3",
      icon: CalendarIcon,
      description: "Approved absences",
      change: "Same as yesterday"
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">{currentDate}</p>
        </div>
        <div className="flex items-center gap-2 p-2 bg-amber-50 text-amber-800 rounded-md border border-amber-200">
          <AlertTriangleIcon className="h-4 w-4" />
          <span className="text-sm">3 staff members on leave today</span>
        </div>
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
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
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
