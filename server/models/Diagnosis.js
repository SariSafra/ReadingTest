import mongoose from 'mongoose';

const swapSchema = new mongoose.Schema({
  input: { type: String, required: true },
  times: { type: Number, required: true }
}, { _id: false });

const frequencyMapSchema = new mongoose.Schema({
  correct: { type: Number, required: true },
  incorrect: { type: Number, required: true },
  swaps: [swapSchema]
}, { _id: false });

const diagnosisSchema = new mongoose.Schema({
  frequencyMap: {
    type: Map,
    of: frequencyMapSchema
  },
  Emphasis: { type: Boolean, required: true },
  Repeat: { type: Boolean, required: true },
  successRate: { type: String, required: true },
  time: { type: Number, required: true },
  consistentSwappingPercentage: { type: Number, required: true }
});

const Diagnosis = mongoose.model('Diagnosis', diagnosisSchema);

export default Diagnosis;