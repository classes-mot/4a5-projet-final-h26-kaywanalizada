import express from 'express'; 
import { connectDB } from './util/bs.js';
import checkAuth from './middleware/check-auth.js';
import routeQuiz from './routes/quiz-route.js';
import routeUser from './routes/users-route.js';
const app = express();

app.use(express.json());

app.use('/api/users', routeUser);

app.use('/api/quiz', routeQuiz);

await connectDB();
const port = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/projetFinal-webEtBase';
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
})