import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Download, Search } from "lucide-react";
import { format } from "date-fns";
import { AttendanceRecord } from "@/types";

const AttendanceHistory = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [month, setMonth] = useState<string>(format(new Date(), 'yyyy-MM'));
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
  const [filteredData, setFilteredData] = useState<AttendanceRecord[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 7;

  useEffect(() => {
    loadAttendanceData();
  }, []);

  const loadAttendanceData = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (!currentUser.id) return;

    const allRecords = JSON.parse(localStorage.getItem('attendanceRecords') || '[]');
    
    const userRecords = allRecords.filter((record: AttendanceRecord) => 
      record.userId === currentUser.id
    );
    
    setAttendanceData(userRecords);
    applyFilters(userRecords, statusFilter, month, searchTerm);
  };

  useEffect(() => {
    applyFilters(attendanceData, statusFilter, month, searchTerm);
  }, [statusFilter, month, searchTerm]);

  const applyFilters = (records: AttendanceRecord[], status: string, monthFilter: string, search: string) => {
    let filtered = [...records];

    if (monthFilter) {
      filtered = filtered.filter(record => record.date.startsWith(monthFilter));
    }

    if (status !== "all") {
      filtered = filtered.filter(record => record.status === status);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(record => 
        record.date.toLowerCase().includes(searchLower) ||
        (record.notes && record.notes.toLowerCase().includes(searchLower)) ||
        (record.status && record.status.toLowerCase().includes(searchLower))
      );
    }

    filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleMonthChange = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      setMonth(format(newDate, 'yyyy-MM'));
    }
  };

  const handleDownload = () => {
    const headers = ["Date", "Check In", "Check Out", "Hours Worked", "Status", "Notes"];
    const csvData = filteredData.map(record => [
      record.date,
      record.checkIn || "-",
      record.checkOut || "-",
      record.hoursWorked || "-",
      record.status,
      record.notes || "-"
    ]);
    
    const csvContent = [headers, ...csvData].map(row => row.join(",")).join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `attendance_history_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'present':
        return <Badge className="bg-staff-present">Present</Badge>;
      case 'absent':
        return <Badge className="bg-staff-absent">Absent</Badge>;
      case 'late':
        return <Badge className="bg-staff-late">Late</Badge>;
      case 'leave':
        return <Badge className="bg-staff-leave">On Leave</Badge>;
      case 'completed':
        return <Badge className="bg-green-500">Completed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance History</CardTitle>
        <CardDescription>
          View your past attendance records
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="flex items-center space-x-2 flex-wrap gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="w-[240px] justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "MMMM yyyy") : <span>Pick a month</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleMonthChange}
                  disabled={(date) =>
                    date > new Date() || date < new Date("2022-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="present">Present</SelectItem>
                <SelectItem value="absent">Absent</SelectItem>
                <SelectItem value="late">Late</SelectItem>
                <SelectItem value="leave">On Leave</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2 flex-wrap gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search..." 
                className="pl-8 w-[250px]" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" onClick={handleDownload}>
              <Download className="h-4 w-4" />
              <span className="sr-only">Download report</span>
            </Button>
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Check In</TableHead>
                <TableHead>Check Out</TableHead>
                <TableHead>Hours Worked</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentRecords.length > 0 ? (
                currentRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>{record.checkIn || "-"}</TableCell>
                    <TableCell>{record.checkOut || "-"}</TableCell>
                    <TableCell>{record.hoursWorked || "-"}</TableCell>
                    <TableCell>{getStatusBadge(record.status)}</TableCell>
                    <TableCell>{record.notes || "-"}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    No attendance records found for the selected filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="text-sm text-muted-foreground">
            Showing {indexOfFirstRecord + 1}-
            {Math.min(indexOfLastRecord, filteredData.length)} of {filteredData.length} records
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={goToNextPage}
              disabled={currentPage >= totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceHistory;
