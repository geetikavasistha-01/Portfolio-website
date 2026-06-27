import { Schema, model } from 'mongoose';

const BlogPostSchema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: String }],
  category: { type: String, required: true },
  published: { type: Boolean, default: false },
  featured: { type: Boolean, default: false },
  readTime: { type: Number, required: true },
  coverImage: { type: String },
  views: { type: Number, default: 0 }
}, { timestamps: true });

export const BlogPost = model('BlogPost', BlogPostSchema);
