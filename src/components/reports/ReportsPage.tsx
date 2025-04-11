
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ReportsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
        <p className="text-muted-foreground">
          Generate and view attendance reports
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Attendance Reports</CardTitle>
          <CardDescription>
            Generate and download attendance reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-60">
            <p className="text-muted-foreground">Reporting features will be implemented in the next update.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPage;
