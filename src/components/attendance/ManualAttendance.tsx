
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, MessageSquareIcon } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const ManualAttendance = () => {
  const [date, setDate] = useState<Date>();
  const [status, setStatus] = useState("");
  const [reason, setReason] = useState("");
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !status) {
      toast.error("Please fill in all required fields!");
      return;
    }
    
    toast.success("Attendance comment has been submitted successfully!");
    
    // Reset form after submission
    setDate(undefined);
    setStatus("");
    setReason("");
  };

  const handleCommentSubmit = () => {
    if (!reason.trim()) {
      toast.error("Please provide a reason");
      return;
    }
    
    toast.success("Your comment has been submitted to admin");
    setIsCommentOpen(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit Attendance Comment</CardTitle>
        <CardDescription>
          Provide a reason for your absence, lateness, or early departure
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date <span className="text-red-500">*</span></Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal"
                    id="date"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Attendance Status <span className="text-red-500">*</span></Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger id="status" className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="late">Late</SelectItem>
                  <SelectItem value="absent">Absent</SelectItem>
                  <SelectItem value="leave">Requesting Leave</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Dialog open={isCommentOpen} onOpenChange={setIsCommentOpen}>
            <DialogTrigger asChild>
              <Button className="w-full" variant="outline">
                <MessageSquareIcon className="h-4 w-4 mr-2" />
                Add Comment or Reason
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Comment</DialogTitle>
                <DialogDescription>
                  Provide details about your attendance status.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="comment-reason">Reason / Comment</Label>
                  <Textarea
                    id="comment-reason"
                    placeholder="Please explain why you were late, absent, or need leave..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={5}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCommentOpen(false)}>Cancel</Button>
                <Button onClick={handleCommentSubmit}>Submit Comment</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Button type="button" onClick={handleSubmit} className="w-full">Submit</Button>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        <p>Fields marked with <span className="text-red-500">*</span> are required. Comments are logged and require admin approval.</p>
      </CardFooter>
    </Card>
  );
};

export default ManualAttendance;
