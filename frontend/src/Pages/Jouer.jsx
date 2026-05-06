import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useHttpClient } from "../hooks/http-hook";
import { useTranslation } from "react-i18next";
import Modal from "../components/Modal/Modal";
export default function Jouer() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const { t } = useTranslation();

    const [quiz, setQuiz] = useState(null);
    const [questions,setQuestions] = useState([]);

    const [reponses, setReponses] = useState([]);
    const [score, setScore] = useState(-1);

    useEffect(() => {
        const fetchQuiz = async () => {
        try {
            const data = await sendRequest(`${import.meta.env.VITE_BACKEND_URL}/api/quiz/readUnQuiz/${id}`);
            setQuiz(data.quiz);
            setQuestions(data.quiz.questions.map((q, index) => ({
                question: q,
                reponse: data.quiz.reponse[index]
            })));
            
        }catch (error){
            console.log(error);
        }
    }
    fetchQuiz();
    }, [sendRequest, id]);

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
    if(!quiz) {
        return (
            <div> Attendre </div>
        )
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

           <button onClick={handleSoumettre}>{t("Soumettre")}</button>
           <Modal
           isOpen={score !== -1}
           onClose={() => navigate("/quizList")}
           onConfirm={() => navigate("/quizList")}
           ><h2>{t("Quiz terminé!")}</h2>
           <p>{t("Votre score :")} {score} / {questions.length}</p>
            </Modal>
        </div>
    )
}