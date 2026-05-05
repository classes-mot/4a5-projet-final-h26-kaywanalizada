import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "../components/Modal/Modal";
export default function Jouer() {
    const { id } = useParams();
    const navigate = useNavigate();

    const quiz = JSON.parse(localStorage.getItem("quiz")).find((q) => q.id === id)
    const questions = quiz ? quiz.questions : [];

    const [reponses, setReponses] = useState([]);
    const [score, setScore] = useState(-1);

    const handleReponseChanger = (index, valeur) => {
        const nouvellesReponses = [...reponses];
        nouvellesReponses[index] = valeur;
        setReponses(nouvellesReponses);

    }

    const handleSoumettre = () => {
        let scoreTemp = 0;
        questions.forEach((q, index) => {
            const bonneReponse = q.reponse.trim().toLowerCase();
            const reponseUtilisateur = (reponses[index]).trim().toLowerCase();
            if (bonneReponse === reponseUtilisateur){
                scoreTemp++;
            }
        })
        setScore(scoreTemp);
    }

    return (
        <div>
            <h2>{quiz.title}</h2>
           {questions.map((q, index) => (
             <div key={index}>
                <p>Question {index+ 1} : {q.question}</p>
                <input 
                type="text"
                placeholder="Votre réponse"
                value={reponses[index]}
                onChange={(e) => handleReponseChanger(index, e.target.value)}/>
             </div>
           ))}

           <button onClick={handleSoumettre}>Soumettre</button>
           <Modal
           isOpen={score !== -1}
           onClose={() => navigate("/quizList")}
           onConfirm={() => navigate("/quizList")}
           ><h2>Quiz terminé!</h2>
           <p>Votre score : {score} / {questions.length}</p>
            </Modal>
        </div>
    )
}