import express from 'express';
import connectDB from './config/db.js';
import diagnosisRoute from './routes/diagnosisRoute.js';
import loginRoute from './routes/loginRoute.js';
import studentRoute from './routes/studentRoute.js';
import teacherRoute from './routes/teacherRoute.js';
import signupRoute from './routes/signupRoute.js';
import passwordResetRoute from './routes/passwordReset.route.js'
import emailRoute from './routes/emailRoute.route.js';
import 'dotenv/config';
import authMiddleware from './middlewares/authMiddleware.js';
import checkEmailExists from './middlewares/checkEmailExists.js'
import morgan from 'morgan';
import cors from 'cors';
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();
const corsOptions = {
  origin: 'http://localhost:5173', // Adjust the origin as needed
  credentials: true, // Allow credentials (cookies, authorization headers, TLS client certificates)
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};
// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));
// Routes
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  if (req.body) {
    console.log('Request Body:', req.body);
  }
  next();
});
app.use('/password', passwordResetRoute);
app.use('/signup', checkEmailExists, signupRoute);
app.use('/login', loginRoute);
app.use(authMiddleware);
app.use('/diagnosis', diagnosisRoute);
app.use('/students', studentRoute);
app.use('/teachers', teacherRoute);
app.use('/email', emailRoute);

app.get('/', (req, res) => {
  res.send('Reading Diagnosis Server');
});

app.listen(port, () => console.log(`listening on port: ${port}`));
