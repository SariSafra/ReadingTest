import express from 'express';
import connectDB from './config/db';
import diagnosisRoutes from'./routes/diagnosisRoutes';
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/diagnosis', diagnosisRoutes);

app.get('/', (req, res) => {
  res.send('Reading Diagnosis Server');
});

app.listen(process.env.PORT, () => console.log(`listening on port: ${process.env.PORT}`));