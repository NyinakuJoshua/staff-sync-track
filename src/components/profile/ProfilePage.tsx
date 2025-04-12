
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckIcon, EyeIcon, EyeOffIcon, Loader2Icon, ShieldIcon, PencilIcon } from "lucide-react";
import { toast } from "sonner";

interface ProfilePageProps {
  user: {
    id: number;
    staffId: string;
    email: string;
    name: string;
    role: 'admin' | 'staff';
    password: string;
    department?: string;
    position?: string;
    dob?: string;
    gender?: string;
  };
  onUpdateCredentials: (currentPassword: string, newPassword: string, newEmail: string, newName: string) => boolean;
  onUpdateProfile?: (department?: string, position?: string, gender?: string) => boolean;
}

const ProfilePage = ({ user, onUpdateCredentials, onUpdateProfile }: ProfilePageProps) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  // New state for profile editing
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [department, setDepartment] = useState(user.department || "");
  const [position, setPosition] = useState(user.position || "");
  const [gender, setGender] = useState(user.gender || "");

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsUpdating(true);
    
    const success = onUpdateCredentials(currentPassword, newPassword, newEmail, newName);
    
    setIsUpdating(false);
    
    if (success) {
      // Clear password fields after successful update
      setCurrentPassword("");
      setNewPassword("");
    }
  };
  
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsUpdating(true);
    
    const success = onUpdateProfile?.(department, position, gender);
    
    setIsUpdating(false);
    
    if (success) {
      setIsEditingProfile(false);
      toast.success("Profile details updated successfully");
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
        <p className="text-muted-foreground">
          Manage your account settings and credentials
        </p>
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Your profile details and staff information
            </CardDescription>
          </div>
          {!isEditingProfile && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsEditingProfile(true)}
              className="flex items-center gap-1"
            >
              <PencilIcon className="h-3 w-3" />
              Edit details
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {isEditingProfile ? (
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="staffId">Staff ID</Label>
                  <Input
                    id="staffId"
                    value={user.staffId}
                    disabled
                    className="bg-muted"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    value={user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    disabled
                    className="bg-muted"
                  />
                </div>
                
                {user.role === 'staff' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="position">Position</Label>
                      <Input
                        id="position"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                      />
                    </div>
                  </>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={user.dob || ""}
                    disabled
                    className="bg-muted"
                  />
                </div>
              </div>
              
              <div className="flex space-x-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsEditingProfile(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isUpdating}>
                  {isUpdating ? (
                    <>
                      <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Staff ID</h3>
                <p className="mt-1">{user.staffId}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
                <p className="mt-1">{user.name}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                <p className="mt-1">{user.email}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Role</h3>
                <p className="mt-1">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
              </div>
              
              {user.department && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Department</h3>
                  <p className="mt-1">{user.department}</p>
                </div>
              )}
              
              {user.position && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Position</h3>
                  <p className="mt-1">{user.position}</p>
                </div>
              )}
              
              {user.gender && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Gender</h3>
                  <p className="mt-1">{user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}</p>
                </div>
              )}
              
              {user.dob && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Date of Birth</h3>
                  <p className="mt-1">{new Date(user.dob).toLocaleDateString()}</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Account Credentials</CardTitle>
          <CardDescription>
            Update your login information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCredentialsSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder={user.name}
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder={user.email}
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <div className="relative">
                <Input
                  id="current-password"
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <EyeOffIcon className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <EyeIcon className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOffIcon className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <EyeIcon className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>
            
            <Button type="submit" disabled={isUpdating} className="mt-4">
              {isUpdating ? (
                <>
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Credentials"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Role and Permissions</CardTitle>
          <CardDescription>Your current role and access level.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-x-2">
            <div className="rounded-full bg-primary/10 p-1 text-primary">
              <ShieldIcon className="h-5 w-5" />
            </div>
            <div className="font-semibold">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</div>
          </div>
          
          <div className="mt-4">
            <h4 className="mb-2 text-sm font-medium">Access to:</h4>
            <ul className="space-y-2 text-sm">
              {user.role === "admin" && (
                <li className="flex items-center gap-x-2">
                  <CheckIcon className="h-4 w-4 text-green-500" />
                  <span>Dashboard</span>
                </li>
              )}
              <li className="flex items-center gap-x-2">
                <CheckIcon className="h-4 w-4 text-green-500" />
                <span>Attendance Management</span>
              </li>
              {user.role === "admin" && (
                <>
                  <li className="flex items-center gap-x-2">
                    <CheckIcon className="h-4 w-4 text-green-500" />
                    <span>Staff Management</span>
                  </li>
                  <li className="flex items-center gap-x-2">
                    <CheckIcon className="h-4 w-4 text-green-500" />
                    <span>Reports and Analytics</span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
