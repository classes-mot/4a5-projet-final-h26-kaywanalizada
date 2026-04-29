import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema({
    title: { type: String, required: true},
    type: { type: String, required:true},
    nbQuestion: { type: Number, required:true },
    user: { type: mongoose.Types.ObjectId, required: true, ref: 'User'}
})

export const Quiz = mongoose.model('Quiz', QuizSchema);