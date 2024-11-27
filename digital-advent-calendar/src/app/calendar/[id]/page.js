// app/calendar/[id]/page.js
"use client"
import { useState, useEffect, use } from 'react';
import Calendar from '@/app/components/Calendar';

export default function CalendarPage({ params }) {
  const { id } = use(params); // Access the dynamic 'id' from URL params
  const [calendar, setCalendar] = useState(null);

  useEffect(() => {
    // Check if we are on the client side before using localStorage
    if (typeof window !== "undefined") {
      const calendars = JSON.parse(localStorage.getItem('calendars')) || [];
      const selectedCalendar = calendars.find(calendar => calendar.id === parseInt(id));

      if (selectedCalendar) {
        setCalendar(selectedCalendar);
      } else {
        console.log('Calendar not found');
      }
    }
  }, [id]);

  if (!calendar) {
    return <p>Loading...</p>; // You can show a loading state while fetching
  }

  console.log("Calendar", calendar)

  return (
    <div>
      {/* Pass the calendar data to your Calendar component */}
      <Calendar calendar={calendar} />
    </div>
  );
}
