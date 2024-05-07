"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';

interface Event {
  id: number;
  title: string;
  date: string;
  price: number,
  location: string,
  description: string,
  seats: number
}

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:6570/api/events?search=${debouncedSearchQuery}`);
        setEvents(response.data.data);
        // Check response
        console.log(response.data.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [debouncedSearchQuery]);

  // Debounce the search query
  useEffect(() => {
    const debounced = debounce(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    debounced();

    // Cleanup function to clear debounce timer
    return () => {
      debounced.cancel();
    };
  }, [searchQuery]);

  let content;
  if (events.length > 0) {
    const filteredEvents = events.filter((event) =>
      event.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );

    if (filteredEvents.length > 0) {
      content = (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {filteredEvents.map((upcomingEvent) => (
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
      content = <p style={{ color: '#666' }}>No matching events found.</p>;
    }
  } else {
    content = <p style={{ color: '#666' }}>No events found.</p>;
  }

  return (
    <div style={{ marginTop: '2rem' }}>
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginRight: '0.5rem', padding: '0.5rem' }}
        />
      </div>
      {content}
    </div>
  );
};

export default EventList;





