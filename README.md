This is for the trivia app Rapid Fire

mongodb+srv://info:VCMCPiriWFnVAY0V@cluster0.wlmyppj.mongodb.net/RapidFireQuizzes?retryWrites=true&w=majority


<div>
        <label>
            Question:
            <input
            type="text"
            value={question.questionText}
            onChange={(e) => setQuestion({ ...question, questionText: e.target.value })}
            />
        </label>
       
        <label>
            Answer 1:
            <input
            type="text"
            value={question.answers[0]}
            onChange={(e) => setQuestion({ ...question, answers: [e.target.value, question.answers[1], question.answers[2]] })}
            required
            />
        </label>
        <label>
            Answer 2:
            <input
            type="text"
            value={question.answers[1]}
            onChange={(e) => setQuestion({ ...question, answers: [question.answers[0], e.target.value, question.answers[2]] })}
            required
            />
        </label>
        <label>
            Answer 3:
            <input
            type="text"
            value={question.answers[2]}
            onChange={(e) => setQuestion({ ...question, answers: [question.answers[0], question.answers[1], e.target.value] })}
            required
            />
        </label>
        <label>
            Correct Answer:
            <input
            type="text"
            value={question.correctAnswer}
            onChange={(e) => setQuestion({ ...question, correctAnswer: e.target.value })}
            required
            />
        </label>
        <label>
            Difficulty:
            <select
            value={question.difficulty}
            onChange={(e) => setQuestion({ ...question, difficulty: e.target.value })}
            required
            >
            <option value="">Select difficulty</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            </select>
        </label>#   R a p i d F i r e Q u i z z e s  
 