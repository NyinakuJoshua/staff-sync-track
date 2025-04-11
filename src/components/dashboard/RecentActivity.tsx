
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogInIcon, LogOutIcon, CalendarIcon, UserIcon, AlertTriangleIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: "check-in",
      name: "Lisa Wang",
      time: "08:52 AM",
      date: "Today",
      icon: LogInIcon,
      iconColor: "text-green-500",
    },
    {
      id: 2,
      type: "check-out",
      name: "Michael Brown",
      time: "08:45 AM",
      date: "Today",
      icon: LogOutIcon,
      iconColor: "text-blue-500",
      note: "Left early for doctor's appointment",
    },
    {
      id: 3,
      type: "leave-request",
      name: "Robert Wilson",
      time: "08:30 AM",
      date: "Today",
      icon: CalendarIcon,
      iconColor: "text-purple-500",
      note: "Requested annual leave from Jun 20-25",
    },
    {
      id: 4,
      type: "late",
      name: "Emily Davis",
      time: "08:15 AM",
      date: "Today",
      icon: AlertTriangleIcon,
      iconColor: "text-amber-500",
      note: "Marked as late - Traffic delay reported",
    },
    {
      id: 5,
      type: "check-in",
      name: "David Garcia",
      time: "08:05 AM",
      date: "Today",
      icon: LogInIcon,
      iconColor: "text-green-500",
    },
    {
      id: 6,
      type: "profile-update",
      name: "Sarah Johnson",
      time: "04:45 PM",
      date: "Yesterday",
      icon: UserIcon,
      iconColor: "text-sky-500",
      note: "Updated contact information",
    },
    {
      id: 7,
      type: "check-out",
      name: "John Smith",
      time: "04:30 PM",
      date: "Yesterday",
      icon: LogOutIcon,
      iconColor: "text-blue-500",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Latest attendance and leave management activities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity) => (
            <div key={activity.id} className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full",
                  activity.iconColor.replace("text-", "bg-").replace("-500", "-100")
                )}>
                  <activity.icon className={cn("h-5 w-5", activity.iconColor)} />
                </div>
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">
                  {activity.name}
                  <span className="font-normal text-muted-foreground ml-2">
                    {activity.type === "check-in" && "checked in"}
                    {activity.type === "check-out" && "checked out"}
                    {activity.type === "leave-request" && "requested leave"}
                    {activity.type === "late" && "marked as late"}
                    {activity.type === "profile-update" && "updated profile"}
                  </span>
                </p>
                {activity.note && (
                  <p className="text-sm text-muted-foreground">{activity.note}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  {activity.date} at {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
