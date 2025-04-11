
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const CalendarPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Calendar</h2>
        <p className="text-muted-foreground">
          View and manage schedules and events
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Schedule Calendar</CardTitle>
          <CardDescription>
            View and manage staff schedules and events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-60">
            <p className="text-muted-foreground">Calendar features will be implemented in the next update.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarPage;
