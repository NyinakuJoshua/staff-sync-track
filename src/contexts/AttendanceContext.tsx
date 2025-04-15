
import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { AttendanceRecord } from "@/types";

interface AttendanceContextType {
  attendanceRecords: AttendanceRecord[];
  setAttendanceRecords: React.Dispatch<React.SetStateAction<AttendanceRecord[]>>;
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

export function AttendanceProvider({ children }: { children: ReactNode }) {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);

  useEffect(() => {
    const savedRecords = localStorage.getItem('attendanceRecords');
    if (savedRecords) {
      setAttendanceRecords(JSON.parse(savedRecords));
    } else {
      const sampleAttendanceRecords: AttendanceRecord[] = [
        {
          id: 1,
          userId: 1,
          date: "2025-04-12",
          checkIn: "08:15:00",
          checkOut: "16:30:00",
          status: "present",
          hoursWorked: "8.25"
        },
        {
          id: 2,
          userId: 2,
          date: "2025-04-12",
          checkIn: "09:10:00",
          checkOut: "16:20:00",
          status: "late",
          hoursWorked: "7.17"
        },
        {
          id: 3,
          userId: 3,
          date: "2025-04-12",
          status: "absent",
          hoursWorked: "0"
        },
      ];
      
      setAttendanceRecords(sampleAttendanceRecords);
      localStorage.setItem('attendanceRecords', JSON.stringify(sampleAttendanceRecords));
    }
  }, []);

  useEffect(() => {
    if (attendanceRecords.length > 0) {
      localStorage.setItem('attendanceRecords', JSON.stringify(attendanceRecords));
    }
  }, [attendanceRecords]);

  return (
    <AttendanceContext.Provider value={{ attendanceRecords, setAttendanceRecords }}>
      {children}
    </AttendanceContext.Provider>
  );
}

export const useAttendance = () => {
  const context = useContext(AttendanceContext);
  if (context === undefined) {
    throw new Error("useAttendance must be used within an AttendanceProvider");
  }
  return context;
};
