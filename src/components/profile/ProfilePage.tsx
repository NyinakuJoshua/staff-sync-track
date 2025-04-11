
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { UserIcon, KeyIcon, MailIcon, Save, Fingerprint, ShieldCheck } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'staff';
  password: string;
}

interface ProfilePageProps {
  user: User;
  onUpdateCredentials: (currentPassword: string, newPassword: string, newEmail: string, newName: string) => boolean | void;
}

const ProfilePage = ({ user, onUpdateCredentials }: ProfilePageProps) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newEmail, setNewEmail] = useState(user.email);
  const [newName, setNewName] = useState(user.name);
  const [loading, setLoading] = useState(false);
  const [showBiometricDialog, setShowBiometricDialog] = useState(false);
  const [biometricVerified, setBiometricVerified] = useState(false);
  const [formValues, setFormValues] = useState<{
    currentPassword: string;
    newPassword: string;
    newEmail: string;
    newName: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (newPassword && newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }
    
    if (newPassword && newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }
    
    if (!currentPassword) {
      toast.error("Current password is required to make changes");
      return;
    }
    
    // Save form values for after biometric verification
    setFormValues({
      currentPassword,
      newPassword,
      newEmail,
      newName
    });
    
    // Show biometric dialog
    setShowBiometricDialog(true);
  };

  const simulateBiometricAuth = () => {
    setLoading(true);
    
    // Simulate biometric authentication process
    setTimeout(() => {
      setBiometricVerified(true);
      setLoading(false);
      setShowBiometricDialog(false);
      
      // Process the form submission after biometric verification
      if (formValues) {
        processFormSubmission(
          formValues.currentPassword,
          formValues.newPassword,
          formValues.newEmail,
          formValues.newName
        );
      }
    }, 1500);
  };
  
  const processFormSubmission = (
    currentPwd: string,
    newPwd: string,
    email: string,
    name: string
  ) => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const success = onUpdateCredentials(currentPwd, newPwd, email, name);
      
      if (success) {
        // Reset form
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setBiometricVerified(false);
      }
      
      setLoading(false);
    }, 1000);
  };

  const cancelBiometricAuth = () => {
    setShowBiometricDialog(false);
    setLoading(false);
    setBiometricVerified(false);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Account Settings</h2>
        <p className="text-muted-foreground">
          Manage your account information and password
        </p>
      </div>
      
      <Alert>
        <ShieldCheck className="h-4 w-4" />
        <AlertTitle>Enhanced Security</AlertTitle>
        <AlertDescription>
          Your profile is protected with biometric authentication. Face ID or fingerprint verification will be required when making changes.
        </AlertDescription>
      </Alert>
      
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Update your account details and password
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <MailIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <div className="relative">
                <KeyIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Required to confirm your changes
              </p>
            </div>
            
            <div className="pt-4 border-t">
              <h3 className="font-medium mb-2">Change Password</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <div className="relative">
                    <KeyIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="new-password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <div className="relative">
                    <KeyIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving Changes...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Changes
                </span>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
      
      {/* Biometric Authentication Dialog */}
      <Dialog open={showBiometricDialog} onOpenChange={setShowBiometricDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Biometric Authentication Required</DialogTitle>
            <DialogDescription>
              Please verify your identity using Face ID or fingerprint to continue with profile changes.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center justify-center py-6">
            <div className="mb-6">
              <Fingerprint className="h-20 w-20 text-primary animate-pulse" />
            </div>
            <p className="text-center text-sm text-muted-foreground mb-4">
              {loading ? "Verifying..." : "Touch the fingerprint sensor or look at the camera to authenticate"}
            </p>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button 
              variant="secondary" 
              onClick={cancelBiometricAuth}
              disabled={loading}
              className="sm:w-full"
            >
              Cancel
            </Button>
            <Button 
              onClick={simulateBiometricAuth} 
              disabled={loading}
              className="sm:w-full"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Fingerprint className="h-4 w-4" />
                  Authenticate
                </span>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfilePage;
