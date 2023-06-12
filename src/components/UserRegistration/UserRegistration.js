import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../authStyles.css'
const UserRegistration = () => {
    const navigate = useNavigate();
    const [isSuccess, setIsSuccess] = useState(false);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
      
    const [message, setMessage] = useState('');

    const [errorMessages, setErrorMessages] = useState({
      username: "",
      email: "",
    });
    
    const [highlightErrors, setHighlightErrors] = useState({
      username: false,
      email: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const isValidPassword = (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasDigit = /\d/.test(password);
      
        return (
          password.length >= minLength && hasUpperCase && hasLowerCase && hasDigit
        );
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      if (formData.password !== formData.confirmPassword) {
        setMessage("Passwords do not match");
        setIsSuccess(false);
        return;
      }
    
      if (!isValidPassword(formData.password)) {
        setMessage("Invalid password. Please ensure your password meets the requirements.");
        setIsSuccess(false);
        return;
      }
    
      try {
        const response = await axios.post("/api/users/register", formData);
        setMessage(response.data.message);
        setIsSuccess(true);

        setTimeout(() => {
          navigate('/login', { state: { fromRegistration: true } });s
        }, 500);
      } catch (error) {
        console.error("Error during registration:", error);
        setIsSuccess(false);
      
        if (error && error.response && error.response.status === 409) {
          if (error.config && error.config.data) {
            const data = JSON.parse(error.config.data);
            if (data.username && data.email) {
              setHighlightErrors({ username: true, email: true });
              setErrorMessages({
                username: "Username taken",
                email: "Email Already Registered: Please Login",
              });
            }
          }
        } else {
          setMessage("An unexpected error occurred. Please try again.");
        }
      }
    };

    return (
      <div className="reg-card">
        {message && (
          <div
            className={`message ${isSuccess ? "success" : "error"}`}
          >
            {message}
          </div>
        )}
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className={highlightErrors.username ? "error" : ""}
            />
            {errorMessages.username && <p className="error-message">{errorMessages.username}</p>}
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={highlightErrors.email ? "error" : ""}
            />
            {errorMessages.email && <p className="error-message">{errorMessages.email}</p>}
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Confirm Password:
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Register</button>
        </form>
        <div className="login">
          Already Registered?{' '}
          <Link to="/login" className="login-link">
            Log in
          </Link>
        </div>
      </div>
    );
};

export default UserRegistration;