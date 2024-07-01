import mongoose from 'mongoose';

const swapSchema = new mongoose.Schema({
  output: { type: String, required: true },
  times: { type: Number, default: 1 }
}, { _id: false });

const frequencyMapSchema = new mongoose.Schema({
  correct: { type: Number, default: 0 },
  incorrect: { type: Number, default: 0 },
  swaps: [swapSchema]
});

const diagnosisSchema = new mongoose.Schema({
    frequencyMap: frequencyMapSchema,
    Emphasis: { type: String, required: true },
    Repeat: { type: String, required: true }, 
    successRate: { type: Number, required: true },
    time: { type: String, required: true }
  
});

const Diagnosis = mongoose.model('Diagnosis', diagnosisSchema);

export default Diagnosis;
