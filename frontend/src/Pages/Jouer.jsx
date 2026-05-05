import { useParams, useNavigate } from "react-router-dom";
export default function Jouer() {
    const { id } = useParams();
    const navigate = useNavigate();
    const quiz = JSON.parse(localStorage.getItem("quiz")).find((q) => q.id === id)
    const questions = quiz ? quiz.questions : [];
    return (
        <div>
            <h2>{quiz.title}</h2>
           {questions.map((q, index) => (
             <div key={index}>
                <p>Question {index+ 1} : {q.question}</p>
                <input 
                type="text"
                placeholder="Votre réponse"/>
             </div>
           ))}

           <button>Soumettre</button>
        </div>
    )
}