
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, InfoIcon } from "lucide-react";

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedView, setSelectedView] = useState("month");

  // Sample events data
  const events = [
    { 
      id: 1, 
      title: "Staff Meeting", 
      date: new Date(2025, 3, 12), 
      type: "meeting"
    },
    { 
      id: 2, 
      title: "Professional Development Day", 
      date: new Date(2025, 3, 15), 
      type: "training"
    },
    { 
      id: 3, 
      title: "Parent-Teacher Conference", 
      date: new Date(2025, 3, 18), 
      type: "conference"
    },
    { 
      id: 4, 
      title: "Department Planning", 
      date: new Date(2025, 3, 20), 
      type: "meeting"
    },
    { 
      id: 5, 
      title: "School Holiday", 
      date: new Date(2025, 3, 25), 
      type: "holiday"
    },
  ];

  // Function to check if a date has events
  const hasEvent = (day: Date) => {
    return events.some(event => 
      event.date.getDate() === day.getDate() && 
      event.date.getMonth() === day.getMonth() && 
      event.date.getFullYear() === day.getFullYear()
    );
  };

  // Get events for the selected date
  const selectedDateEvents = date 
    ? events.filter(event => 
        event.date.getDate() === date.getDate() && 
        event.date.getMonth() === date.getMonth() && 
        event.date.getFullYear() === date.getFullYear()
      ) 
    : [];

  // Function to get event type color
  const getEventTypeColor = (type: string) => {
    switch(type) {
      case "meeting": return "bg-blue-500";
      case "training": return "bg-green-500";
      case "conference": return "bg-purple-500";
      case "holiday": return "bg-red-500";
      default: return "bg-gray-500";
    }
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
                      <p className="text-sm text-muted-foreground">
                        {event.date.toLocaleTimeString('en-US', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
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
