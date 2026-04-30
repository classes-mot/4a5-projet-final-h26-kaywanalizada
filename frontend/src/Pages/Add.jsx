import { useNavigate } from "react-router-dom";
import "./Add.css"
export default function Add(){
    const navigate = useNavigate();

    function addQuizSubmitHandler(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    const storedQuizs = JSON.parse(localStorage.getItem("quiz")) || [];
    const addedQuiz = {
        id: Math.random().toString(),
        title: data.title,
        type: data.type,
        nbQuestions: data.nbQuestions
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
        />
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
