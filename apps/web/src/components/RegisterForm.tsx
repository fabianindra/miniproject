"use client"

import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface FormData {
  email: string;
  username: string;
  password: string;
  name: string;
  code: string;
  refererCode: string;
}

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    username: '',
    password: '',
    name: '',
    code: '',
    refererCode: '',
  });

  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:6570/api/auth/register', formData);
      console.log(response.data);
      setSuccessMessage('Registration successful.');
      setErrorMessage('');
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
      <div>
        <label htmlFor="email">Email:   </label>
        <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="username">Username: </label>
        <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input type="text" id="password" name="password" value={formData.password} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="name">Name: </label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="code">Code: </label>
        <input type="text" id="code" name="code" value={formData.code} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="refererCode">Referer Code:  </label>
        <input type="text" id="refererCode" name="refererCode" value={formData.refererCode} onChange={handleChange} />
      </div>
      
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;

