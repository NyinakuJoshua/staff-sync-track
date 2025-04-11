
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileTextIcon, DownloadIcon, FilterIcon, PrinterIcon } from "lucide-react";
import { toast } from "sonner";

const ReportsPage = () => {
  const [reportType, setReportType] = useState("daily");
  const [department, setDepartment] = useState("all");
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());

  // Sample attendance data
  const attendanceData = [
    { id: 1, name: "John Smith", department: "Mathematics", date: "2025-04-11", checkIn: "08:30", checkOut: "16:45", status: "present" },
    { id: 2, name: "Sarah Johnson", department: "Science", date: "2025-04-11", checkIn: "08:15", checkOut: "16:30", status: "present" },
    { id: 3, name: "Michael Brown", department: "Humanities", date: "2025-04-11", checkIn: "09:45", checkOut: "17:00", status: "late" },
    { id: 4, name: "Emily Davis", department: "English", date: "2025-04-11", checkIn: "-", checkOut: "-", status: "absent" },
    { id: 5, name: "Robert Wilson", department: "Physical Education", date: "2025-04-11", checkIn: "-", checkOut: "-", status: "leave" },
    { id: 6, name: "Jennifer Lee", department: "Fine Arts", date: "2025-04-11", checkIn: "08:05", checkOut: "16:20", status: "present" },
    { id: 7, name: "David Garcia", department: "Technology", date: "2025-04-11", checkIn: "08:22", checkOut: "16:35", status: "present" },
    { id: 8, name: "Lisa Wang", department: "Fine Arts", date: "2025-04-11", checkIn: "-", checkOut: "-", status: "leave" },
  ];

  // Filtered data based on department selection
  const filteredData = department === "all" 
    ? attendanceData 
    : attendanceData.filter(item => item.department === department);

  const departments = ["all", "Mathematics", "Science", "Humanities", "English", "Physical Education", "Fine Arts", "Technology"];

  const handleGenerateReport = () => {
    toast.success(`${reportType.charAt(0).toUpperCase() + reportType.slice(1)} report generated successfully`);
  };

  const handleDownloadReport = (format: string) => {
    toast.success(`Report downloaded as ${format.toUpperCase()} file`);
  };

  const renderSummary = () => {
    const totalStaff = attendanceData.length;
    const present = attendanceData.filter(item => item.status === "present").length;
    const late = attendanceData.filter(item => item.status === "late").length;
    const absent = attendanceData.filter(item => item.status === "absent").length;
    const onLeave = attendanceData.filter(item => item.status === "leave").length;
    
    const presentPercentage = (present / totalStaff) * 100;
    const latePercentage = (late / totalStaff) * 100;
    const absentPercentage = (absent / totalStaff) * 100;
    const leavePercentage = (onLeave / totalStaff) * 100;

    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{present}</div>
            <p className="text-xs text-muted-foreground">Present</p>
            <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 rounded-full" 
                style={{ width: `${presentPercentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{presentPercentage.toFixed(1)}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{late}</div>
            <p className="text-xs text-muted-foreground">Late</p>
            <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-yellow-500 rounded-full" 
                style={{ width: `${latePercentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{latePercentage.toFixed(1)}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{absent}</div>
            <p className="text-xs text-muted-foreground">Absent</p>
            <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-red-500 rounded-full" 
                style={{ width: `${absentPercentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{absentPercentage.toFixed(1)}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{onLeave}</div>
            <p className="text-xs text-muted-foreground">On Leave</p>
            <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full" 
                style={{ width: `${leavePercentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{leavePercentage.toFixed(1)}%</p>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
        <p className="text-muted-foreground">
          Generate and view attendance reports
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Attendance Reports</CardTitle>
          <CardDescription>
            Generate and download attendance reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
              <div className="space-y-2 flex-1">
                <label className="text-sm font-medium">Report Type</label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily Report</SelectItem>
                    <SelectItem value="weekly">Weekly Report</SelectItem>
                    <SelectItem value="monthly">Monthly Report</SelectItem>
                    <SelectItem value="custom">Custom Date Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2 flex-1">
                <label className="text-sm font-medium">Department</label>
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.slice(1).map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {reportType === "custom" && (
                <div className="space-y-2 flex-1">
                  <label className="text-sm font-medium">Date Range</label>
                  <div className="flex gap-2">
                    <div className="border rounded-md p-2">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        className="rounded-md border"
                      />
                    </div>
                    <div className="border rounded-md p-2">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        className="rounded-md border"
                      />
                    </div>
                  </div>
                </div>
              )}
              
              <Button onClick={handleGenerateReport} className="min-w-[120px]">
                <FileTextIcon className="mr-2 h-4 w-4" />
                Generate
              </Button>
            </div>

            <Tabs defaultValue="detail" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="detail">Detailed View</TabsTrigger>
                <TabsTrigger value="summary">Summary View</TabsTrigger>
              </TabsList>
              <TabsContent value="detail" className="space-y-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Staff Name</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Check In</TableHead>
                        <TableHead>Check Out</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredData.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell>{item.department}</TableCell>
                          <TableCell>{item.date}</TableCell>
                          <TableCell>{item.checkIn}</TableCell>
                          <TableCell>{item.checkOut}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs capitalize ${
                              item.status === 'present' ? 'bg-green-100 text-green-800' :
                              item.status === 'late' ? 'bg-yellow-100 text-yellow-800' :
                              item.status === 'absent' ? 'bg-red-100 text-red-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {item.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              <TabsContent value="summary" className="space-y-4">
                {renderSummary()}
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => handleDownloadReport('pdf')}>
                <DownloadIcon className="mr-2 h-4 w-4" />
                PDF
              </Button>
              <Button variant="outline" onClick={() => handleDownloadReport('excel')}>
                <DownloadIcon className="mr-2 h-4 w-4" />
                Excel
              </Button>
              <Button variant="outline" onClick={() => handleDownloadReport('print')}>
                <PrinterIcon className="mr-2 h-4 w-4" />
                Print
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPage;
