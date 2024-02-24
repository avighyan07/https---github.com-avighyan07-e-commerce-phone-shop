// AuthForm.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css'; // Import the common CSS file

const AuthForm = ({ type }) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;

    try {
      const response = await fetch(`http://localhost:5000/${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const json = await response.json();

      if (response.ok) {
        console.log(`User ${type === 'signup' ? 'created' : 'signed in'} successfully`);
        navigate('/');
      } else if (!json.success && json.error === 'duplicate email') {
        console.error('Duplicate email. Redirecting to login page.');
        navigate('/login');
      } else {
        console.error(`${type} failed:`, json.message);
        alert(`${type} failed. Please check your input and try again.`);
      }
    } catch (error) {
      console.error(`Error during ${type} submission:`, error);
      alert(`An error occurred during ${type} submission. Please try again.`);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        {type === 'signup' && (
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="input-field"
              value={credentials.name}
              onChange={onChange}
              id="name"
              name="name"
              aria-describedby="nameHelp"
              required
            />
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="input-field"
            value={credentials.email}
            onChange={onChange}
            id="email"
            name="email"
            aria-describedby="emailHelp"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="input-field"
            value={credentials.password}
            onChange={onChange}
            name="password"
            id="password"
            required
          />
        </div>

        <button type="submit" className="submit-button">
          {type === 'signup' ? 'Create New Account' : 'Log In'}
        </button>
      </form>
      <hr />
    </div>
  );
};

export default AuthForm;
