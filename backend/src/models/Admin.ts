import { Schema, model } from 'mongoose';

const AdminSchema = new Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  lastLogin: { type: Date, default: Date.now }
});

export const Admin = model('Admin', AdminSchema);
