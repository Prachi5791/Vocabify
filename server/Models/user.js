
import mongoose from 'mongoose';
const { Schema } = mongoose;


const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
    },
    password: {
      type: String,
      required: true,
    },
    motherTongue: {
      type: String,
      required: true,
    },
    fluency: {
      type: String,
      required: true,
    },
    streak: {
      type: Number,
      default: 0, // Default streak value is 0
    },
    lastStreakDate: {
      type: Date,
      default: null, // This will be null initially, indicating no streak has been set
    },
    streakAttempted: {
      type: Boolean,
      default: false,
    }

  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

export const userModel = mongoose.model('users', UserSchema);
