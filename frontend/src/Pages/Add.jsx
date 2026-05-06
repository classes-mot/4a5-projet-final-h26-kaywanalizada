import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useHttpClient } from "../hooks/http-hook";
import "./Add.css"
export default function Add(){
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

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

    const addQuizSubmitHandler = async (event) => {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    try {
      await sendRequest(
        `${import.meta.env.VITE_BACKEND_URL}/api/quiz/addQuiz`,
        "POST",
        JSON.stringify({
          title: data.title,
          type: data.type,
          nbQuestion: questions.length,
          questions: questions.map((q) => q.question),
          reponse: questions.map((q) => q.reponse)
        }),
        { 
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token")
        }
      )
      navigate("/quizList");
    } catch (error) {
      console.log(error);
    }

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
