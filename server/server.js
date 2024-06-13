import express from 'express';
import connectDB from './config/db.js';
import diagnosisRoute from './routes/diagnosisRoute.js';
import loginRoute from './routes/loginRoute.js';
import studentRoute from './routes/studentRoute.js';
import teacherRoute from './routes/teacherRoute.js';
import signupRoute from './routes/signupRoute.js';
import passwordResetRoute from './routes/passwordReset.route.js'
import 'dotenv/config';
import authMiddleware from './middlewares/authMiddleware.js';
import morgan from 'morgan';

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/diagnosis', authMiddleware, diagnosisRoute);
app.use('/signup', signupRoute);
app.use('/login', loginRoute);
app.use('/students', authMiddleware, studentRoute);
app.use('/teachers', authMiddleware, teacherRoute);
app.use('/password', passwordResetRoute);

app.get('/', (req, res) => {
  res.send('Reading Diagnosis Server');
});

app.listen(port, () => console.log(`listening on port: ${port}`));
