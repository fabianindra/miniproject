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

interface Comment {
    id: number;
    comment: string;
    userId: number;
    eventId: number;
    username: string;
    createdAt: string;
  }

export default function EventDetailPage() {
    const [showSuccessPopup, setShowSuccessPopup] = useState(false)
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState("");

    const { eventId } = useParams<{ eventId: string }>();
    const id = Cookies.get('id');

    const [event, setEvent] = useState<Event | null>(null);
    const idSingular = parseInt(eventId);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:6570/api/events/details?id=${idSingular}`);
                setEvent(response.data.data);

                const commentsResponse = await axios.get(`http://localhost:6570/api/comment?eventId=${idSingular}`);
                setComments(commentsResponse.data.data);
            } catch (error) {
                console.error('Error fetching event details:', error);
                setComments([]);
            }
        };
        fetchData();
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
            setSuccessMessage('Ticket purchased successfully!');
            console.log('Ticket purchased successfully');

        } catch (error) {
            console.error('Error purchasing ticket:', error);
            setShowErrorPopup(true);
            setErrorMessage("An error occurred while purchasing the ticket. Please try again later.")
        }
    };

    const handleSubmitComment = async () => {
        try {
            await axios.post('http://localhost:6570/api/comment/submit', { id, eventId, comment: newComment });
            const commentsResponse = await axios.get(`http://localhost:6570/api/comment?eventId=${idSingular}`);
            setComments(commentsResponse.data.data);
            setSuccessMessage('Comment submitted successfully!');

        } catch (error) {
            console.error('Error submitting comment:', error);
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
                    <button onClick={() => { handleBuyTicket(); window.location.reload(); }}>Buy Ticket</button>

                    {/* {successMessage && (
                        <div className="success-message">
                            <p>{successMessage}</p>
                        </div>
                    )}
                    
                    {showSuccessPopup && (
                        <div className="success-popup">
                            <p>Ticket purchased successfully!</p>
                        </div>
                    )}
                    {showErrorPopup && (
                        <div className="error-popup">
                            <p>{errorMessage}</p>
                        </div>
                    )} */}

                    <br />
                    <br />
                    <br />
                    <br />
                    <h2>Comments</h2>
                        {comments !== undefined ? (
                            comments.length > 0 ? (
                                comments
                                    .sort((a, b) => {
                                        const createdAtA = new Date(a.createdAt) as any;
                                        const createdAtB = new Date(b.createdAt) as any;
                                        return createdAtB - createdAtA;
                                    })
                                    .slice(0, 3)
                                    .map((comment) => (
                                        <div key={comment.id}>
                                            <p style={{ marginBottom: '50px' }}>{comment.username} : {comment.comment}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No comments found.</p>
                                )
                            ) : (
                                <p>Loading comments...</p>
                                )}

                    {id && (
                        <div>
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Write your comment here"
                            />
                            <br />
                            <button onClick={handleSubmitComment}>Submit Comment</button>
                        </div>
                    )}
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

