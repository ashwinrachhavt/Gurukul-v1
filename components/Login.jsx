"use client";

import React, { useState } from 'react';
import '@styles/globals.css';

const Login = () => {
  const [email, setEmail] = useState('justin@xano.com');
  const [password, setPassword] = useState('SecurityCloseYourEyes');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [responseStatus, setResponseStatus] = useState(null);
  const [responseDetails, setResponseDetails] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Received authToken:', data.authToken);
        setResponseStatus(response.status);
        setResponseDetails(JSON.stringify(data, null, 2));
        setSuccess(true);
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData);
        setResponseStatus(response.status);
        setError(errorData.message || 'An error occurred during the login process.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('An error occurred while logging in. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-md">
      <h1 className="text-3xl font-bold mb-6">Xano Login Component</h1>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
          Email
        </label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>

      {success && (
        <div className="mt-4">
          <p className="font-bold">The API request was successful! Here are the details:</p>
          <p>HTTP Status Code: {responseStatus}</p>
          <textarea
            className="details-textarea"
            value={responseDetails}
            readOnly
          ></textarea>
        </div>
      )}

      {error && (
        <div className="mt-4">
          <p className="font-bold">The API request had errors! Here are the details:</p>
          <p>Error Message: {error}</p>
          <p>HTTP Status Code: {responseStatus}</p>
          <textarea
            className="details-textarea"
            value={responseDetails}
            readOnly
          ></textarea>
        </div>
      )}
    </div>
  );
};

export default Login;