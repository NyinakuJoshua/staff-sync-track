
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AreaChart, BarChart, LineChart, PieChart } from "@/components/ui/charts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartBarIcon, ArrowUpIcon, ArrowDownIcon, ClockIcon, CalendarIcon } from "lucide-react";

interface User {
  id: number;
  staffId: string;
  name: string;
  email: string;
  role: 'admin' | 'staff';
  department?: string;
  position?: string;
  phoneNumber?: string;
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

interface AnalyticsPageProps {
  attendanceRecords?: AttendanceRecord[];
  users?: User[];
}

const AnalyticsPage = ({ attendanceRecords = [], users = [] }: AnalyticsPageProps) => {
  const [timePeriod, setTimePeriod] = useState("month");
  const [department, setDepartment] = useState("all");
  const [stats, setStats] = useState({
    attendanceRate: 0,
    lateRate: 0,
    absenceRate: 0,
    avgWorkingHours: 0,
    attendanceChange: 0,
    lateChange: 0,
    absenceChange: 0
  });

  // Calculate statistics based on attendance records
  useEffect(() => {
    if (attendanceRecords.length > 0) {
      // Calculate actual attendance statistics from records
      const attendanceRate = Math.round(attendanceRecords.filter(r => r.status === 'present').length / attendanceRecords.length * 100);
      const lateRate = Math.round(attendanceRecords.filter(r => r.status === 'late').length / attendanceRecords.length * 100);
      const absenceRate = Math.round((attendanceRecords.filter(r => r.status === 'absent').length + 
        attendanceRecords.filter(r => r.status === 'leave').length) / attendanceRecords.length * 100);
      
      // Calculate average working hours from check-in/check-out times
      let totalMinutes = 0;
      let recordsWithHours = 0;
      
      attendanceRecords.forEach(record => {
        if (record.checkIn && record.checkOut) {
          const checkInTime = new Date(`2023-01-01T${record.checkIn}`);
          const checkOutTime = new Date(`2023-01-01T${record.checkOut}`);
          const diffMs = checkOutTime.getTime() - checkInTime.getTime();
          const diffMinutes = diffMs / (1000 * 60);
          
          if (diffMinutes > 0) {
            totalMinutes += diffMinutes;
            recordsWithHours++;
          }
        }
      });
      
      const avgWorkingHours = recordsWithHours > 0 ? parseFloat((totalMinutes / recordsWithHours / 60).toFixed(1)) : 0;
      
      // Compare with previous period (in a real app this would be more complex)
      // For demo purposes, we'll just use small random changes
      setStats({
        attendanceRate,
        lateRate,
        absenceRate,
        avgWorkingHours,
        attendanceChange: parseFloat((Math.random() * 4 - 2).toFixed(1)),
        lateChange: parseFloat((Math.random() * 4 - 2).toFixed(1)),
        absenceChange: parseFloat((Math.random() * 4 - 2).toFixed(1))
      });
    }
  }, [attendanceRecords]);

  // Generate data for charts based on attendance records
  const generateChartData = () => {
    // This would be more sophisticated in a real app
    if (timePeriod === "week") {
      const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
      return days.map(day => {
        // Filter records that might be for this day (simplified example)
        const dayRecords = attendanceRecords.slice(0, Math.floor(Math.random() * attendanceRecords.length));
        const presentCount = dayRecords.filter(r => r.status === 'present').length;
        const lateCount = dayRecords.filter(r => r.status === 'late').length;
        const absentCount = dayRecords.filter(r => r.status === 'absent').length;
        const total = Math.max(dayRecords.length, 1);
        
        return {
          name: day,
          present: Math.round((presentCount / total) * 100),
          late: Math.round((lateCount / total) * 100),
          absent: Math.round((absentCount / total) * 100)
        };
      });
    } else {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return months.map(month => {
        // Filter records that might be for this month (simplified example)
        const monthRecords = attendanceRecords.slice(0, Math.floor(Math.random() * attendanceRecords.length));
        const presentCount = monthRecords.filter(r => r.status === 'present').length;
        const lateCount = monthRecords.filter(r => r.status === 'late').length;
        const absentCount = monthRecords.filter(r => r.status === 'absent').length;
        const total = Math.max(monthRecords.length, 1);
        
        return {
          name: month,
          present: Math.round((presentCount / total) * 100),
          late: Math.round((lateCount / total) * 100),
          absent: Math.round((absentCount / total) * 100)
        };
      });
    }
  };

  // Generate department data from users and attendance records
  const generateDepartmentData = () => {
    const departments = new Set();
    users?.forEach(user => {
      if (user.department) departments.add(user.department);
    });
    
    return Array.from(departments).map(dept => {
      const deptUsers = users?.filter(u => u.department === dept) || [];
      const deptUserIds = deptUsers.map(u => u.id);
      const deptRecords = attendanceRecords.filter(r => deptUserIds.includes(r.userId));
      const total = Math.max(deptRecords.length, 1);
      
      return {
        name: dept as string,
        present: Math.round((deptRecords.filter(r => r.status === 'present').length / total) * 100),
        late: Math.round((deptRecords.filter(r => r.status === 'late').length / total) * 100),
        absent: Math.round((deptRecords.filter(r => r.status === 'absent').length / total) * 100)
      };
    });
  };

  const statusDistributionData = [
    { name: "Present", value: stats.attendanceRate, fill: "#4ade80" },
    { name: "Late", value: stats.lateRate, fill: "#facc15" },
    { name: "Absent", value: stats.absenceRate, fill: "#f87171" },
  ];

  const leaveTypesData = [
    { name: "Sick", value: 35, fill: "#60a5fa" },
    { name: "Vacation", value: 40, fill: "#c084fc" },
    { name: "Personal", value: 15, fill: "#a3e635" },
    { name: "Other", value: 10, fill: "#fb923c" },
  ];

  // Get top performers from attendance records
  const getTopPerformers = () => {
    const userStats = new Map();
    
    // Calculate attendance stats for each user
    attendanceRecords.forEach(record => {
      if (!userStats.has(record.userId)) {
        userStats.set(record.userId, { present: 0, late: 0, absent: 0, total: 0 });
      }
      
      const stats = userStats.get(record.userId);
      stats.total++;
      
      if (record.status === 'present') stats.present++;
      else if (record.status === 'late') stats.late++;
      else if (record.status === 'absent' || record.status === 'leave') stats.absent++;
    });
    
    // Calculate percentages and join with user data
    const userAttendance = Array.from(userStats.entries()).map(([userId, stats]) => {
      const user = users?.find(u => u.id === userId) || { id: userId, name: 'Unknown', department: 'Unknown' };
      return {
        id: userId,
        name: user.name,
        department: user.department || 'Unknown',
        present: Math.round((stats.present / stats.total) * 100),
        late: Math.round((stats.late / stats.total) * 100),
        absent: Math.round((stats.absent / stats.total) * 100)
      };
    });
    
    // Sort by attendance rate and get top 5
    return userAttendance
      .sort((a, b) => b.present - a.present)
      .slice(0, 5);
  };

  // Get users with attendance concerns
  const getAttentionNeededStaff = () => {
    const userStats = new Map();
    
    // Same logic as above but for users with issues
    attendanceRecords.forEach(record => {
      if (!userStats.has(record.userId)) {
        userStats.set(record.userId, { present: 0, late: 0, absent: 0, total: 0 });
      }
      
      const stats = userStats.get(record.userId);
      stats.total++;
      
      if (record.status === 'present') stats.present++;
      else if (record.status === 'late') stats.late++;
      else if (record.status === 'absent' || record.status === 'leave') stats.absent++;
    });
    
    const userAttendance = Array.from(userStats.entries()).map(([userId, stats]) => {
      const user = users?.find(u => u.id === userId) || { id: userId, name: 'Unknown', department: 'Unknown' };
      return {
        id: userId,
        name: user.name,
        department: user.department || 'Unknown',
        present: Math.round((stats.present / stats.total) * 100),
        late: Math.round((stats.late / stats.total) * 100),
        absent: Math.round((stats.absent / stats.total) * 100)
      };
    });
    
    // Sort by absence + late rate and get top 3 with issues
    return userAttendance
      .sort((a, b) => (b.absent + b.late) - (a.absent + a.late))
      .slice(0, 3);
  };

  // Select chart data based on time period
  const chartData = generateChartData();
  const departmentData = generateDepartmentData();
  const topAttendanceStaff = getTopPerformers();
  const attentionNeededStaff = getAttentionNeededStaff();

  const departments = ["all", ...Array.from(new Set(users?.map(u => u.department).filter(Boolean) || []))];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">
          View detailed attendance analytics and trends
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
        <div className="flex items-center gap-2">
          <ChartBarIcon className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold">Attendance Overview</h3>
        </div>
        <div className="flex gap-2 ml-auto">
          <Select value={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.slice(1).map(dept => (
                <SelectItem key={dept as string} value={dept as string}>{dept as string}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Attendance Rate</CardTitle>
            <ArrowUpIcon className={`h-4 w-4 ${stats.attendanceChange >= 0 ? 'text-green-500' : 'text-red-500'}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.attendanceRate}%</div>
            <p className="text-xs text-muted-foreground">{stats.attendanceChange >= 0 ? '+' : ''}{stats.attendanceChange}% from previous period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Late Arrival Rate</CardTitle>
            <ArrowDownIcon className={`h-4 w-4 ${stats.lateChange <= 0 ? 'text-green-500' : 'text-red-500'}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.lateRate}%</div>
            <p className="text-xs text-muted-foreground">{stats.lateChange >= 0 ? '+' : ''}{stats.lateChange}% from previous period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Absence Rate</CardTitle>
            <ArrowUpIcon className={`h-4 w-4 ${stats.absenceChange <= 0 ? 'text-green-500' : 'text-red-500'}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.absenceRate}%</div>
            <p className="text-xs text-muted-foreground">{stats.absenceChange >= 0 ? '+' : ''}{stats.absenceChange}% from previous period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Working Hours</CardTitle>
            <ClockIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgWorkingHours} hrs</div>
            <p className="text-xs text-muted-foreground">Standard: 8 hrs</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trends">Attendance Trends</TabsTrigger>
          <TabsTrigger value="distribution">Status Distribution</TabsTrigger>
          <TabsTrigger value="departments">Department Analysis</TabsTrigger>
          <TabsTrigger value="staff">Staff Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Trend</CardTitle>
              <CardDescription>
                Attendance patterns over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <AreaChart
                  data={chartData}
                  categories={["present", "late", "absent"]}
                  index="name"
                  colors={["#4ade80", "#facc15", "#f87171"]}
                  valueFormatter={(value) => `${value}%`}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution" className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Status Distribution</CardTitle>
              <CardDescription>
                Overall attendance status breakdown
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <PieChart
                  data={statusDistributionData}
                  category="value"
                  index="name"
                  valueFormatter={(value) => `${value}%`}
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Leave Type Distribution</CardTitle>
              <CardDescription>
                Breakdown of leave reasons
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <PieChart
                  data={leaveTypesData}
                  category="value"
                  index="name"
                  valueFormatter={(value) => `${value}%`}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Department Attendance Comparison</CardTitle>
              <CardDescription>
                Attendance rates by department
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <BarChart
                  data={departmentData}
                  categories={["present", "late", "absent"]}
                  index="name"
                  colors={["#4ade80", "#facc15", "#f87171"]}
                  valueFormatter={(value) => `${value}%`}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staff" className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Top Performers</CardTitle>
              <CardDescription>
                Staff with best attendance records
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Present %</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topAttendanceStaff.map((staff) => (
                    <TableRow key={staff.id}>
                      <TableCell className="font-medium">{staff.name}</TableCell>
                      <TableCell>{staff.department}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{staff.present}%</span>
                          <div className="h-2 w-16 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-green-500 rounded-full" 
                              style={{ width: `${staff.present}%` }}
                            ></div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Needs Attention</CardTitle>
              <CardDescription>
                Staff with attendance concerns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Absent %</TableHead>
                    <TableHead>Late %</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attentionNeededStaff.map((staff) => (
                    <TableRow key={staff.id}>
                      <TableCell className="font-medium">{staff.name}</TableCell>
                      <TableCell>{staff.department}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{staff.absent}%</span>
                          <div className="h-2 w-12 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-red-500 rounded-full" 
                              style={{ width: `${staff.absent * 10}%` }}
                            ></div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{staff.late}%</span>
                          <div className="h-2 w-12 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-yellow-500 rounded-full" 
                              style={{ width: `${staff.late * 6.66}%` }}
                            ></div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsPage;
