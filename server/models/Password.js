import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

const passwordSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true, refPath: 'userType' },
  userType: { type: String, required: true, enum: ['Teacher', 'Student'] },
  password: { type: String, required: true }
});

// Pre-save middleware to hash the password
passwordSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

// Function to hash password for update queries
async function hashPassword(next) {
  const update = this.getUpdate();
  if (update.password) {
    try {
      const hash = await bcrypt.hash(update.password, 10);
      this.getUpdate().password = hash;
    } catch (error) {
      return next(error);
    }
  }
  next();
}

// Pre hooks for update queries
passwordSchema.pre('updateOne', hashPassword);
passwordSchema.pre('updateMany', hashPassword);
passwordSchema.pre('findOneAndUpdate', hashPassword);
passwordSchema.pre('update', hashPassword);

const Password = mongoose.model('Password', passwordSchema);

export default Password;
