import mongoose from 'mongoose';

const { Schema } = mongoose;

const studentSchema = new Schema({
  studentId: { type: String, required: true, unique: true }, 
  name: { type: String, required: true },
  filePath: { type: String },
  diagnoses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Diagnosis' }],
}, { timestamps: true });

studentSchema.index({ studentId: 1 }, { unique: true });

const Student = mongoose.model('Student', studentSchema);

export default Student;
