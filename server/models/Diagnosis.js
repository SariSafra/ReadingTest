import mongoose from 'mongoose';

const frequencyMapSchema = new mongoose.Schema({
  correct: { type: Number, default: 0 },
  incorrect: { type: Number, default: 0 },
  swaps: [
    {
      output: { type: String },
      times: { type: Number, default: 1 }
    }
  ]
});

const diagnosisSchema = new mongoose.Schema({
  ExeNum: { type: String, required: true },
  Diagnosis: {
    frequencyMap: frequencyMapSchema,
    successRate: { type: Number, required: true },
    time: { type: String, required: true }
  },
  Mediation: {
    Emphasis: { type: String, required: true },
    Repeat: { type: String, required: true }
  }
});

const Diagnosis = mongoose.model('Diagnosis', diagnosisSchema);

export{Diagnosis};
