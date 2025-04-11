
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Download, Search } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";

const AttendanceHistory = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const attendanceData = [
    {
      id: 1,
      date: "2025-04-10",
      checkIn: "08:30 AM",
      checkOut: "04:30 PM",
      hoursWorked: "8:00",
      status: "present",
    },
    {
      id: 2,
      date: "2025-04-09",
      checkIn: "08:15 AM",
      checkOut: "04:45 PM",
      hoursWorked: "8:30",
      status: "present",
    },
    {
      id: 3,
      date: "2025-04-08",
      checkIn: "08:45 AM",
      checkOut: "04:30 PM",
      hoursWorked: "7:45",
      status: "present",
    },
    {
      id: 4,
      date: "2025-04-07",
      checkIn: "09:30 AM",
      checkOut: "04:30 PM",
      hoursWorked: "7:00",
      status: "late",
      notes: "Traffic delay reported"
    },
    {
      id: 5,
      date: "2025-04-04",
      checkIn: "08:20 AM",
      checkOut: "04:40 PM",
      hoursWorked: "8:20",
      status: "present",
    },
    {
      id: 6,
      date: "2025-04-03",
      checkIn: "-",
      checkOut: "-",
      hoursWorked: "-",
      status: "leave",
      notes: "Annual leave"
    },
    {
      id: 7,
      date: "2025-04-02",
      checkIn: "08:10 AM",
      checkOut: "04:20 PM",
      hoursWorked: "8:10",
      status: "present",
    },
  ];

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
      default:
        return null;
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
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
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
                  onSelect={setDate}
                  disabled={(date) =>
                    date > new Date() || date < new Date("2022-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="present">Present</SelectItem>
                <SelectItem value="absent">Absent</SelectItem>
                <SelectItem value="late">Late</SelectItem>
                <SelectItem value="leave">On Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="relative w-[250px]">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-8" />
            </div>
            <Button variant="outline" size="icon">
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
              {attendanceData.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.checkIn}</TableCell>
                  <TableCell>{record.checkOut}</TableCell>
                  <TableCell>{record.hoursWorked}</TableCell>
                  <TableCell>{getStatusBadge(record.status)}</TableCell>
                  <TableCell>{record.notes || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button variant="outline" size="sm">
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceHistory;
