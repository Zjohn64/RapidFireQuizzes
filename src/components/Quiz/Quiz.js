import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../authContext';
import './Quiz.css';

const Quiz = () => {
  const { authState } = useAuth();
  const { user, isAuthenticated } = authState;  
  const [quiz, setQuiz] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [quizStarted, setQuizStarted] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();  // initialize useNavigate
  
  useEffect(() => {
    // Here, fetch the quiz data from your API using axios.get(), then set the quiz state.
    // Also, set the loading state to false when the quiz data has been fetched.
    // This is just a placeholder for now, replace 'quizId' with the actual quiz ID.
    const fetchQuiz = async (quizId) => {
      const response = await axios.get(`/api/quiz/${quizId}`);
      setQuiz(response.data);
      setIsLoading(false);
    };
    
    fetchQuiz('quizId');
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location.pathname } });
    }
  }, [isAuthenticated, navigate, location.pathname]);

  const handleQuizStart = () => {
    setQuizStarted(true);
  };

  console.log('Quiz location:', location);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!quizStarted) {
    return (
      <div className="popup">
        <h2>Welcome to {quiz.title}</h2>
        <p>
          Answer the questions as quickly as possible to score points.<br/>
          You have 15 seconds to answer each question.<br/>
          This game GREATLY REWARDS speed. The faster you answer, the more points you get. Good luck!
        </p>
        <button onClick={handleQuizStart}>Start Quiz!</button>
      </div>
    );
  }

  // The quiz has started, render the quiz UI
  return (
    <div>
      {/* Quiz UI goes here */}
    </div>
  );
}

export default Quiz;