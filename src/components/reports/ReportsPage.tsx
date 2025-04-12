
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DownloadIcon, PrinterIcon } from "lucide-react";
import { toast } from "sonner";

const ReportsPage = () => {
  const [selectedReport, setSelectedReport] = useState("daily");
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Sample attendance data for the reports
  const attendanceRecords = [
    { id: 1, staffId: "ENG001", name: "John Smith", position: "Teacher", department: "English", date: "2025-04-12", checkIn: "08:15 AM", checkOut: "04:30 PM", status: "present" },
    { id: 2, staffId: "MAT002", name: "Sarah Johnson", position: "Department Head", department: "Mathematics", date: "2025-04-12", checkIn: "07:55 AM", checkOut: "04:45 PM", status: "present" },
    { id: 3, staffId: "SCI003", name: "Michael Brown", position: "Teacher", department: "Science", date: "2025-04-12", checkIn: "09:10 AM", checkOut: "04:20 PM", status: "late" },
    { id: 4, staffId: "HUM004", name: "Emily Davis", position: "Teacher", department: "Humanities", date: "2025-04-12", checkIn: null, checkOut: null, status: "absent" },
    { id: 5, staffId: "PHY005", name: "David Wilson", position: "Teacher", department: "Physical Education", date: "2025-04-12", checkIn: "08:05 AM", checkOut: "04:15 PM", status: "present" },
    { id: 6, staffId: "TEC006", name: "Jennifer Lee", position: "Administrator", department: "Technology", date: "2025-04-12", checkIn: "07:50 AM", checkOut: "05:00 PM", status: "present" },
    { id: 7, staffId: "ART007", name: "Robert Martinez", position: "Teacher", department: "Fine Arts", date: "2025-04-12", checkIn: null, checkOut: null, status: "leave" },
  ];

  // Weekly data (for the past 7 days)
  const weeklyAttendanceRecords = [
    ...attendanceRecords,
    { id: 8, staffId: "ENG001", name: "John Smith", position: "Teacher", department: "English", date: "2025-04-11", checkIn: "08:05 AM", checkOut: "04:20 PM", status: "present" },
    { id: 9, staffId: "MAT002", name: "Sarah Johnson", position: "Department Head", department: "Mathematics", date: "2025-04-11", checkIn: "08:00 AM", checkOut: "04:30 PM", status: "present" },
    { id: 10, staffId: "SCI003", name: "Michael Brown", position: "Teacher", department: "Science", date: "2025-04-11", checkIn: "08:10 AM", checkOut: "04:15 PM", status: "present" },
    { id: 11, staffId: "HUM004", name: "Emily Davis", position: "Teacher", department: "Humanities", date: "2025-04-11", checkIn: "08:20 AM", checkOut: "04:25 PM", status: "present" },
    { id: 12, staffId: "PHY005", name: "David Wilson", position: "Teacher", department: "Physical Education", date: "2025-04-11", checkIn: null, checkOut: null, status: "leave" },
  ];

  // Monthly data
  const monthlyAttendanceRecords = [
    ...weeklyAttendanceRecords,
    { id: 13, staffId: "ENG001", name: "John Smith", position: "Teacher", department: "English", date: "2025-04-05", checkIn: "08:15 AM", checkOut: "04:30 PM", status: "present" },
    { id: 14, staffId: "MAT002", name: "Sarah Johnson", position: "Department Head", department: "Mathematics", date: "2025-04-05", checkIn: "07:55 AM", checkOut: "04:45 PM", status: "present" },
    { id: 15, staffId: "SCI003", name: "Michael Brown", position: "Teacher", department: "Science", date: "2025-04-05", checkIn: "09:10 AM", checkOut: "04:20 PM", status: "late" },
  ];

  const getRecordsByReportType = () => {
    switch(selectedReport) {
      case "daily":
        return attendanceRecords;
      case "weekly":
        return weeklyAttendanceRecords;
      case "monthly":
        return monthlyAttendanceRecords;
      default:
        return attendanceRecords;
    }
  };

  const handlePrint = () => {
    toast.info("Preparing document for printing...");
    setTimeout(() => {
      window.print();
      toast.success("Print dialog opened");
    }, 500);
  };

  const handleDownloadPDF = () => {
    toast.info("Generating PDF...");
    setTimeout(() => {
      toast.success("PDF downloaded successfully");
    }, 1500);
  };

  return (
    <div className="space-y-6 print:p-10">
      <div className="print:hidden">
        <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
        <p className="text-muted-foreground">
          Generate and export attendance reports
        </p>
      </div>

      <div className="print:hidden">
        <Tabs value={selectedReport} onValueChange={setSelectedReport}>
          <TabsList>
            <TabsTrigger value="daily">Daily Report</TabsTrigger>
            <TabsTrigger value="weekly">Weekly Report</TabsTrigger>
            <TabsTrigger value="monthly">Monthly Report</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Card className="print:shadow-none print:border-none">
        <CardHeader className="flex flex-row items-center justify-between print:pb-0">
          <div>
            <CardTitle className="text-lg print:text-2xl">
              {selectedReport === "daily" && "Daily Attendance Report"}
              {selectedReport === "weekly" && "Weekly Attendance Report"}
              {selectedReport === "monthly" && "Monthly Attendance Report"}
            </CardTitle>
            <CardDescription>
              {currentDate}
            </CardDescription>
          </div>
          <div className="flex gap-2 print:hidden">
            <Button variant="outline" onClick={handlePrint}>
              <PrinterIcon className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" onClick={handleDownloadPDF}>
              <DownloadIcon className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Staff ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Check In</TableHead>
                  <TableHead>Check Out</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getRecordsByReportType().map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-mono">{record.staffId}</TableCell>
                    <TableCell className="font-medium">{record.name}</TableCell>
                    <TableCell>{record.department}</TableCell>
                    <TableCell>{record.position}</TableCell>
                    <TableCell>
                      {new Date(record.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{record.checkIn || "—"}</TableCell>
                    <TableCell>{record.checkOut || "—"}</TableCell>
                    <TableCell>
                      <span className={
                        `px-2 py-1 rounded-full text-xs font-medium ${
                          record.status === 'present' ? 'bg-green-100 text-green-800' :
                          record.status === 'late' ? 'bg-yellow-100 text-yellow-800' :
                          record.status === 'absent' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }`
                      }>
                        {record.status === 'present' ? 'Present' :
                         record.status === 'late' ? 'Late' :
                         record.status === 'absent' ? 'Absent' : 'Leave'}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPage;
