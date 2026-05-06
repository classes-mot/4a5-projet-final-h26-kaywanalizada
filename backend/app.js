import express from 'express'; 
import { connectDB } from './util/bs.js';
import checkAuth from './middleware/check-auth.js';
import routeQuiz from './routes/quiz-route.js';
import routeUser from './routes/users-route.js';
await connectDB();
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

app.use('/api/users', routeUser);

app.use('/api/quiz', routeQuiz);


const port = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/projetFinal-webEtBase';
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
})