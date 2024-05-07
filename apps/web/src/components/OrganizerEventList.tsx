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
  seats: number;
}

const OrganizerEventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const orgId = Cookies.get('id')

  //check ID sent
  console.log(orgId)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:6570/api/events/org?id=${orgId}`)

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
  if (events && events.length > 0) {
    content = (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
        {events.map((upcomingEvent) => (
          <li key={upcomingEvent.id} style={{ borderBottom: '1px solid #ccc', padding: '8px 0' }}>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{upcomingEvent.title}</p>
            <p style={{ color: '#666' }}>{upcomingEvent.date}</p>
            <p style={{ fontSize: '1rem' }}>{upcomingEvent.price}</p>
            <p style={{ fontSize: '1rem' }}>{upcomingEvent.location}</p>
            <p style={{ fontSize: '1rem' }}>{upcomingEvent.description}</p>
            <p style={{ fontSize: '1rem' }}>{upcomingEvent.seats}</p>
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
