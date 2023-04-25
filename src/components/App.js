import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateQuiz from './createQuiz';
import EditQuestions from './EditQuestions';

function App() {
  return (
    <Router>
      <div>
        <h1>Rapid Fire Quizzes</h1>
        <Routes>
          <Route path="/" element={<CreateQuiz />} exact />
          <Route path="/edit-questions" element={<EditQuestions />} exact />
        </Routes>
      </div>
    </Router>
  );
}

export default App;