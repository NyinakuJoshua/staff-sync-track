
import { ReactNode, useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { CheckInStatus } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";

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
  checkInStatus?: CheckInStatus;
}

const AppLayout = ({ children, currentPage, onPageChange, onLogout, currentUser, checkInStatus }: AppLayoutProps) => {
  const isMobile = useIsMobile();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handlePageChange = (page: string) => {
    onPageChange(page);
    if (isMobile) {
      setIsSheetOpen(false);
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {isMobile ? (
        <>
          <header className="fixed top-0 w-full bg-white z-10 flex justify-between items-center p-4 shadow-sm">
            <h1 className="text-xl font-bold">Staff Sync</h1>
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MenuIcon className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="h-full pt-0">
                  <Sidebar 
                    onPageChange={handlePageChange}
                    onLogout={() => {
                      setIsSheetOpen(false);
                      onLogout();
                    }}
                    currentPage={currentPage}
                    userRole={currentUser?.role || 'staff'}
                    isMobile={true}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </header>
          <main className="flex-1 overflow-auto bg-gray-50 pt-16 pb-20">
            <div className="container py-6">
              {children}
            </div>
          </main>
        </>
      ) : (
        <>
          <Sidebar 
            onPageChange={onPageChange} 
            onLogout={onLogout} 
            currentPage={currentPage} 
            userRole={currentUser?.role || 'staff'}
            isMobile={false}
          />
          <main className="flex-1 overflow-auto bg-gray-50">
            <div className="container py-6">
              {children}
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default AppLayout;
