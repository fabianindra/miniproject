"use client"

import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

interface FormData {
  title: string;
  date: string;
}

const EventForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    date: '',
  });

  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const id = Cookies.get('id');
  const title = formData.title;
  const date = formData.date;

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    if (month.length === 1) {
      month = '0' + month;
    }
    if (day.length === 1) {
      day = '0' + day;
    }
    return `${year}-${month}-${day}`;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = name === 'date' ? formatDate(value) : value;
    setFormData((prevState) => ({ ...prevState, [name]: newValue }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {

        //check request sent
        console.log('Request being sent to backend:', { id, title, date });
        
      const response = await axios.post('http://localhost:6570/api/events', { id, title, date } );

      if (response) {setSuccessMessage('Registration successful.')}
      else {setErrorMessage('')};
    } catch (error) {
      console.error('Registration failed:', error);
      setSuccessMessage('');
      setErrorMessage('Registration failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <br />
      <h3>REGISTER EVENT</h3>
      <br />
      <div>
        <label htmlFor="title">Event Title: </label>
        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="date">Date of Event:   </label>
        <input type="date" id="date" name="date" value={formData.date.toString()} onChange={handleChange} />
      </div>
    
      <br />
      <button type="submit" style={{ fontSize: '1.2em', padding: '10px 20px' }}>Register</button>
    </form>
  );
};

export default EventForm;