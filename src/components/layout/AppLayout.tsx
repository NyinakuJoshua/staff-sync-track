
import { ReactNode, useState, useEffect } from "react";
import Sidebar from "./Sidebar";

interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'staff';
  password: string;
  staffId: string;
  department?: string;
  position?: string;
  dob?: string;
  gender?: string;
}

interface AppLayoutProps {
  children: ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout: () => void;
  currentUser?: User | null;
}

const AppLayout = ({ children, currentPage, onPageChange, onLogout, currentUser }: AppLayoutProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkSize();
    window.addEventListener('resize', checkSize);
    
    return () => {
      window.removeEventListener('resize', checkSize);
    };
  }, []);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar 
        onPageChange={onPageChange} 
        onLogout={onLogout} 
        currentPage={currentPage} 
        userRole={currentUser?.role || 'staff'} 
      />
      <main className="flex-1 overflow-auto bg-gray-50">
        <div className="container py-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
