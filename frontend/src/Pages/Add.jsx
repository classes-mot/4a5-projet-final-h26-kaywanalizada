import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Add.css"
export default function Add(){
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);

    const ajouterQuestion = () => {
       setQuestions([...questions, { id:Math.random().toString(), question: "", reponse: ""}]);
    }

    const modifierQuestion = (index, champ, valeur) => {
       const nouvelleQuestions = [...questions];
       nouvelleQuestions[index][champ] = valeur;
      setQuestions(nouvelleQuestions);
    }

    const supprimerQuestion = (index) => {
        setQuestions(questions.filter((q, i) => i !== index));
    }

    function addQuizSubmitHandler(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    const storedQuizs = JSON.parse(localStorage.getItem("quiz")) || [];
    const addedQuiz = {
        id: Math.random().toString(),
        title: data.title,
        type: data.type,
        nbQuestions: questions.length,
        questions: questions
    };

    const tableauQuiz = [...storedQuizs, addedQuiz]

    localStorage.setItem("quiz", JSON.stringify(tableauQuiz));

    navigate("/quizList");
  } 
      return (
    <form onSubmit={addQuizSubmitHandler}>
      <h2>Ajouter Quiz</h2>

      <div className="control">
        <label htmlFor="title">Quiz title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
        />
      </div>

      <div className="control">
        <label htmlFor="type">Quiz type</label>
        <textarea
          id="type"
          name="type"
          rows="4"
          cols="35"
        />
      </div>

        <div className="control">
        <label htmlFor="nbQuestions">Nombre de questions</label>
        <input
          id="nbQuestions"
          type="number"
          name="nbQuestions"
          min="0"
        />
      </div>

      <div className="control">
        <label htmlFor="questions">Questions</label>
        {questions.map((q, index) => (
          <div key={q.id} className="block-question">
            <div className="control">
            <label>Question {index + 1}</label>
            <input
              type="text"
              value={q.question}
              onChange = {(e) => modifierQuestion(index, "question", e.target.value)}
              required
              />
              </div>

            <div className="control">
            <label>Bonne réponse</label>
            <input
              type="text"
              value={q.reponse}
              onChange = {(e) => modifierQuestion(index, "reponse", e.target.value)}
              required
              />
              </div>

            <button type="button" onClick={() => supprimerQuestion(index)}>
            Supprimer question
          </button>
          </div>
        ))}
        <button type="button" onClick={ajouterQuestion}>
          AjouterQuestion
        </button>

      </div>


      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button type="submit" className="button">
          Ajouter
        </button>
      </p>
    </form>
  );
}
