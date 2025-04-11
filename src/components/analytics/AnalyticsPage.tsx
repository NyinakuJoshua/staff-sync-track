
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AnalyticsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">
          View detailed attendance analytics and trends
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Attendance Analytics</CardTitle>
          <CardDescription>
            View detailed attendance metrics and trends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-60">
            <p className="text-muted-foreground">Analytics features will be implemented in the next update.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsPage;
