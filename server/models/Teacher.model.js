import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

const teacherSchema = new Schema({
  name: { type: String, required: true }, // Ensure the name is unique
  email: { type: String, required: true, unique: true, lowercase: true },
  students: [{ type: Schema.Types.ObjectId, ref: 'Student' }] // Reference to students
}, { timestamps: true });

teacherSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

export default mongoose.model('Teacher', teacherSchema);
