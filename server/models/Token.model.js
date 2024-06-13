import mongoose from 'mongoose';

const { Schema } = mongoose;

const tokenSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, refPath: 'userType' },
  userType: { type: String, required: true, enum: ['Teacher', 'Student'] },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 3600 } // expires in 1 hour
});

export default mongoose.model('Token', tokenSchema);
