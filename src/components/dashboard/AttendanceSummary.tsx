
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";

const AttendanceSummary = () => {
  const weeklyData = [
    { name: "Monday", present: 45, absent: 3, late: 2, leave: 2 },
    { name: "Tuesday", present: 46, absent: 2, late: 1, leave: 3 },
    { name: "Wednesday", present: 44, absent: 4, late: 2, leave: 2 },
    { name: "Thursday", present: 43, absent: 3, late: 4, leave: 2 },
    { name: "Friday", present: 42, absent: 3, late: 3, leave: 4 },
  ];

  const todayData = [
    { name: "Present", value: 42, color: "#10B981" },
    { name: "Absent", value: 3, color: "#EF4444" },
    { name: "Late", value: 3, color: "#F59E0B" },
    { name: "Leave", value: 3, color: "#6366F1" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Today's Attendance</CardTitle>
          <CardDescription>
            Snapshot of current day attendance status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={todayData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {todayData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Weekly Overview</CardTitle>
          <CardDescription>
            Attendance trends for the past week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={weeklyData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="present" stackId="a" fill="#10B981" />
                <Bar dataKey="absent" stackId="a" fill="#EF4444" />
                <Bar dataKey="late" stackId="a" fill="#F59E0B" />
                <Bar dataKey="leave" stackId="a" fill="#6366F1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceSummary;
