



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
const Login = () => {
    const navigate = useNavigate();
    
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const { name, email, password } = credentials;
      
      try {
        const response = await fetch('http://localhost:4005/api/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        const json = await response.json();

        if (response.ok) {
          console.log('User signed in  successfully');
          navigate('/'); // Redirect to the login page
      }  else {
       // navigate('/signup');
          console.error('Login failed:', json.message);
          alert('Login failed. Please check your input and try again.');
      }} catch (error) {
        console.error('Error during form submission:', error);
        alert('An error occurred during form submission. Please try again.');
    } 
  };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        
    };

    return (
      <div className="login-container">
      <form onSubmit={handleSubmit}>
        
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
        Log In
        </button>
      </form>
      <hr />
    </div>
    );
};

export default Login

