
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AreaChart, BarChart, LineChart, PieChart } from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartBarIcon, ArrowUpIcon, ArrowDownIcon, ClockIcon, CalendarIcon } from "lucide-react";

const AnalyticsPage = () => {
  const [timePeriod, setTimePeriod] = useState("month");
  const [department, setDepartment] = useState("all");

  // Sample data for charts
  const monthlyAttendanceData = [
    { name: "Jan", present: 90, late: 8, absent: 2 },
    { name: "Feb", present: 88, late: 10, absent: 2 },
    { name: "Mar", present: 92, late: 6, absent: 2 },
    { name: "Apr", present: 85, late: 10, absent: 5 },
    { name: "May", present: 90, late: 7, absent: 3 },
    { name: "Jun", present: 87, late: 8, absent: 5 },
    { name: "Jul", present: 84, late: 11, absent: 5 },
    { name: "Aug", present: 89, late: 7, absent: 4 },
    { name: "Sep", present: 91, late: 6, absent: 3 },
    { name: "Oct", present: 90, late: 7, absent: 3 },
    { name: "Nov", present: 93, late: 5, absent: 2 },
    { name: "Dec", present: 87, late: 8, absent: 5 },
  ];

  const weeklyAttendanceData = [
    { name: "Mon", present: 92, late: 6, absent: 2 },
    { name: "Tue", present: 90, late: 8, absent: 2 },
    { name: "Wed", present: 86, late: 10, absent: 4 },
    { name: "Thu", present: 88, late: 9, absent: 3 },
    { name: "Fri", present: 85, late: 10, absent: 5 },
  ];

  const departmentAttendanceData = [
    { name: "Mathematics", present: 92, late: 5, absent: 3 },
    { name: "Science", present: 90, late: 7, absent: 3 },
    { name: "Humanities", present: 85, late: 10, absent: 5 },
    { name: "English", present: 88, late: 9, absent: 3 },
    { name: "Fine Arts", present: 83, late: 12, absent: 5 },
    { name: "Technology", present: 94, late: 4, absent: 2 },
  ];

  const statusDistributionData = [
    { name: "Present", value: 88, fill: "#4ade80" },
    { name: "Late", value: 8, fill: "#facc15" },
    { name: "Absent", value: 4, fill: "#f87171" },
  ];

  const leaveTypesData = [
    { name: "Sick", value: 35, fill: "#60a5fa" },
    { name: "Vacation", value: 40, fill: "#c084fc" },
    { name: "Personal", value: 15, fill: "#a3e635" },
    { name: "Other", value: 10, fill: "#fb923c" },
  ];

  const topAttendanceStaff = [
    { id: 1, name: "Jennifer Lee", department: "Fine Arts", present: 98, late: 2, absent: 0 },
    { id: 2, name: "David Garcia", department: "Technology", present: 97, late: 3, absent: 0 },
    { id: 3, name: "Sarah Johnson", department: "Science", present: 96, late: 3, absent: 1 },
    { id: 4, name: "John Smith", department: "Mathematics", present: 95, late: 4, absent: 1 },
    { id: 5, name: "Robert Wilson", department: "Physical Education", present: 94, late: 4, absent: 2 },
  ];

  const attentionNeededStaff = [
    { id: 1, name: "Emily Davis", department: "English", present: 75, late: 15, absent: 10 },
    { id: 2, name: "Michael Brown", department: "Humanities", present: 80, late: 15, absent: 5 },
    { id: 3, name: "Lisa Wang", department: "Fine Arts", present: 82, late: 10, absent: 8 },
  ];

  // Select chart data based on time period
  const chartData = timePeriod === "week" ? weeklyAttendanceData : monthlyAttendanceData;

  const departments = ["all", "Mathematics", "Science", "Humanities", "English", "Physical Education", "Fine Arts", "Technology"];

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
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Attendance Rate</CardTitle>
            <ArrowUpIcon className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">88%</div>
            <p className="text-xs text-muted-foreground">+2.5% from previous period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Late Arrival Rate</CardTitle>
            <ArrowDownIcon className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8%</div>
            <p className="text-xs text-muted-foreground">-1.2% from previous period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Absence Rate</CardTitle>
            <ArrowUpIcon className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4%</div>
            <p className="text-xs text-muted-foreground">+0.8% from previous period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Working Hours</CardTitle>
            <ClockIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.8 hrs</div>
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
                  showLegend={true}
                  showGridLines={false}
                  startEndOnly={timePeriod === "month"}
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
                  showLabel={true}
                  showLegend={true}
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
                  showLabel={true}
                  showLegend={true}
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
                  data={departmentAttendanceData}
                  categories={["present", "late", "absent"]}
                  index="name"
                  colors={["#4ade80", "#facc15", "#f87171"]}
                  valueFormatter={(value) => `${value}%`}
                  showLegend={true}
                  layout="vertical"
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
