
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusIcon, TrashIcon, UserIcon } from "lucide-react";
import { toast } from "sonner";

interface StaffMember {
  id: number;
  staffId: string;
  name: string;
  email: string;
  position: string;
  department: string;
  phone: string;
  status: string;
}

const StaffPage = () => {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);

  const [newStaff, setNewStaff] = useState({
    name: "",
    email: "",
    position: "",
    department: "",
    phone: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewStaff((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewStaff((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddStaff = () => {
    if (!newStaff.name || !newStaff.email || !newStaff.position || !newStaff.department) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Generate staff ID (department prefix + sequential number)
    const deptPrefix = newStaff.department.substring(0, 3).toUpperCase();
    const existingDeptUsers = staffMembers.filter(staff => 
      staff.department === newStaff.department || 
      (staff.staffId && staff.staffId.startsWith(deptPrefix))
    );
    const newStaffNumber = (existingDeptUsers.length + 1).toString().padStart(3, '0');
    const staffId = `${deptPrefix}${newStaffNumber}`;

    const newStaffMember = {
      id: staffMembers.length > 0 ? Math.max(...staffMembers.map(s => s.id)) + 1 : 1,
      staffId,
      ...newStaff,
      status: "active"
    };

    setStaffMembers([...staffMembers, newStaffMember]);
    toast.success(`${newStaff.name} has been added to staff with ID: ${staffId}`);
    
    // Reset form
    setNewStaff({
      name: "",
      email: "",
      position: "",
      department: "",
      phone: "",
    });
    
    setIsAddStaffOpen(false);
  };

  const handleRemoveStaff = (id: number) => {
    const staffToRemove = staffMembers.find(staff => staff.id === id);
    if (staffToRemove) {
      setStaffMembers(staffMembers.filter(staff => staff.id !== id));
      toast.success(`${staffToRemove.name} has been removed from staff`);
    }
  };

  const filteredStaff = staffMembers.filter(staff => 
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.staffId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const departments = ["Mathematics", "Science", "Humanities", "English", "Physical Education", "Fine Arts", "Technology"];
  const positions = ["Teacher", "Department Head", "Administrator", "Support Staff", "Counselor"];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Staff Management</h2>
        <p className="text-muted-foreground">
          View and manage staff information
        </p>
      </div>

      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Input
            type="text"
            placeholder="Search staff..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <UserIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        </div>
        
        <Dialog open={isAddStaffOpen} onOpenChange={setIsAddStaffOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusIcon className="h-4 w-4" />
              Add Staff Member
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Staff Member</DialogTitle>
              <DialogDescription>
                Enter the details of the new staff member.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={newStaff.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={newStaff.email}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="position" className="text-right">
                  Position
                </Label>
                <Select 
                  value={newStaff.position} 
                  onValueChange={(value) => handleSelectChange("position", value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    {positions.map((position) => (
                      <SelectItem key={position} value={position}>
                        {position}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="department" className="text-right">
                  Department
                </Label>
                <Select 
                  value={newStaff.department} 
                  onValueChange={(value) => handleSelectChange("department", value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((department) => (
                      <SelectItem key={department} value={department}>
                        {department}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={newStaff.phone}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddStaffOpen(false)}>Cancel</Button>
              <Button onClick={handleAddStaff}>Add Staff</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Staff Directory</CardTitle>
          <CardDescription>
            View and manage all staff members
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredStaff.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Staff ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.map((staff) => (
                  <TableRow key={staff.id}>
                    <TableCell className="font-mono">{staff.staffId}</TableCell>
                    <TableCell className="font-medium">{staff.name}</TableCell>
                    <TableCell>{staff.email}</TableCell>
                    <TableCell>{staff.position}</TableCell>
                    <TableCell>{staff.department}</TableCell>
                    <TableCell>{staff.phone}</TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRemoveStaff(staff.id)}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex items-center justify-center h-40">
              <p className="text-muted-foreground">No staff members found. Add new staff members to get started.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffPage;
