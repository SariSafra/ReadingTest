import mongoose from 'mongoose';

const passwordSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true, refPath: 'userType' },
  userType: { type: String, required: true, enum: ['Teacher', 'Student'] },
  password: { type: String, required: true }
});

const Password = mongoose.model('Password', passwordSchema);

export default Password;
