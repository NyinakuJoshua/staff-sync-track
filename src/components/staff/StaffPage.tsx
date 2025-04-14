
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Mail, Phone, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { User } from "@/types";

const StaffPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  
  useEffect(() => {
    // Fetch users from localStorage
    const savedUsers = localStorage.getItem('staffSyncUsers');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);
  
  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.staffId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.department && user.department.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.position && user.position.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDeleteStaff = (userId: number) => {
    // Filter out the user to be deleted
    const updatedUsers = users.filter(user => user.id !== userId);
    
    // Update the state and localStorage
    setUsers(updatedUsers);
    localStorage.setItem('staffSyncUsers', JSON.stringify(updatedUsers));
    
    // Also remove their attendance records
    const savedRecords = localStorage.getItem('attendanceRecords');
    if (savedRecords) {
      const records = JSON.parse(savedRecords);
      const updatedRecords = records.filter((record: any) => record.userId !== userId);
      localStorage.setItem('attendanceRecords', JSON.stringify(updatedRecords));
    }
    
    toast.success("Staff member removed successfully");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Staff Management</h2>
        <p className="text-muted-foreground">
          Manage staff accounts and permissions
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search staff..."
          className="w-full sm:w-[300px] pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Staff Directory</CardTitle>
          <CardDescription>
            All registered staff members in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          {users.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              No staff members found in the system.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Staff ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-mono">{user.staffId}</TableCell>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === 'admin' ? "default" : "outline"}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.department || "—"}</TableCell>
                      <TableCell>{user.position || "—"}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <a href={`mailto:${user.email}`} className="inline-flex items-center hover:text-primary">
                            <Mail className="h-4 w-4 mr-1" />
                            <span className="sr-only">Email</span>
                          </a>
                          {user.phoneNumber && (
                            <a href={`tel:${user.phoneNumber}`} className="inline-flex items-center hover:text-primary">
                              <Phone className="h-4 w-4 mr-1" />
                              <span className="sr-only">Phone</span>
                            </a>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                          Active
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => handleDeleteStaff(user.id)}
                          disabled={user.role === 'admin'}
                          title={user.role === 'admin' ? "Admin accounts cannot be deleted" : "Delete staff member"}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffPage;
