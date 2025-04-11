
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const StaffPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Staff Management</h2>
        <p className="text-muted-foreground">
          View and manage staff information
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Staff Directory</CardTitle>
          <CardDescription>
            View and manage all staff members
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-60">
            <p className="text-muted-foreground">Staff management features will be implemented in the next update.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffPage;
