
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, InfoIcon, PlusIcon } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const meetingSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
  type: z.string().min(1, "Please select a meeting type"),
  description: z.string().optional(),
});

interface Event {
  id: number;
  title: string;
  date: Date;
  time: string;
  type: string;
  description?: string;
}

interface CalendarPageProps {
  currentUser?: { role: 'admin' | 'staff' } | null;
}

const CalendarPage = ({ currentUser }: CalendarPageProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedView, setSelectedView] = useState("month");
  const [events, setEvents] = useState<Event[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // Load events from localStorage
    const savedEvents = localStorage.getItem('staffSyncEvents');
    if (savedEvents) {
      const parsedEvents = JSON.parse(savedEvents);
      // Convert string dates back to Date objects
      const eventsWithDates = parsedEvents.map((event: any) => ({
        ...event,
        date: new Date(event.date)
      }));
      setEvents(eventsWithDates);
    } else {
      // Set default events if none exist
      const defaultEvents = [
        { 
          id: 1, 
          title: "Staff Meeting", 
          date: new Date(2025, 3, 12), 
          time: "10:00 AM",
          type: "meeting",
          description: "General staff updates and announcements"
        },
        { 
          id: 2, 
          title: "Professional Development Day", 
          date: new Date(2025, 3, 15), 
          time: "09:00 AM",
          type: "training",
          description: "Full-day workshop on new teaching methodologies"
        },
        { 
          id: 3, 
          title: "Parent-Teacher Conference", 
          date: new Date(2025, 3, 18), 
          time: "04:00 PM",
          type: "conference",
          description: "End of term parent meetings"
        },
        { 
          id: 4, 
          title: "Department Planning", 
          date: new Date(2025, 3, 20), 
          time: "11:30 AM",
          type: "meeting",
          description: "Curriculum planning for next semester"
        },
        { 
          id: 5, 
          title: "School Holiday", 
          date: new Date(2025, 3, 25), 
          time: "All day",
          type: "holiday",
          description: "School closed for spring break"
        },
      ];
      setEvents(defaultEvents);
      // Save default events to localStorage
      saveEventsToLocalStorage(defaultEvents);
    }
  }, []);

  // Save events to localStorage whenever they change
  useEffect(() => {
    if (events.length > 0) {
      saveEventsToLocalStorage(events);
    }
  }, [events]);

  const saveEventsToLocalStorage = (eventsToSave: Event[]) => {
    localStorage.setItem('staffSyncEvents', JSON.stringify(eventsToSave));
  };

  const form = useForm<z.infer<typeof meetingSchema>>({
    resolver: zodResolver(meetingSchema),
    defaultValues: {
      title: "",
      date: "",
      time: "",
      type: "",
      description: "",
    },
  });

  const hasEvent = (day: Date) => {
    return events.some(event => 
      event.date.getDate() === day.getDate() && 
      event.date.getMonth() === day.getMonth() && 
      event.date.getFullYear() === day.getFullYear()
    );
  };

  const selectedDateEvents = date 
    ? events.filter(event => 
        event.date.getDate() === date.getDate() && 
        event.date.getMonth() === date.getMonth() && 
        event.date.getFullYear() === date.getFullYear()
      ) 
    : [];

  const getEventTypeColor = (type: string) => {
    switch(type) {
      case "meeting": return "bg-blue-500";
      case "training": return "bg-green-500";
      case "conference": return "bg-purple-500";
      case "holiday": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const handleAddMeeting = (values: z.infer<typeof meetingSchema>) => {
    const newEvent: Event = {
      id: events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1,
      title: values.title,
      date: new Date(values.date),
      time: values.time,
      type: values.type,
      description: values.description
    };

    setEvents([...events, newEvent]);
    toast.success("Meeting scheduled successfully");
    form.reset();
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Calendar</h2>
        <p className="text-muted-foreground">
          View and manage schedules and events
        </p>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold">April 2025</h3>
        </div>
        <div className="flex gap-2">
          <Select value={selectedView} onValueChange={setSelectedView}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
            </SelectContent>
          </Select>
          
          {currentUser?.role === 'admin' && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <PlusIcon className="h-4 w-4" />
                  Schedule Meeting
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Schedule New Meeting</DialogTitle>
                  <DialogDescription>
                    Create a new meeting or event for the staff calendar.
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleAddMeeting)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meeting Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Staff Meeting" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Time</FormLabel>
                            <FormControl>
                              <Input type="time" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meeting Type</FormLabel>
                          <FormControl>
                            <select 
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              {...field}
                            >
                              <option value="">Select meeting type</option>
                              <option value="meeting">Meeting</option>
                              <option value="training">Training</option>
                              <option value="conference">Conference</option>
                              <option value="holiday">Holiday</option>
                              <option value="other">Other</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Provide details about the meeting" 
                              className="resize-none" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <DialogFooter className="mt-6">
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Schedule Meeting</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Schedule Calendar</CardTitle>
            <CardDescription>
              View and manage staff schedules and events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              modifiers={{
                hasEvent: (day) => hasEvent(day),
              }}
              modifiersStyles={{
                hasEvent: { 
                  fontWeight: 'bold',
                  textDecoration: 'underline',
                  color: 'var(--primary)',
                },
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Events</CardTitle>
            <CardDescription>
              {date ? date.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              }) : "Select a date"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedDateEvents.length > 0 ? (
              <div className="space-y-4">
                {selectedDateEvents.map(event => (
                  <div key={event.id} className="flex items-start gap-3 p-3 border rounded-md">
                    <Badge className={getEventTypeColor(event.type)}>{event.type}</Badge>
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">{event.time}</p>
                      {event.description && (
                        <p className="text-sm mt-1">{event.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-40 flex-col gap-2">
                <InfoIcon className="h-8 w-8 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground">No events scheduled for this date.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalendarPage;
