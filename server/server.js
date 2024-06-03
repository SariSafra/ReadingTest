import express from 'express';
import connectDB from './config/db.js';
import diagnosisRoute from'./routes/diagnosisRoutes.js';
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/diagnosis', diagnosisRoute);

app.get('/', (req, res) => {
  res.send('Reading Diagnosis Server');
});

app.listen(process.env.PORT, () => console.log(`listening on port: ${process.env.PORT}`));