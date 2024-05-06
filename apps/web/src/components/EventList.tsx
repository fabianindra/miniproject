"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Event {
  id: number;
  title: string;
  date: string;
}

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:6570/api/events');
        setEvents(response.data.data);
        // Check response
        console.log(response.data.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  let content;
  if (events.length > 0) {
    content = (
      <ul>
        {events.map((upcomingEvent) => (
          <li key={upcomingEvent.id} className="border-b py-2">
            <p className="text-xl">{upcomingEvent.title}</p>
            <p className="text-white-600">{upcomingEvent.date}</p>
            {/* Add more event details here */}
          </li>
        ))}
      </ul>
    );
  } else {
    content = <p className="text-white-600">No events found.</p>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Event List</h2>
      {content}
    </div>
  );
};

export default EventList;
