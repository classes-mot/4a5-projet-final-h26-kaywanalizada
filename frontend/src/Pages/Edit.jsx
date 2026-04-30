import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function UpdateTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const storedQuiz = JSON.parse(localStorage.getItem("quiz")) || [];

  const quizSelected = storedQuiz.find((g) => g.id === id);

  if (!quizSelected) {
    return (
      <div className="center">
        <h2>Could not find quiz!</h2>
      </div>
    );
  }

  function updateQuizSubmitHandler(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    const updatedQuiz = storedQuiz.map((g) =>
      g.id === id
        ? {
            ...g,
            title: data.title,
            type: data.type,
            nbQuestions: data.nbQuestions,
          }
        : g,
    );

    localStorage.setItem("quiz", JSON.stringify(updatedQuiz));
    navigate("/quizList");
    console.log(updatedQuiz);
  }

  return (
    <form onSubmit={updateQuizSubmitHandler}>
      <h2>Update Quiz</h2>

      <div className="control">
        <label htmlFor="title">Quiz title</label>
        <input
          id="title"
          type="text"
          name="title"
          defaultValue={quizSelected.title}
          required
        />
      </div>

      <div className="control">
        <label htmlFor="type">Game type</label>
        <textarea
          id="type"
          name="type"
          rows="4"
          cols="35"
          defaultValue={quizSelected.type}
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
          Update
        </button>       
      </p>
    </form>
  );
}
