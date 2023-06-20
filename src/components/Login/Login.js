import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess, logout } from '../../Redux/actions'; // adjust the path as needed
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
  const from = location.state?.from || "/";
  const hardcodedFrom = "/quiz/648a408d613c5ca24fcf9019";
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Updated authState after login:", authState);
  }, [authState]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    console.log('Login location:', location);
    console.log("Login location state:", location.state);
  }, []);

  const handleLogin = async () => {
    // Perform login operations...
    if (loginSuccessful) {
      dispatch(loginSuccess(user)); // dispatch the action with the logged-in user
    }
  };

  const handleLogout = async () => {
    // Perform logout operations...
    if (logoutSuccessful) {
      dispatch(logout()); // dispatch the logout action
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Location state on submit:", location.state);
    setMessage({ general: "" });

    try {
      const response = await axios.post("/api/users/login", formData);

      const newUserState = { user: response.data.user, isAuthenticated: true };
      setAuthState(newUserState);

      console.log("Updated authState after login:", newUserState);

      if (fromRegistration) {
        navigate('/', { state: newUserState });
      } else {
        navigate(from, { state: newUserState });
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