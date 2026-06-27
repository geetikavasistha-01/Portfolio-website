import { Schema, model } from 'mongoose';

const EducationSchema = new Schema({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  field: { type: String, required: true },
  location: { type: String, required: true },
  startYear: { type: Number, required: true },
  endYear: { type: Number, required: true },
  gpa: { type: String, required: true },
  order: { type: Number, required: true }
});

export const Education = model('Education', EducationSchema);
