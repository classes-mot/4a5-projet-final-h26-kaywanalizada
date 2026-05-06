import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import { useHttpClient } from "../../hooks/http-hook";
import QuizCard from "../QuizCard/QuizCard";
import "./QuizList.css";

const QuizList = (props) => {
  const { isLoggedIn } = useAuth();

  const navigate = useNavigate();
  const [quiz, setQuiz] = useState([]);

  const [quizRechercher, setQuizRechercher] = useState("");
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchQuiz = async () => {
      try{
        const data = await sendRequest(`${import.meta.env.VITE_BACKEND_URL}/quiz/readQuiz`);
        setQuiz(data);
      }catch (error){
        console.log(error);
      }
    };
    fetchQuiz();

  }, [sendRequest]);

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
  const supprimerJeu = async (id) => {
    try {
      await sendRequest(
        `${import.meta.env.VITE_BACKEND_URL}/quiz/deleteQuiz/${id}`,
        "DELETE",
        null,
        {Authorization: "Bearer " +sessionStorage.getItem("token")}
      );
      const quizsupprimer = quiz.filter((jeu) => jeu._id !== id);
      setQuiz(quizsupprimer);
    } catch (error) {
      console.log(error);
    }
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
            key={game._id}
            id={game._id}
            title={game.title}
            type={game.type}
            nbQuestions={game.nbQuestion}
            isLoggedin={props.isLoggedIn}
            delete={supprimerJeu}
          />
        ))}
      </ul>
    </div>
  );
};
export default QuizList;
