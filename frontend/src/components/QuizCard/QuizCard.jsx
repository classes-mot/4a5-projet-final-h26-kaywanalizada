import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import { useState } from "react";
import "./QuizCard.css";
import Modal from "../Modal/Modal";
const QuizCard = (props) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    props.delete(props.id);
    setIsModalOpen(false);
  }
  return (
    <li>
      <div className = "quiz-card">
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
              onClick={() => setIsModalOpen(true)}
            >
              Supprimer
            </button>
          </div>
        )}
      </div>
        <Modal
        isOpen = {isModalOpen}
        onClose = {() => setIsModalOpen(false)}
        onConfirm = {handleDelete}
        >Êtes-vous sûr de vouloir supprimer {props.title}?</Modal>
    </li>
  );
};

export default QuizCard;
