'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';

interface Event {
  id: number;
  title: string;
  date: string;
  price: number;
  location: string;
  description: string;
  seat: number;
}

export default function EventDetailPage() {
    const { eventId } = useParams<{ eventId: string }>();

    const [event, setEvent] = useState<Event | null>(null);
    const idSingular = parseInt(eventId);

    useEffect(() => {
        const fetchOneEvent = async () => {
            try {
                const response = await axios.get(`http://localhost:6570/api/events/details?id=${idSingular}`);
                setEvent(response.data.data);
            } catch (error) {
                console.error('Error fetching event details:', error);
            }
        };

        fetchOneEvent();
    }, [idSingular]);

    const formatDate = (dateString: string) => {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const date = new Date(dateString);
        const dayName = daysOfWeek[date.getDay()];
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        return `${dayName}, ${day} ${month} ${year}`;
    };

    return (
        <div>
            {event ? (
                <>
                    <h1>{event.title}</h1>
                    <p>{formatDate(event.date)}</p>
                    <br />
                    <p>Price: {event.price}</p>
                    <hr />
                    <p>Location: {event.location}</p>
                    <p>Description: {event.description}</p>
                    <br />
                    <p>Available Seats: {event.seat}</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

