import { Schema, model } from 'mongoose';

const SideExperimentSchema = new Schema({
  repoName: { type: String, required: true },
  description: { type: String, required: true },
  githubUrl: { type: String, required: true },
  order: { type: Number, required: true }
});

export const SideExperiment = model('SideExperiment', SideExperimentSchema);
