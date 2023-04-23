import React from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; 

function EditQuestions({ quizQuestions }) {
    // Add your review/edit questions logic here
    const location = useLocation();
    const questions = location.state.questions;

    return (
      <div>
        <h1>Edit Questions</h1>
        {/* Render the questions for review/editing */}
      </div>
    );
  }
  
  export default EditQuestions;