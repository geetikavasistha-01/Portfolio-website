import { Schema, model } from 'mongoose';

const WorkExperienceSchema = new Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  type: { type: String, enum: ['full-time', 'intern', 'freelance', 'co-founder'], required: true },
  location: { type: String, required: true },
  locationType: { type: String, enum: ['remote', 'onsite', 'hybrid'], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, default: null },
  bullets: [{ type: String }],
  techStack: [{ type: String }],
  order: { type: Number, required: true }
});

export const WorkExperience = model('WorkExperience', WorkExperienceSchema);
