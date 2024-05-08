'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
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

export default function EventDetailPage() {
    const [showSuccessPopup, setShowSuccessPopup] = useState(false)
    const [showErrorPopup, setShowErrorPopup] = useState(false); // State for showing the error popup
    const [errorMessage, setErrorMessage] = useState("");

    const { eventId } = useParams<{ eventId: string }>();
    const id = Cookies.get('id');

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

    const price = event ? event.price : 0;

    const formatDate = (dateString: string) => {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const date = new Date(dateString);
        const dayName = daysOfWeek[date.getDay()];
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        return `${dayName}, ${day} ${month} ${year}`;
    };

    const handleBuyTicket = async () => {
        try {
            const ticketBought = await axios.post('http://localhost:6570/api/transaction', { id, eventId, price });
            console.log(ticketBought)
            setShowSuccessPopup(true);
            console.log('Ticket purchased successfully');
        } catch (error) {
            console.error('Error purchasing ticket:', error);
            setShowErrorPopup(true);
            setErrorMessage("An error occurred while purchasing the ticket. Please try again later.")
        }
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
                    <button onClick={handleBuyTicket}>Buy Ticket</button>
                    
                    {showSuccessPopup && (
                        <div className="success-popup">
                            <p>Ticket purchased successfully!</p>
                        </div>
                    )}
                    {showErrorPopup && ( // Render the error popup
                        <div className="error-popup">
                            <p>{errorMessage}</p>
                        </div>
                    )}
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

