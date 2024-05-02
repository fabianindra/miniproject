"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string | null>(null); // Changed type to allow null
  const [loggedOut, setLoggedOut] = useState(false);

  useEffect(() => {
    const storedToken = Cookies.get('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post<{ token: string }>('http://localhost:6570/api/auth/login', { email, password });
      const { token } = response.data;
      setToken(token);
      Cookies.set('token', token, { expires: 1 });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = () => {
    setToken(null);
    Cookies.remove('token');
    setLoggedOut(true);
  };

  const axiosWithAuth = axios.create({
    baseURL: 'http://localhost:6570/api/',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    },
  });

  return (
    <>
      {token && !loggedOut ? (
        <div>
          <p>You are logged in!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <hr />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <hr />
            <button type="submit">Login</button>
          </form>
          {loggedOut && <p>You are logged out!</p>}
        </>
      )}
    </>
  );
};

export default LoginForm;





