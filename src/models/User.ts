import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import { addressSchema } from "./Address";

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  verified: {
    type: Boolean,
    default: false,
  },
  address: addressSchema
}, {
  timestamps: true
});

UserSchema.pre('save', async function (next) {
  if (this.password != null) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  }
  next();
})

const User = mongoose.model('User', UserSchema);

export {
  User
}