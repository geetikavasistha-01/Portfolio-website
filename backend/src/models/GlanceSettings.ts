import { Schema, model } from 'mongoose';

const GlanceSettingsSchema = new Schema({
  _id: { type: String, required: true, default: 'singleton' },
  bannerUrlTech: { type: String, required: true },
  bannerUrlHuman: { type: String, required: true },
  bioTech: { type: String, required: true },
  bioHuman: { type: String, required: true },
  latestQuoteTech: { type: String, required: true },
  latestQuoteHuman: { type: String, required: true },
  toolkitItems: [{
    name: { type: String, required: true },
    iconSlug: { type: String, required: true }
  }]
});

export const GlanceSettings = model('GlanceSettings', GlanceSettingsSchema);
