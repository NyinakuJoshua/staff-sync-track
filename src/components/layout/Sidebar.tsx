
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CalendarIcon,
  ClipboardCheckIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  PieChartIcon,
  UsersIcon,
  FileTextIcon,
  UserIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  onPageChange: (page: string) => void;
  onLogout: () => void;
  currentPage: string;
  userRole: 'admin' | 'staff';
  isMobile?: boolean;
}

const Sidebar = ({ onPageChange, onLogout, currentPage, userRole, isMobile = false }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  // Define menu items based on user role
  const getMenuItems = () => {
    const items = [];
    
    // Only admin can view dashboard
    if (userRole === 'admin') {
      items.push({ id: "dashboard", icon: HomeIcon, label: "Dashboard" });
    }
    
    // Only staff can access attendance check-in/out
    if (userRole === 'staff') {
      items.push({ id: "attendance", icon: ClipboardCheckIcon, label: "Attendance" });
    }
    
    // Only admin can view staff management
    if (userRole === 'admin') {
      items.push({ id: "staff", icon: UsersIcon, label: "Staff" });
    }
    
    // All users can access calendar
    items.push({ id: "calendar", icon: CalendarIcon, label: "Calendar" });
    
    // Only admin can view reports and analytics
    if (userRole === 'admin') {
      items.push({ id: "reports", icon: FileTextIcon, label: "Reports" });
      items.push({ id: "analytics", icon: PieChartIcon, label: "Analytics" });
    }
    
    // All users can access their profile
    items.push({ id: "profile", icon: UserIcon, label: "Profile" });
    
    return items;
  };

  const menuItems = getMenuItems();

  // Mobile sidebar doesn't support collapsing
  const effectiveCollapsed = isMobile ? false : collapsed;

  return (
    <div
      className={cn(
        "h-screen bg-sidebar text-sidebar-foreground flex flex-col transition-all duration-300",
        isMobile ? "w-full" : effectiveCollapsed ? "w-16" : "w-60"
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!effectiveCollapsed && (
          <h1 className="text-xl font-bold">Staff Sync</h1>
        )}
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <MenuIcon className="h-5 w-5" />
          </Button>
        )}
      </div>
      <Separator className="bg-sidebar-border" />
      <div className="flex-1 py-4">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            onClick={() => onPageChange(item.id)}
            className={cn(
              "w-full justify-start px-3 py-2 my-1 hover:bg-sidebar-accent",
              currentPage === item.id && "bg-sidebar-accent",
              effectiveCollapsed ? "px-2" : "px-4"
            )}
          >
            <item.icon className={cn("h-5 w-5", effectiveCollapsed ? "mr-0" : "mr-2")} />
            {!effectiveCollapsed && <span>{item.label}</span>}
          </Button>
        ))}
      </div>
      <Separator className="bg-sidebar-border" />
      <div className="p-4">
        <Button
          variant="ghost"
          onClick={onLogout}
          className={cn(
            "w-full justify-start hover:bg-sidebar-accent text-sidebar-foreground",
            effectiveCollapsed ? "px-2" : "px-4"
          )}
        >
          <LogOutIcon className={cn("h-5 w-5", effectiveCollapsed ? "mr-0" : "mr-2")} />
          {!effectiveCollapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
