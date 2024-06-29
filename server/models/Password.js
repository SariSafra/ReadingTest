import mongoose from 'mongoose';

const passwordSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true, refPath: 'userType' },
  userType: { type: String, required: true, enum: ['Teacher', 'Student'] },
  password: { type: String, required: true }
});

// studentSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   const hash = await bcrypt.hash(this.password, 10);
//   this.password = hash;
//   next();
// });

export default mongoose.model('Password', passwordSchema);