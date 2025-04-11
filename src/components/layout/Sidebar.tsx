
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
  FileTextIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  onPageChange: (page: string) => void;
  onLogout: () => void;
  currentPage: string;
}

const Sidebar = ({ onPageChange, onLogout, currentPage }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { id: "dashboard", icon: HomeIcon, label: "Dashboard" },
    { id: "attendance", icon: ClipboardCheckIcon, label: "Attendance" },
    { id: "staff", icon: UsersIcon, label: "Staff" },
    { id: "calendar", icon: CalendarIcon, label: "Calendar" },
    { id: "reports", icon: FileTextIcon, label: "Reports" },
    { id: "analytics", icon: PieChartIcon, label: "Analytics" },
  ];

  return (
    <div
      className={cn(
        "h-screen bg-sidebar text-sidebar-foreground flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-60"
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <h1 className="text-xl font-bold">Staff Sync</h1>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <MenuIcon className="h-5 w-5" />
        </Button>
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
              collapsed ? "px-2" : "px-4"
            )}
          >
            <item.icon className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-2")} />
            {!collapsed && <span>{item.label}</span>}
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
            collapsed ? "px-2" : "px-4"
          )}
        >
          <LogOutIcon className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-2")} />
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
