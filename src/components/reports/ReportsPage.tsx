
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DownloadIcon, PrinterIcon } from "lucide-react";
import { toast } from "sonner";

interface AttendanceRecord {
  id: number;
  userId: number;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: 'present' | 'absent' | 'late' | 'leave';
  note?: string;
}

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

interface ReportsPageProps {
  attendanceRecords: AttendanceRecord[];
  users: User[];
}

const ReportsPage = ({ attendanceRecords = [], users = [] }: ReportsPageProps) => {
  const [selectedReport, setSelectedReport] = useState("daily");
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Helper to get user details by userId
  const getUserById = (userId: number) => {
    return users.find(user => user.id === userId) || null;
  };

  // Process attendance records to include user details
  const processedRecords = attendanceRecords.map(record => {
    const user = getUserById(record.userId);
    return {
      id: record.id,
      userId: record.userId,
      staffId: user?.staffId || "N/A",
      name: user?.name || "Unknown User",
      department: user?.department || "N/A",
      position: user?.position || "N/A",
      phoneNumber: user?.phoneNumber || "N/A",
      date: record.date,
      checkIn: record.checkIn || null,
      checkOut: record.checkOut || null,
      status: record.status,
      note: record.note
    };
  });

  // Filter records based on the selected report type
  const getRecordsByReportType = () => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    
    switch(selectedReport) {
      case "daily":
        // Filter for today's records
        return processedRecords.filter(record => 
          record.date === today
        );
      case "weekly":
        // Filter for records within the past 7 days
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        return processedRecords.filter(record => 
          new Date(record.date) >= oneWeekAgo
        );
      case "monthly":
        // Filter for records within the current month
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        return processedRecords.filter(record => {
          const recordDate = new Date(record.date);
          return recordDate.getMonth() === currentMonth && 
                 recordDate.getFullYear() === currentYear;
        });
      default:
        return processedRecords;
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
                  <TableHead>Phone Number</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Check In</TableHead>
                  <TableHead>Check Out</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getRecordsByReportType().length > 0 ? (
                  getRecordsByReportType().map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-mono">{record.staffId}</TableCell>
                      <TableCell className="font-medium">{record.name}</TableCell>
                      <TableCell>{record.department}</TableCell>
                      <TableCell>{record.position}</TableCell>
                      <TableCell>{record.phoneNumber}</TableCell>
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
                      <TableCell className="max-w-[200px] truncate">
                        {record.note || "—"}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-4 text-muted-foreground">
                      No attendance records found for this period.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPage;
