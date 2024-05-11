"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Event {
  id: string;
  title: string;
  date: string;
  price: number;
  location: string;
  description: string;
  seat: number;
}

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  const formatDate = (dateString: string) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    const dayName = daysOfWeek[date.getDay()];
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${dayName}, ${day} ${month} ${year}`;
};

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:6570/api/events`);
        
        const sortedEvents = response.data.data.sort((a: Event, b: Event) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
        setEvents(sortedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div style={{ marginTop: 'none' }}>
      {events.length > 0 ? (
        <ul style={{ listStyleType: 'none', padding: 0}}>
          {events.map((upcomingEvent) => (
            <li key={upcomingEvent.id} style={{ borderBottom: '1px solid #ccc', padding: '8px 0' }}>
              <Link href={`/events/${[upcomingEvent.id]}`} style={{ textDecoration: 'none', color:'white' }}>
                <p style={{ textDecoration: 'none', fontSize: '2rem', fontWeight: 'bold' }}>{upcomingEvent.title}</p>
                <p style={{ textDecoration: 'none', fontSize: '1rem' }}>{formatDate(upcomingEvent.date)}</p>
                <p style={{ fontSize: '1rem', textDecoration: 'none', fontWeight: 'bold' }}>{upcomingEvent.location}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ color: '#666' }}>No events found.</p>
      )}
    </div>
  );
};

export default EventList;






