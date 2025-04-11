
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, ClockIcon, UsersIcon } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

const ManualAttendance = () => {
  const [date, setDate] = useState<Date>();
  const [staffMember, setStaffMember] = useState("");
  const [status, setStatus] = useState("");
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !staffMember || !status) {
      toast.error("Please fill in all required fields!");
      return;
    }
    
    toast.success("Attendance record has been saved successfully!");
    
    // Reset form after submission
    setDate(undefined);
    setStaffMember("");
    setStatus("");
    setCheckInTime("");
    setCheckOutTime("");
    setReason("");
  };

  const staffMembers = [
    { id: "js1", name: "John Smith" },
    { id: "sj2", name: "Sarah Johnson" },
    { id: "mb3", name: "Michael Brown" },
    { id: "ed4", name: "Emily Davis" },
    { id: "rw5", name: "Robert Wilson" },
    { id: "jl6", name: "Jennifer Lee" },
    { id: "dg7", name: "David Garcia" },
    { id: "lw8", name: "Lisa Wang" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manual Attendance Entry</CardTitle>
        <CardDescription>
          Record or edit attendance information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date <span className="text-red-500">*</span></Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal"
                    id="date"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="staff">Staff Member <span className="text-red-500">*</span></Label>
              <Select value={staffMember} onValueChange={setStaffMember}>
                <SelectTrigger id="staff" className="w-full">
                  <SelectValue placeholder="Select staff member" />
                </SelectTrigger>
                <SelectContent>
                  {staffMembers.map((staff) => (
                    <SelectItem key={staff.id} value={staff.id}>
                      {staff.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Attendance Status <span className="text-red-500">*</span></Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger id="status" className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="present">Present</SelectItem>
                  <SelectItem value="absent">Absent</SelectItem>
                  <SelectItem value="late">Late</SelectItem>
                  <SelectItem value="leave">On Leave</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="checkin">Check-in Time</Label>
              <div className="relative">
                <ClockIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="checkin"
                  type="time"
                  value={checkInTime}
                  onChange={(e) => setCheckInTime(e.target.value)}
                  className="pl-10"
                  disabled={status === "absent" || status === "leave"}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="checkout">Check-out Time</Label>
              <div className="relative">
                <ClockIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="checkout"
                  type="time"
                  value={checkOutTime}
                  onChange={(e) => setCheckOutTime(e.target.value)}
                  className="pl-10"
                  disabled={status === "absent" || status === "leave"}
                />
              </div>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="reason">Reason / Notes</Label>
              <Textarea
                id="reason"
                placeholder="Enter additional details here..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" type="button" onClick={() => {
              setDate(undefined);
              setStaffMember("");
              setStatus("");
              setCheckInTime("");
              setCheckOutTime("");
              setReason("");
            }}>
              Reset
            </Button>
            <Button type="submit">Save Record</Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        <p>Fields marked with <span className="text-red-500">*</span> are required. Manual entries are logged and require admin approval.</p>
      </CardFooter>
    </Card>
  );
};

export default ManualAttendance;
