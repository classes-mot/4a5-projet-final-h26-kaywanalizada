import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import "./QuizCard.css";
const QuizCard = (props) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  return (
    <li>
      <div>
        <p>Titre:{props.title}</p>
        <p>Type:{props.type}</p>
        <p>Nombre de questions: {props.nbQuestions}</p>

        {isLoggedIn && (
          <div className="group-btn">
            <button
              className="btn-modifier"
              onClick={() => navigate(`/edit/${props.id}`)}
            >
              Modifier
            </button>
            <button
              className="btn-supprimer"
              onClick={() => props.delete(props.id)}
            >
              Supprimer
            </button>
          </div>
        )}
      </div>
    </li>
  );
};

export default QuizCard;
