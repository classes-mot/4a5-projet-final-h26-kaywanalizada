import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import QuizCard from "../QuizCard/QuizCard";
import "./QuizList.css";

const QuizList = (props) => {
  const { isLoggedIn } = useAuth();

  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(
    JSON.parse(localStorage.getItem("quiz")) || [],
  );

  const [quizRechercher, setQuizRechercher] = useState("");

  const quizFilter = quiz.filter((jeu) =>
    jeu.title?.toLowerCase().includes(quizRechercher.toLowerCase()),
  );
  if (quiz.length === 0) {
    return (
      <div className="center">
        <h2>No quiz found.</h2>
        {isLoggedIn && (
          <button className="btn btn-primary" onClick={() => navigate("/add")}>
            Ajouter un quiz
          </button>
        )}
      </div>
    );
  }
  const supprimerJeu = (id) => {
    const quizsupprimer = quiz.filter((jeu) => jeu.id !== id);
    setQuiz(quizsupprimer);
    localStorage.setItem("quiz", JSON.stringify(quizsupprimer));
  };

  return (
    <div className="container">
      {isLoggedIn && (
        <button className="btn btn-primary" onClick={() => navigate("/add")}>
          Ajouter un quiz
        </button>
      )}
        <input
          type="text"
          placeholder="Rechercher un quiz"
          value={quizRechercher}
          onChange={(e) => setQuizRechercher(e.target.value)}
        />
      <ul className="game-list">


        {quizFilter.map((game) => (
          <QuizCard
            key={game.id}
            id={game.id}
            title={game.title}
            type={game.type}
            nbQuestions={game.nbQuestions}
            isLoggedin={props.isLoggedIn}
            delete={supprimerJeu}
          />
        ))}
      </ul>
    </div>
  );
};
export default QuizList;
