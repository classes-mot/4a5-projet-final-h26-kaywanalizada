import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import { useState } from "react";
import "./QuizCard.css";
import Modal from "../Modal/Modal";
import { useTranslation } from "react-i18next";
const QuizCard = (props) => {
  const { t } = useTranslation();
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
        <p>{t("Titre")}:{props.title}</p>
        <p>{t("Type")}:{props.type}</p>
        <p>{t("Nombre de questions")}: {props.nbQuestions}</p>

        <button className="btn-jouer" onClick={() =>navigate(`/jouer/${props.id}`)}>
          {t("Jouer")}
        </button>

        {isLoggedIn && (
          <div className="group-btn">
            <button
              className="btn-modifier"
              onClick={() => navigate(`/edit/${props.id}`)}
            >
              {t("Modifier")}
            </button>
            <button
              className="btn-supprimer"             
              onClick={() => setIsModalOpen(true)}
            >
              {t("Supprimer")}
            </button>
          </div>
        )}
      </div>
        <Modal
        isOpen = {isModalOpen}
        onClose = {() => setIsModalOpen(false)}
        onConfirm = {handleDelete}
        >{t("Êtes-vous sûr de vouloir supprimer")} {props.title}?</Modal>
    </li>
  );
};

export default QuizCard;
