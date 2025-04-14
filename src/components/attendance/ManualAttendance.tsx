
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { CalendarIcon, SendIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const ManualAttendance = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [reason, setReason] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!type) {
      toast.error("Please select a comment type");
      return;
    }

    if (!reason.trim()) {
      toast.error("Please provide a comment or reason");
      return;
    }

    setIsSubmitting(true);

    try {
      // Get current user
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      if (!currentUser.id) {
        toast.error("User information not found");
        setIsSubmitting(false);
        return;
      }

      const commentDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd');

      // Create comment object
      const newComment = {
        id: Date.now(),
        userId: currentUser.id,
        userName: currentUser.name,
        userStaffId: currentUser.staffId,
        date: commentDate,
        type: type,
        comment: reason,
        timestamp: new Date().toISOString(),
        status: 'pending' // Admin can update this later
      };

      // Get existing comments
      const existingComments = JSON.parse(localStorage.getItem('staffComments') || '[]');
      existingComments.push(newComment);

      // Save back to localStorage
      localStorage.setItem('staffComments', JSON.stringify(existingComments));

      toast.success("Your comment has been submitted successfully");
      setReason("");
      setType("");
    } catch (error) {
      toast.error("Failed to submit comment");
      console.error("Comment submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit Comment</CardTitle>
        <CardDescription>
          Provide reason for absence, late arrival or other attendance issues
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="comment-type" className="text-sm font-medium">Comment Type</label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger id="comment-type">
                <SelectValue placeholder="Select a comment type" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="absence">Absence</SelectItem>
                <SelectItem value="late">Late Arrival</SelectItem>
                <SelectItem value="early-departure">Early Departure</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="date" className="text-sm font-medium">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="w-full justify-start text-left font-normal"
                  id="date"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="comment" className="text-sm font-medium">Comment</label>
            <Textarea
              id="comment"
              placeholder="Please explain your reason here..."
              className="h-24 resize-none"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          <SendIcon className="mr-2 h-4 w-4" />
          Submit Comment
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ManualAttendance;
