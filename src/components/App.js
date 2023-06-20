import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateQuiz from './createQuiz/createQuiz';
import EditQuestions from './EditQuestions/EditQuestions';
import UserRegistration from './UserRegistration/UserRegistration';
import axios from 'axios';
import Login from './Login/Login';
import Home from './Home/Home';
import Quiz from './Quiz/Quiz';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  const [authState, setAuthState] = useState({
    user: null,
    isAuthenticated: false,
  });

  const [isLoadingAuthState, setIsLoadingAuthState] = useState(true);

  uuseEffect(() => {
    axios.get('/api/auth/check')
      .then(response => {
        if (response.data.isAuthenticated) {
          // Update your application's state here
          setAuthState({
            user: response.data.user,
            isAuthenticated: true,
          });
        }
        setIsLoadingAuthState(false);
      });
  }, []);

  if (isLoadingAuthState) {
    // If the authentication state is still loading, render a loading indicator or nothing
    return null;
  }

  return (
    <Provider store={store}>
      <Router>
        <div>
          <h1>Rapid Fire Quizzes</h1>
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/create-quiz" element={<CreateQuiz />} exact />
            <Route path="/edit-questions" element={<EditQuestions />} exact />
            <Route path="/edit-questions/:id" element={<EditQuestions />} />
            <Route path="/quiz/:id" element={<Quiz />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user-registration" element={<UserRegistration />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;