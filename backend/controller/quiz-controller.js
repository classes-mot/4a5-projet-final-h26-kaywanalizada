import { Quiz } from "../models/quiz.js";
import { User } from "../models/users.js";

const addQuiz = async (requete, reponse, next) => {
    console.log(requete.userData);
    const userId = requete.userData.userId;
    const createdQuiz= new Quiz({
        title: requete.body.title,
        type: requete.body.type,
        nbQuestion: requete.body.nbQuestion,
        user: userId
    });
    let user;
    try{
        user = await User.findById(userId);
    }catch (err){
        console.log(err);
        return reponse.status(500).json({message: "Une erreur BD est survenue"})
    }
    if(!user){
        return reponse.status(404).json({message: "utilisateur introuvable"});
    }
    const result = await createdQuiz.save();
    user.quiz.push(createdQuiz);
    await user.save();

    reponse.status(201).json(result);
};

const getQuiz = async (requete,reponse, next) => {
    const quiz = await Quiz.find().exec();
    reponse.json(quiz);
};

const getUnQuiz = async (requete, reponse, next) => {
    const quizId = requete.params.id;
    let quiz;
    try{
        quiz = await Quiz.findById(quizId);
    }catch (err){
        console.log(err);
        return reponse.status(500).json({message: "une erreur BD est survenue"});
    }
    if(!quiz){
        return reponse.status(404).json({message: "quiz introuvable"});
    }
    reponse.json({quiz: quiz.toObject({getters:true})});
};

const modifierQuiz = async (requete, reponse, next) => {
    const quizId = requete.params.id;
    const quizUpdates = requete.body;
    try{
        const updatedQuiz = await Quiz.findByIdAndUpdate(quizId, quizUpdates,{new:true});
        if(!updatedQuiz){
            return reponse.status(404).json({message: "Quiz introuvable"});
        }
        reponse.status(200).json({jeu: updatedQuiz.toObject({getters:true})});
    }catch (err) {
        reponse.status(500).json({message: "Erreur lors de la mise à jour du jeu"});
    }
};

const deleteQuiz = async (requete,reponse, next) => {
    const quizId = requete.params.id;

    try{
        const quiz = await Quiz.findById(quizId).populate('user');
        if(!quiz){
            return reponse.status(404).json({message: "quiz introuvable"});
        }
        await quiz.deleteOne();

        quiz.user.quiz.pull(quiz._id);
        await quiz.user.save();

        reponse.status(200).json({message: "Quiz supprimé"});
    }catch (err){
        console.log(err);
        return reponse.status(500).json({message: "Erreur lors de la suprresion du quiz"});
    }
}

export { addQuiz, getQuiz, getUnQuiz, modifierQuiz, deleteQuiz };