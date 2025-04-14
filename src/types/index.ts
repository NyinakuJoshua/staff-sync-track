
export interface User {
  id: number;
  staffId: string;
  email: string;
  name: string;
  role: 'admin' | 'staff';
  password: string;
  department?: string;
  position?: string;
  dob?: string;
  gender?: string;
  phoneNumber?: string;
}

export interface AttendanceRecord {
  id: number;
  userId: number;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: 'present' | 'absent' | 'late' | 'leave' | 'completed';
  hoursWorked?: string;
  note?: string;
}

export interface StaffComment {
  id: number;
  userId: number;
  userName: string;
  userStaffId: string;
  date: string;
  type: string;
  comment: string;
  timestamp: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface CalendarEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  description?: string;
  createdBy: number;
  attendees?: number[];
  isVisible?: boolean; // To control visibility for staff/admin
}
