"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setLoggedIn(true);

      let roling = Cookies.get('role');
      console.log(roling)
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:6570/api/auth/login', { email, password });
      const { token } = response.data;

      // //check response
      // // console.log(response.data)
      // // console.log(token)
      // console.log(response.data)

      Cookies.set('token', token);
      Cookies.set('role', response.data.role)
      Cookies.set('id', response.data.id)

      setLoggedIn(true);
      window.location.reload();

    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('role');
    setLoggedIn(false);
    window.location.reload();
  };

  return (
    <>
      {loggedIn ? (
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
        </>
      )}
    </>
  );
};

export default LoginForm;
