import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './EditQuestions.css';
import { useAuth } from '../authContext';

const EditQuestions = () => {
  const { id } = useParams();
  const location = useLocation();
  const { authState, setAuthState } = useAuth();
  const { user, isAuthenticated } = authState;  
  const [questions, setQuestions] = useState([]);
  const [editing, setEditing] = useState(null);
  const [modified, setModified] = useState(false);
  const [quizInfo, setQuizInfo] = useState({ name: '', author: '', genre: '', categories: [] });
  const [userQuizzes, setUserQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log("authState in EditQuestions:", authState)
  console.log("User quizzes", userQuizzes);

  const fetchQuizzesByUserId = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/quizzes/by-user/${userId}`);
      setUserQuizzes(response.data);
      console.log("User Quizzes:", response.data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };
  
  const fetchQuiz = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/quizzes/${id}`);
      setQuestions(response.data.questions);
  
      const authorId = response.data.author._id || response.data.author;
      const authorResponse = await axios.get(`/api/users/${authorId}`);
      let authorUsername = '';
      if (authorResponse.data) {
        authorUsername = authorResponse.data.username;
      } else {
        console.log('authorResponse.data is undefined');
      }
  
      setQuizInfo({
        name: response.data.name,
        author: authorUsername,
        genre: response.data.genre,
        category: response.data.category,
        subCategories: response.data.subCategories,
      });
      console.log("Fetched quizInfo:", {
        name: response.data.name,
        author: authorUsername,
        genre: response.data.genre,
        category: response.data.category,
        subCategories: response.data.subCategories,
      });
    } catch (error) {
      console.error('Error fetching quiz:', error);
    }
    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    if (location.state && location.state.questions) {
      setQuestions(location.state.questions);
      setIsLoading(false);
      console.log("Fetching quizzes for user:", user._id);
    } else if (id) {
      fetchQuiz();
    } else {
      setIsLoading(false);
    }
  }, [id, location.state, fetchQuiz]);

  const difficultyLookup = {
    1: "Easy",
    1.2: "Intermediate",
    1.5: "Hard",
    2.0: "Expert",
  };

  useEffect(() => {
    if (user && user._id && isAuthenticated) {
      console.log('Fetching quizzes for user:', user._id);
      fetchQuizzesByUserId(user._id);
    } else {
      console.log('User or user ID is undefined:', user);
      setUserQuizzes([]);
    }
  }, [user, isAuthenticated]);

  const difficultyMap = {
    'Easy': 1.0,
    'Intermediate': 1.2,
    'Hard': 1.5,
    'Expert': 2.0,
  };

  const handleEdit = (index) => {
    setEditing(index);
  };

  const handleSave = async () => {
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

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  if (!authState.isAuthenticated)  {
    return (
      <div className="popup">
        <h2>Login to edit your quizzes</h2>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
    );
  }

  // Just before your return statement:
console.log("Current user:", user);
console.log("Quiz Info:", quizInfo);
console.log("User quizzes:", userQuizzes);
console.log("Is user authenticated?:", isAuthenticated);

  return (
    <div>
    {userQuizzes.length > 0 ? (
      <div className="quizzes-list">
        <h2>Your Quizzes</h2>
        <table>
          <thead>
            <tr>
              <th>Quiz Name</th>
              <th>Genre</th>
              <th>Date Made</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userQuizzes.map((quiz) => (
              <tr key={quiz._id}>
                <td>{quiz.name}</td>
                <td>{quiz.genre}</td>
                <td>{new Date(quiz.createdAt).toLocaleDateString()}</td>
                <td>
                  <Link to={`/edit-questions/${quiz._id}`}>
                    <button>Edit Quiz</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <div className="popup">
        <h2>You have no quizzes!</h2>
        <Link to="/">
          <button>Home Page</button>
        </Link>
        <Link to="/create-quiz">
          <button>Create Quiz!</button>
        </Link>
      </div>
    )}
    {user && quizInfo && quizInfo?.name && user?.username === quizInfo?.author && (
      <div className="container">
        <div className="info-box">
          <h2>{quizInfo.name}</h2>
          <p>Author: {quizInfo.author}</p>
          <p>Genre: {quizInfo.genre}</p>
          <p>
            Category: {quizInfo.category} - Subcategories:{" "}
            {quizInfo.subCategories && quizInfo.subCategories.join(", ")}
          </p>
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
      )}
    </div>
  );
}

export default EditQuestions;