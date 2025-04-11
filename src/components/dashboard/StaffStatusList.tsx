
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircleIcon, AlertCircleIcon, ClockIcon, CalendarIcon } from "lucide-react";

const StaffStatusList = () => {
  const staffStatus = [
    {
      id: 1,
      name: "John Smith",
      position: "Math Teacher",
      department: "Mathematics",
      status: "present",
      checkInTime: "08:30 AM",
      avatarUrl: "",
      initials: "JS",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      position: "Science Teacher",
      department: "Science",
      status: "present",
      checkInTime: "08:15 AM",
      avatarUrl: "",
      initials: "SJ",
    },
    {
      id: 3,
      name: "Michael Brown",
      position: "History Teacher",
      department: "Humanities",
      status: "late",
      checkInTime: "09:45 AM",
      avatarUrl: "",
      initials: "MB",
    },
    {
      id: 4,
      name: "Emily Davis",
      position: "English Teacher",
      department: "English",
      status: "absent",
      checkInTime: "-",
      avatarUrl: "",
      initials: "ED",
    },
    {
      id: 5,
      name: "Robert Wilson",
      position: "PE Teacher",
      department: "Physical Education",
      status: "leave",
      checkInTime: "-",
      avatarUrl: "",
      initials: "RW",
      note: "Annual leave until 15th"
    },
    {
      id: 6,
      name: "Jennifer Lee",
      position: "Art Teacher",
      department: "Fine Arts",
      status: "present",
      checkInTime: "08:05 AM",
      avatarUrl: "",
      initials: "JL",
    },
    {
      id: 7,
      name: "David Garcia",
      position: "Computer Science Teacher",
      department: "Technology",
      status: "present",
      checkInTime: "08:22 AM",
      avatarUrl: "",
      initials: "DG",
    },
    {
      id: 8,
      name: "Lisa Wang",
      position: "Music Teacher",
      department: "Fine Arts",
      status: "leave",
      checkInTime: "-",
      avatarUrl: "",
      initials: "LW",
      note: "Medical leave until 20th"
    },
  ];

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'present':
        return <CheckCircleIcon className="h-4 w-4 text-staff-present" />;
      case 'absent':
        return <AlertCircleIcon className="h-4 w-4 text-staff-absent" />;
      case 'late':
        return <ClockIcon className="h-4 w-4 text-staff-late" />;
      case 'leave':
        return <CalendarIcon className="h-4 w-4 text-staff-leave" />;
      default:
        return null;
    }
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
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Staff Status</CardTitle>
        <CardDescription>
          Current attendance status of all staff members
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Check-in Time</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staffStatus.map((staff) => (
              <TableRow key={staff.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={staff.avatarUrl} alt={staff.name} />
                      <AvatarFallback>{staff.initials}</AvatarFallback>
                    </Avatar>
                    <span>{staff.name}</span>
                  </div>
                </TableCell>
                <TableCell>{staff.position}</TableCell>
                <TableCell>{staff.department}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(staff.status)}
                    {getStatusBadge(staff.status)}
                  </div>
                </TableCell>
                <TableCell>{staff.checkInTime}</TableCell>
                <TableCell>{staff.note || "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default StaffStatusList;
