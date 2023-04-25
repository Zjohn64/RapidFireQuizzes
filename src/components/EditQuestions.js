import React from 'react';
import { useLocation } from 'react-router-dom';
import ('./EditQuestions.css')


const EditQuestions = (props) => {
  const location = useLocation();
  const questions = location.state.questions;

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
          <p>Difficulty: {question.difficulty}</p>
        </div>
      ))}
    </div>
  );
};

export default EditQuestions;