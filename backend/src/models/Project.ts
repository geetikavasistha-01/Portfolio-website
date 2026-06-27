import { Schema, model } from 'mongoose';

const ProjectSchema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  year: { type: Number, required: true },
  language: { type: String, required: true },
  tags: [{ type: String }],
  status: { type: String, enum: ['live', 'wip', 'archived'], required: true },
  description: { type: String, required: true },
  stats: [{ label: { type: String }, value: { type: String } }],
  longDescription: { type: String, required: true },
  githubUrl: { type: String },
  liveUrl: { type: String },
  featured: { type: Boolean, default: false },
  order: { type: Number, required: true },
  featuredImage: { type: String },
  images: [{ type: String }],
  isFeatured: { type: Boolean, default: false },
  isMoreWork: { type: Boolean, default: false },
  isSideExperiment: { type: Boolean, default: false }
});

export const Project = model('Project', ProjectSchema);
