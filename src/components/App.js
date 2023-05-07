import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateQuiz from './createQuiz/createQuiz';
import EditQuestions from './EditQuestions/EditQuestions';
import UserRegistration from './UserRegistration/UserRegistration';
import Login from './Login/Login'

function App() {
  return (
    <Router>
      <div>
        <h1>Rapid Fire Quizzes</h1>
        <Routes>
          <Route path="/" element={<CreateQuiz />} exact />
          <Route path="/edit-questions" element={<EditQuestions />} exact />
          <Route path="/edit-questions/:id" element={<EditQuestions />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user-registration" element={<UserRegistration />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;