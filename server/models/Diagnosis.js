import mongoose from 'mongoose';

// Define the schema for each swap entry
const swapSchema = new mongoose.Schema({
  output: { type: String, required: true },
  times: { type: Number, default: 1 }
}, { _id: false }); // Disable _id for subdocuments

// Define the schema for frequencyMap
const frequencyMapSchema = new mongoose.Schema({
  correct: { type: Number, default: 0 },
  incorrect: { type: Number, default: 0 },
  swaps: [swapSchema] // Embed the swapSchema here
});

// Define the main diagnosis schema
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

// Create the Diagnosis model
const Diagnosis = mongoose.model('Diagnosis', diagnosisSchema);

// Define the Student schema
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  diagnosis: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Diagnosis',
    required: false
  }
});

// Exclude password field when populating students
studentSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

// Create the Student model
const Student = mongoose.model('Student', studentSchema);

// Define the Teacher schema
const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
    }
  ]
});


// Create the Teacher model
const Teacher = mongoose.model('Teacher', teacherSchema);

export { Teacher, Student, Diagnosis };
