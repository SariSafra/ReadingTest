import mongoose from 'mongoose';

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

studentSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const Student = mongoose.model('Student', studentSchema);

export default Student;
