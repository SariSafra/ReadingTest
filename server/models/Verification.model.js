// Verification.model.js
import mongoose from 'mongoose';

const verificationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600, // 10 minutes
  },
});

verificationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 600 }); // Set TTL index

const Verification = mongoose.model('Verification', verificationSchema);
export default Verification;
