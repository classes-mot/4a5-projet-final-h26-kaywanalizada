import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function UpdateTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const storedQuiz = JSON.parse(localStorage.getItem("quiz")) || [];

  const quizSelected = storedQuiz.find((g) => g.id === id);

  const [questions, setQuestions] = useState(quizSelected?.questions || []);

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
            nbQuestions: questions.length,
            questions: questions
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
          Ajouter Question
        </button>

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
