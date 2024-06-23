import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

const studentSchema = new Schema({
  studentId: { type: String, required: true, unique: true }, // Unique student identifier
  name: { type: String, required: true },
  password: { type: String, required: true },
  diagnosis: { type: String, default: '' },
}, { timestamps: true });

studentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

export default mongoose.model('Student', studentSchema);
