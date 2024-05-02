"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Event {
  id: number;
  name: string;
  date: string;
  // Add more properties as needed
}

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Fetch events from the backend API
        const response = await axios.get('/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Event List</h2>
      {events.length > 0 ? (
        <ul>
          {events.map((event) => (
            <li key={event.id} className="border-b py-2">
              <p className="text-xl">{event.name}</p>
              <p className="text-white-600">{event.date}</p>
              {/* Add more event details here */}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-whitw-600">No events found.</p>
      )}
    </div>
  );
};

export default EventList;
