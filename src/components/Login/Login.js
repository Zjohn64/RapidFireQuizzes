import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../authStyles.css';
import { useAuth} from '../authContext';

const Login = () => {
  const [formData, setFormData] = useState({ identifier: '', password: '' });
  const navigate = useNavigate();
  const [message, setMessage] = useState({ general: "" });
  const { authState, setAuthState } = useAuth();
  const location = useLocation();
  const fromRegistration = location.state?.fromRegistration;


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ general: "" });
  
    try {
      const response = await axios.post("/api/users/login", formData);
      console.log("Login successful:", response);
  
      setAuthState({ user: response.data.user, isAuthenticated: true });

      console.log("Updated authState after login:", authState);
  
      if (fromRegistration) {
        navigate('/');
      } else {
        navigate(-1);
      }
    } catch (err) {
      console.error(err);
      if (err.response) {
        const errorData = err.response.data;
  
        if (errorData.message) {
          setMessage({ general: errorData.message });
        }
      } else {
        console.error("Error during login:", err);
      }
      setFormData({ identifier: '', password: '' });
    }
  };

  return (
    <div className="reg-card">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        {message.general && (
          <div className="message error">{message.general}</div>
        )}
        <label>
          Username / Email:
            <input
                type="text"
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
                required
            />
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
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default Login;