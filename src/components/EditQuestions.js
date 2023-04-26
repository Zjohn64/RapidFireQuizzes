import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import './EditQuestions.css';

const EditQuestions = (props) => {
  const { id } = useParams();
  const location = useLocation();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`/api/quizzes/${id}`);
        setQuestions(response.data.questions);
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };

    if (id && !location.state) {
      fetchQuiz();
    } else if (location.state && location.state.questions) {
      setQuestions(location.state.questions);
    }
  }, [id, location.state]);

  const difficultyLookup = {
    1: "Easy",
    1.2: "Intermediate",
    1.5: "Hard",
    2.0: "Expert",
  };

  return (
    <div className="container">
      {questions.map((question, index) => (
        <div key={index} className="question-box">
          <h3>Question {index + 1}</h3>
          <p>Question Text: {question.questionText}</p>
          <p>Answers:</p>
          <ul>
            {question.answers.map((answer, idx) => (
              <li key={idx}>{answer}</li>
            ))}
          </ul>
          <p>Correct Answer: {question.correctAnswer}</p>
          <p>Difficulty: {difficultyLookup[question.difficulty]}</p>
        </div>
      ))}
    </div>
  );
};

export default EditQuestions;