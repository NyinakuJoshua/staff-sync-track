
import { User } from "@/types";

export const sampleUsers: User[] = [
  {
    id: 1,
    staffId: "ADMIN001",
    email: "admin@example.com",
    password: "admin123",
    name: "Admin User",
    role: "admin",
    gender: "prefer-not-to-say",
    phoneNumber: "+1234567890",
    dob: "1990-01-01"
  },
  {
    id: 2,
    staffId: "MAT001",
    email: "john@example.com",
    password: "password123",
    name: "John Smith",
    role: "staff",
    department: "Mathematics",
    position: "Teacher",
    gender: "male",
    phoneNumber: "+1987654321",
    dob: "1985-05-15"
  },
  {
    id: 3,
    staffId: "SCI001",
    email: "sarah@example.com",
    password: "password123",
    name: "Sarah Johnson",
    role: "staff",
    department: "Science",
    position: "Department Head",
    gender: "female",
    phoneNumber: "+1654987321",
    dob: "1982-09-23"
  }
];
