
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { User } from "@/types";

export const useNavigation = (currentUser: User | null) => {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const hasAccess = (page: string) => {
    if (!currentUser) return false;
    
    if (currentUser.role === 'admin') {
      return true;
    }
    
    if (['staff', 'analytics', 'reports'].includes(page)) {
      return false;
    }
    
    return true;
  };

  useEffect(() => {
    if (currentUser) {
      setCurrentPage(currentUser.role === 'admin' ? 'dashboard' : 'attendance');
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser && !hasAccess(currentPage)) {
      setCurrentPage('attendance');
      toast.error("You don't have access to that page");
    }
  }, [currentPage, currentUser]);

  return { currentPage, setCurrentPage, hasAccess };
};
