import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './EditQuestions.css';

const EditQuestions = (props) => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [editing, setEditing] = useState(null);
  const [modified, setModified] = useState(false);
  const [quizInfo, setQuizInfo] = useState({ name: '', author: '', genre: '', categories: [] });

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`/api/quizzes/${id}`);
        setQuestions(response.data.questions);
        setQuizInfo({
          name: response.data.name,
          author: response.data.author,
          genre: response.data.genre,
          categories: response.data.categories,
        });
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

  const difficultyMap = {
    'Easy': 1.0,
    'Intermediate': 1.2,
    'Hard': 1.5,
    'Expert': 2.0,
  };

  const handleEdit = (index) => {
    setEditing(index);
  };

  const handleSave = async (questionIndex) => {
    if (modified) {
      try {
        const updatedQuiz = await axios.put(`/api/quizzes/${id}`, {
          questions: questions,
        });
  
        setQuestions(updatedQuiz.data.questions);
        setModified(false);
        setEditing(false);
      } catch (error) {
        console.error('Error updating quiz:', error);
      }
    } else {
      setEditing(false);
    }
  };

  const handleCancel = () => {
    setEditing(null);
  };

  const handleChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
    setModified(true);
  };

  return (
    <div className="container">
      <div className="info-box">
        <h2>{quizInfo.name}</h2>
        <p>Author: {quizInfo.author} - Edit Questions</p>
        <p>Genre: {quizInfo.genre}</p>
        <p>Categories: {quizInfo.categories.join(', ')}</p>
      </div>
      {questions.map((question, index) => (
        <div key={index} className="question-box">
          {editing === index ? (
            <>
              <h3>Question {index + 1}</h3>
              <label>
                Question Text:
                <input
                  type="text"
                  value={question.questionText}
                  onChange={(e) =>
                    handleChange(index, 'questionText', e.target.value)
                  }
                />
              </label>
              <p>Answers:</p>
              <ul>
                {question.answers.map((answer, idx) => (
                  <li key={idx}>
                    <input
                      type="text"
                      value={answer}
                      onChange={(e) =>
                        handleChange(
                          index,
                          'answers',
                          question.answers.map((a, i) =>
                            i === idx ? e.target.value : a
                          )
                        )
                      }
                    />
                  </li>
                ))}
              </ul>
              <label>
                Correct Answer:
                <select
                  value={question.correctAnswer}
                  onChange={(e) =>
                    handleChange(index, 'correctAnswer', e.target.value)
                  }
                >
                  {question.answers.map((answer, idx) => (
                    <option key={idx} value={answer}>
                      {answer}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Difficulty:
                <select
                  value={difficultyLookup[question.difficulty]}
                  onChange={(e) =>
                    handleChange(index, 'difficulty', difficultyMap[e.target.value])
                  }
                >
                  {Object.entries(difficultyLookup)
                    .sort(([keyA], [keyB]) => keyA - keyB)
                    .map(([key, value]) => (
                    <option key={key} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </label>
              <div>
                <button onClick={() => handleSave(index)}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
              </div>
              </>
          ) : (
            <>
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
              <button onClick={() => handleEdit(index)}>Edit</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default EditQuestions;