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

studentSchema.pre('remove', async function(next) {
  try {
    await Diagnosis.deleteMany({ _id: this.diagnosis });
    next();
  } catch (err) {
    next(err);
  }
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
