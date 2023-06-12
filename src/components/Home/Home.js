import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <ul className="home-list">
        <li>
          <Link to="/user-registration">User Registration</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/create-quiz">Create Quiz</Link>
        </li>
        <li>
          <Link to="/edit-questions">Edit Questions</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;