
import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { User, CheckInStatus } from "@/types";
import { toast } from "sonner";

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: User | null;
  checkInStatus: CheckInStatus;
  login: (staffId: string, email: string, password: string) => void;
  logout: () => void;
  signup: (name: string, email: string, password: string, role: 'admin' | 'staff', department: string, position: string, dob: string, gender: string, phoneNumber: string) => void;
  updateCredentials: (currentPassword: string, newPassword: string, newEmail: string, newName: string) => boolean;
  updateProfile: (department?: string, position?: string, gender?: string, phoneNumber?: string) => boolean;
  setCheckInStatus: React.Dispatch<React.SetStateAction<CheckInStatus>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children, users, setUsers }: { 
  children: ReactNode;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [checkInStatus, setCheckInStatus] = useState<CheckInStatus>({
    isCheckedIn: false,
    checkInTime: null
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setIsAuthenticated(true);
      
      const checkStatus = localStorage.getItem('staffCheckStatus');
      const checkInTime = localStorage.getItem('staffCheckInTime');
      
      if (checkStatus === 'checkedIn') {
        setCheckInStatus({
          isCheckedIn: true,
          checkInTime: checkInTime
        });
      }
    }
  }, []);

  const login = (staffId: string, email: string, password: string) => {
    const user = users.find(u => u.staffId === staffId && u.email === email && u.password === password);
    
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      toast.success(`Welcome back, ${user.name}!`);
      
      const checkStatus = localStorage.getItem('staffCheckStatus');
      const checkInTime = localStorage.getItem('staffCheckInTime');
      
      if (checkStatus === 'checkedIn') {
        setCheckInStatus({
          isCheckedIn: true,
          checkInTime: checkInTime
        });
      }
    } else {
      toast.error("Invalid staff ID, email or password");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    
    localStorage.removeItem('currentUser');
    localStorage.removeItem('staffCheckStatus');
    localStorage.removeItem('staffCheckInTime');
    localStorage.removeItem('staffCheckOutTime');
    
    setCheckInStatus({
      isCheckedIn: false,
      checkInTime: null
    });
    
    toast.success("You have been logged out successfully!");
  };

  const signup = (name: string, email: string, password: string, role: 'admin' | 'staff', department: string, position: string, dob: string, gender: string, phoneNumber: string) => {
    if (users.some(user => user.email === email)) {
      toast.error("Email already exists");
      return;
    }
    
    let staffId = '';
    
    if (role === 'admin') {
      const existingAdmins = users.filter(user => user.role === 'admin');
      const newAdminNumber = (existingAdmins.length + 1).toString().padStart(3, '0');
      staffId = `ADMIN${newAdminNumber}`;
    } else {
      const deptPrefix = department.substring(0, 3).toUpperCase();
      const existingDeptUsers = users.filter(user => 
        user.department === department || 
        (user.staffId && user.staffId.startsWith(deptPrefix))
      );
      const newStaffNumber = (existingDeptUsers.length + 1).toString().padStart(3, '0');
      staffId = `${deptPrefix}${newStaffNumber}`;
    }
    
    const newUser: User = {
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      staffId,
      email,
      password,
      name,
      role,
      department: role === 'staff' ? department : undefined,
      position: role === 'staff' ? position : undefined,
      dob,
      gender,
      phoneNumber
    };
    
    setUsers([...users, newUser]);
    toast.success(`Account created successfully! Your Staff ID is: ${staffId}`);
  };

  const updateCredentials = (currentPassword: string, newPassword: string, newEmail: string, newName: string) => {
    if (!currentUser) return false;
    
    if (currentPassword !== currentUser.password) {
      toast.error("Current password is incorrect");
      return false;
    }
    
    const updatedUsers = users.map(user => {
      if (user.id === currentUser.id) {
        return {
          ...user,
          password: newPassword || user.password,
          email: newEmail || user.email,
          name: newName || user.name
        };
      }
      return user;
    });
    
    setUsers(updatedUsers);
    
    const updatedUser = {
      ...currentUser,
      password: newPassword || currentUser.password,
      email: newEmail || currentUser.email,
      name: newName || currentUser.name
    };
    
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    toast.success("Credentials updated successfully");
    return true;
  };

  const updateProfile = (department?: string, position?: string, gender?: string, phoneNumber?: string) => {
    if (!currentUser) return false;
    
    const updatedUsers = users.map(user => {
      if (user.id === currentUser.id) {
        return {
          ...user,
          department: department || user.department,
          position: position || user.position,
          gender: gender || user.gender,
          phoneNumber: phoneNumber || user.phoneNumber
        };
      }
      return user;
    });
    
    setUsers(updatedUsers);
    
    const updatedUser = {
      ...currentUser,
      department: department || currentUser.department,
      position: position || currentUser.position,
      gender: gender || currentUser.gender,
      phoneNumber: phoneNumber || currentUser.phoneNumber
    };
    
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    return true;
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      currentUser, 
      checkInStatus,
      login,
      logout,
      signup,
      updateCredentials,
      updateProfile,
      setCheckInStatus
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
