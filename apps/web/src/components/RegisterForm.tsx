"use client"

import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface FormData {
  email: string;
  username: string;
  password: string;
  name: string;
  refererCode: string;
  role: string;
}

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    username: '',
    password: '',
    name: '',
    refererCode: '',
    role: '',
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
        <label htmlFor="name">Name: </label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
      </div>
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
      <br />
      <p>if you have Referral Code: *leave empty if you dont have Referral Code*</p>
      <div>
        <label htmlFor="refererCode">Referral Code:  </label>
        <input type="text" id="refererCode" name="refererCode" value={formData.refererCode} onChange={handleChange} />
      </div>
      <br />
      <p>Role: *leave empty if you dont have access*</p>
      <div>
        <label htmlFor="role">Role:  </label>
        <input type="text" id="role" name="role" value={formData.role} onChange={handleChange} />
      </div>
      <br />
      <button type="submit" style={{ fontSize: '1.2em', padding: '10px 20px' }}>Register</button>
    </form>
  );
};

export default RegisterForm;

