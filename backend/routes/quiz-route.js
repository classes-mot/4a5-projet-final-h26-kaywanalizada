import express from 'express';
import checkAuth from '../middleware/check-auth.js';
import { addQuiz, getQuiz, getUnQuiz, modifierQuiz, deleteQuiz } from '../controller/quiz-controller.js';

const router = express.Router();

router.get(`/readQuiz`, getQuiz);
router.get(`/readUnQuiz/:id`, getUnQuiz);

router.post(`/addQuiz`,checkAuth, addQuiz);
router.patch(`/modifierQuiz/:id`,checkAuth, modifierQuiz);
router.delete(`/deleteQuiz/:id`,checkAuth, deleteQuiz);

export default router;