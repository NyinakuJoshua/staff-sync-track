
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogInIcon, LogOutIcon } from "lucide-react";
import { toast } from "sonner";
import { AttendanceRecord } from "@/types";

const CheckInOut = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [status, setStatus] = useState<"out" | "in">("out");
  const [checkInTime, setCheckInTime] = useState<Date | null>(null);
  const [checkOutTime, setCheckOutTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState<string | null>(null);

  // Load check-in state from localStorage on component mount
  useEffect(() => {
    const savedStatus = localStorage.getItem('staffCheckStatus');
    const savedCheckInTime = localStorage.getItem('staffCheckInTime');
    const savedCheckOutTime = localStorage.getItem('staffCheckOutTime');
    
    if (savedStatus) {
      setStatus(savedStatus as "in" | "out");
    }
    
    if (savedCheckInTime) {
      setCheckInTime(new Date(savedCheckInTime));
    }
    
    if (savedCheckOutTime) {
      setCheckOutTime(new Date(savedCheckOutTime));
    }
  }, []);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Calculate elapsed time when checked in
  useEffect(() => {
    if (status === "in" && checkInTime) {
      const timer = setInterval(() => {
        const now = new Date();
        const elapsed = now.getTime() - checkInTime.getTime();
        const hours = Math.floor(elapsed / (1000 * 60 * 60));
        const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);
        
        setElapsedTime(
          `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        );
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [status, checkInTime]);

  const handleCheckIn = () => {
    const now = new Date();
    setCheckInTime(now);
    setStatus("in");
    
    // Save to localStorage
    localStorage.setItem('staffCheckStatus', 'in');
    localStorage.setItem('staffCheckInTime', now.toISOString());
    
    // Save to attendance records
    saveAttendanceRecord(now, null);
    
    toast.success("You have successfully checked in!");
  };

  const handleCheckOut = () => {
    const now = new Date();
    setCheckOutTime(now);
    setStatus("out");
    setElapsedTime(null);
    
    // Clear localStorage
    localStorage.setItem('staffCheckStatus', 'out');
    localStorage.setItem('staffCheckOutTime', now.toISOString());
    
    // Update attendance record
    if (checkInTime) {
      saveAttendanceRecord(checkInTime, now);
    }
    
    toast.success("You have successfully checked out!");
  };

  const saveAttendanceRecord = (checkIn: Date, checkOut: Date | null) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (!currentUser.id) return;
    
    const today = new Date().toISOString().split('T')[0];
    
    // Get existing records
    const attendanceRecords = JSON.parse(localStorage.getItem('attendanceRecords') || '[]');
    
    // Check if there's already a record for today and this user
    const existingRecordIndex = attendanceRecords.findIndex(
      (record: any) => record.date === today && record.userId === currentUser.id
    );
    
    if (existingRecordIndex >= 0) {
      // Update existing record
      attendanceRecords[existingRecordIndex] = {
        ...attendanceRecords[existingRecordIndex],
        checkIn: checkIn.toLocaleTimeString(),
        checkOut: checkOut ? checkOut.toLocaleTimeString() : null,
        status: checkOut ? 'completed' : 'present',
        hoursWorked: checkOut ? 
          `${Math.round((checkOut.getTime() - checkIn.getTime()) / 36000) / 100}` : 
          'In progress'
      };
    } else {
      // Create new record
      const newRecord = {
        id: attendanceRecords.length + 1,
        userId: currentUser.id,
        date: today,
        checkIn: checkIn.toLocaleTimeString(),
        checkOut: checkOut ? checkOut.toLocaleTimeString() : null,
        status: checkOut ? 'completed' : 'present',
        hoursWorked: checkOut ? 
          `${Math.round((checkOut.getTime() - checkIn.getTime()) / 36000) / 100}` : 
          'In progress'
      };
      attendanceRecords.push(newRecord);
    }
    
    // Save back to localStorage
    localStorage.setItem('attendanceRecords', JSON.stringify(attendanceRecords));
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Staff Check In/Out</CardTitle>
          <CardDescription>Record your daily attendance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-4xl font-bold">
              {formatTime(currentTime)}
            </div>
            <div className="text-muted-foreground">
              {currentTime.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>

          <div className="flex items-center justify-center space-x-4 pt-6">
            <Button
              size="lg"
              onClick={handleCheckIn}
              disabled={status === "in"}
              className="w-32"
            >
              <LogInIcon className="mr-2 h-4 w-4" />
              Check In
            </Button>
            <Button
              size="lg"
              onClick={handleCheckOut}
              disabled={status === "out"}
              variant="outline"
              className="w-32"
            >
              <LogOutIcon className="mr-2 h-4 w-4" />
              Check Out
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              Status:{" "}
              {status === "in" ? (
                <Badge variant="default" className="bg-staff-present ml-1">
                  Checked In
                </Badge>
              ) : (
                <Badge variant="secondary" className="ml-1">
                  Not Checked In
                </Badge>
              )}
            </p>
          </div>
          <div>
            {status === "in" && elapsedTime && (
              <p className="text-sm text-muted-foreground">
                Time elapsed: <span className="font-semibold">{elapsedTime}</span>
              </p>
            )}
          </div>
        </CardFooter>
      </Card>

      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Today's Record</CardTitle>
          <CardDescription>Your attendance information for today</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Check in time:</span>
              <span className="font-medium">
                {checkInTime ? formatTime(checkInTime) : "Not checked in yet"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Check out time:</span>
              <span className="font-medium">
                {checkOutTime ? formatTime(checkOutTime) : "Not checked out yet"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Working hours:</span>
              <span className="font-medium">
                {checkInTime && checkOutTime
                  ? `${Math.round((checkOutTime.getTime() - checkInTime.getTime()) / 36000) / 100} hours`
                  : status === "in" && elapsedTime
                  ? elapsedTime
                  : "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              <span className="font-medium">
                {status === "in"
                  ? "Present"
                  : checkInTime && checkOutTime
                  ? "Completed"
                  : "Not started"}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground w-full text-center">
            If you need to make corrections to your attendance record, please contact an administrator.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CheckInOut;
