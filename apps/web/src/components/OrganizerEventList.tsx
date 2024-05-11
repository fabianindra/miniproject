"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

interface Event {
  id: number;
  title: string;
  date: string;
  price: number;
  location: string;
  description: string;
  seat: number;
}

const OrganizerEventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const orgId = Cookies.get('id')

  const formatDate = (dateString: string) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    const dayName = daysOfWeek[date.getDay()];
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${dayName}, ${day} ${month} ${year}`;
};

  //check ID sent
  console.log(orgId)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:6570/api/events/org?id=${orgId}`)

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


  const handleDeleteEvent = async (eventId: number) => {
    try {
      await axios.delete(`http://localhost:6570/api/events/delete/${eventId}`);
      // Update the state to remove the deleted event
      setEvents(events.filter(event => event.id !== eventId));

      window.location.reload();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };


  let content;
  if (events && events.length > 0) {
    content = (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
        {events.map((upcomingEvent) => (
          <li key={upcomingEvent.id} style={{ borderBottom: '1px solid #ccc', padding: '8px 0' }}>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{upcomingEvent.title}</p>
            <p style={{ color: '#666' }}>{formatDate(upcomingEvent.date)}</p>
            <p style={{ fontSize: '1rem' }}>IDR {upcomingEvent.price}</p>
            <p style={{ fontSize: '1rem' }}>{upcomingEvent.location}</p>
            <p style={{ fontSize: '1rem' }}>{upcomingEvent.description}</p>
            <p style={{ fontSize: '1rem' }}>{upcomingEvent.seat}</p>
            <button onClick={() => handleDeleteEvent(upcomingEvent.id)}>Delete Event</button>
          </li>
        ))}
      </ul>
    );
  } else {
    content = <p style={{ color: '#666' }}>No events found.</p>;
  }

  return (
    <div style={{ marginTop: '2rem' }}>
      {content}
    </div>
  );
};

export default OrganizerEventList;
