import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Diagnosis from './Diagnosis.js';

const { Schema } = mongoose;

const studentSchema = new Schema({
  studentId: { type: String, required: true, unique: true }, // Unique student identifier
  name: { type: String, required: true },
  diagnosis: { type: mongoose.Schema.Types.ObjectId, ref: 'Diagnosis', default: null }, // Reference to Diagnosis
}, { timestamps: true });

studentSchema.index({ studentId: 1 }, { unique: true });

const Student = mongoose.model('Student', studentSchema);

export default Student;
