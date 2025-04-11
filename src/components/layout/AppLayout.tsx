
import { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";

interface AppLayoutProps {
  children: ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout: () => void;
}

const AppLayout = ({ children, currentPage, onPageChange, onLogout }: AppLayoutProps) => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar 
        onPageChange={onPageChange} 
        onLogout={onLogout} 
        currentPage={currentPage} 
      />
      <main className="flex-1 overflow-auto">
        <div className="container py-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
