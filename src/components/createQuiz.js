import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 

function CreateQuiz() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [quiz, setQuiz] = useState({
    name: '',
    genre: '',
    category: '',
    subCategories: '', 
    questions: [],
  });

  const [question, setQuestion] = useState({
    questionText: '',
    answers: ['', '', ''],
    correctAnswer: '',
    difficulty: '',
  });

  useEffect(() => {
    console.log(quiz.questions);
  }, [quiz.questions]);

  const pushQuestion = () => {
    setQuiz((prevState) => ({
      ...prevState,
      questions: [...prevState.questions, question],
    }));

    setQuestion({
      questionText: '',
      answers: ['', '', ''],
      correctAnswer: '',
      difficulty: '',
    });

    console.log(quiz); 
  };

  const saveQuiz = () => {
    if (window.confirm('Please double and triple check your questions and answers. Are you ready to submit the quiz?')) {
      console.log('quiz object:', quiz);
      axios
        .post('/api/quizzes', quiz)
        .then((response) => {
          alert('Quiz saved successfully');
          // Handle any additional actions on success
        })
        .catch((error) => {
          if (error.response) {
            alert(`We are sorry, but your quiz could not be saved. Error: ${error.response.status}`);
          } else {
            alert('We are sorry, but your quiz could not be saved. An unexpected error occurred.');
          }
          // Handle any additional actions on error
        });
    } else {
      // Redirect the user to the "Edit Questions" page
        navigate('/edit-questions', { state: { questions: quiz.questions } });
    }
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const canPushQuestion = () => {
    return (
      question.questionText !== '' &&
      question.answers.every((answer) => answer !== '') &&
      question.correctAnswer !== '' &&
      question.difficulty !== ''
    );
  };

  const difficultyReverseMap = {
    1.0: 'Easy',
    1.2: 'Intermediate',
    1.5: 'Hard',
    2.0: 'Expert',
  };

  // Render the component
  return (
    <div className="card">
      {step === 1 ? (
        <div>
          <label>
            Quiz Name:
            <input
              type="text"
              value={quiz.name}
              onChange={(e) => setQuiz({ ...quiz, name: e.target.value })}
            />
          </label>
  
          <label>
            Genre:
            <input
              type="text"
              value={quiz.genre}
              onChange={(e) => setQuiz({ ...quiz, genre: e.target.value })}
              required
            />
          </label>
          <label>
            Category:
            <input
              type="text"
              value={quiz.category}
              onChange={(e) => setQuiz({ ...quiz, category: e.target.value })}
              required
            />
          </label>
          <label>
            Sub-categories (optional):
            <input
              type="text"
              value={quiz.subCategories}
              onChange={(e) =>
                setQuiz({ ...quiz, subCategories: e.target.value })
              }
            />
          </label>
          <button onClick={handleNextStep}>Enter Questions</button>
        </div>
      ) : (
        <div>
          <label>
            Question:
            <input
              type="text"
              value={question.questionText}
              onChange={(e) =>
                setQuestion({ ...question, questionText: e.target.value })
              }
            />
          </label>
          <label>
            Answer 1:
            <input
              type="text"
              value={question.answers[0]}
              onChange={(e) =>
                setQuestion({
                  ...question,
                  answers: [
                    e.target.value,
                    question.answers[1],
                    question.answers[2],
                  ],
                })
              }
              required
            />
          </label>
          <label>
            Answer 2:
            <input
              type="text"
              value={question.answers[1]}
              onChange={(e) =>
                setQuestion({
                  ...question,
                  answers: [
                    question.answers[0],
                    e.target.value,
                    question.answers[2],
                  ],
                })
              }
              required
            />
          </label>
          <label>
            Answer 3:
            <input
              type="text"
              value={question.answers[2]}
              onChange={(e) =>
                setQuestion({
                  ...question,
                  answers: [
                    question.answers[0],
                    question.answers[1],
                    e.target.value,
                  ],
                })
              }
              required
            />
          </label>
          <label>
            Correct Answer:
            <select
              value={question.correctAnswer}
              onChange={(e) => setQuestion({ ...question, correctAnswer: e.target.value })}
              required
              disabled={!question.answers[0] || !question.answers[1] || !question.answers[2]}
            >
              <option value="">Select correct answer</option>
              {question.answers[0] && <option value={question.answers[0]}>{question.answers[0]}</option>}
              {question.answers[1] && <option value={question.answers[1]}>{question.answers[1]}</option>}
              {question.answers[2] && <option value={question.answers[2]}>{question.answers[2]}</option>}
            </select>
          </label>
          <label>
            Difficulty:
            <select
              value={question.difficulty ? difficultyReverseMap[question.difficulty] : ''}
              onChange={(e) => {
                const difficultyMap = {
                  'Easy': 1.0,
                  'Intermediate': 1.2,
                  'Hard': 1.5,
                  'Expert': 2.0
                };
                setQuestion({ ...question, difficulty: difficultyMap[e.target.value] });
              }}
              required
            >
              <option value="">Select difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Hard">Hard</option>
              <option value="Expert">Expert</option>
            </select>
          </label>
          <button onClick={pushQuestion} disabled={!canPushQuestion()}>
            Push Question
          </button>
          <div>Number of questions: {quiz.questions.length}</div>
          <button onClick={saveQuiz} disabled={quiz.questions.length < 10}>
            Review Questions
          </button>
        </div>
      )}
    </div>
  );
}

export default CreateQuiz;