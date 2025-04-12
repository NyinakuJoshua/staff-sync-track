import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckIcon, EyeIcon, EyeOffIcon, Loader2Icon, ShieldIcon } from "lucide-react";
import { toast } from "sonner";

interface ProfilePageProps {
  user: {
    id: number;
    email: string;
    name: string;
    role: 'admin' | 'staff';
    password: string;
  };
  onUpdateCredentials: (currentPassword: string, newPassword: string, newEmail: string, newName: string) => boolean;
}

const ProfilePage = ({ user, onUpdateCredentials }: ProfilePageProps) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
        <p className="text-muted-foreground">
          Manage your account settings and credentials
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>
            View and update your account details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
                "Update Profile"
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
              <li className="flex items-center gap-x-2">
                <CheckIcon className="h-4 w-4 text-green-500" />
                <span>Dashboard</span>
              </li>
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
