export interface WorkExperience {
  _id?: string;
  company: string;
  role: string;
  type: 'full-time' | 'intern' | 'freelance' | 'co-founder';
  location: string;
  locationType: 'remote' | 'onsite' | 'hybrid';
  startDate: string;
  endDate: string | null;
  bullets: string[];
  techStack: string[];
  order: number;
}

export interface Education {
  _id?: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startYear: number;
  endYear: number;
  gpa: string;
  order: number;
}

export interface Project {
  _id?: string;
  slug: string;
  title: string;
  year: number;
  language: string;
  tags: string[];
  status: 'live' | 'wip' | 'archived';
  description: string;
  stats: { label: string; value: string }[];
  longDescription: string;
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  order: number;
  featuredImage?: string;
  images?: string[];
  isFeatured?: boolean;
  isMoreWork?: boolean;
  isSideExperiment?: boolean;
}

export interface SideExperiment {
  _id?: string;
  repoName: string;
  description: string;
  githubUrl: string;
  order: number;
}

export interface BlogPost {
  _id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  tags: string[];
  category: string;
  published: boolean;
  featured: boolean;
  readTime: number;
  coverImage?: string;
  views?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Log {
  _id?: string;
  content: string;
  accentColor: 'amber' | 'teal' | 'rose';
  date: string;
  published: boolean;
}

export interface AMAEntry {
  _id?: string;
  question: string;
  askedBy: string;
  answer: string;
  pinned: boolean;
  answered: boolean;
  date: string;
}

export interface Note {
  _id?: string;
  title: string;
  tags: string[];
  files: { name: string; url: string }[];
  date: string;
  published: boolean;
}

export interface ShelfItem {
  _id?: string;
  title: string;
  type: 'anime' | 'book' | 'game' | 'music';
  label: string;
  caption: string;
  image: string;
  order: number;
}

export interface Video {
  _id?: string;
  title: string;
  description: string;
  category: string;
  thumbnailUrl: string;
  youtubeUrl: string;
  order: number;
}

export interface SpotifyTrack {
  title: string;
  artist: string;
  albumArt: string;
  url?: string;
  spotifyUrl?: string;
  isPlaying: boolean;
  lastPlayedAt?: string;
}

export interface SpotifyRotation {
  title: string;
  artist: string;
}

export interface GitHubContributions {
  totalContributions: number;
  weeks: {
    contributionDays: {
      contributionCount: number;
      date: string;
      color: string;
    }[];
  }[];
}

export interface ShelfBook {
  _id?: string;
  title: string;
  author: string;
  publisher: string;
  type: 'physical' | 'paper';
  category: string;
  spineColor?: string;
  spineHeight: number;
  spineWidth: number;
  coverUrl?: string;
  externalUrl?: string;
  status: 'read' | 'reading' | 'want-to-read';
  inReadingList: boolean;
  order: number;
}

export interface AnimeItem {
  _id?: string;
  title: string;
  year: number;
  type: string;
  genres: string[];
  posterUrl: string;
  rating: number;
  order: number;
}

export interface SpotifyPlaylist {
  _id?: string;
  name: string;
  description?: string;
  spotifyUrl: string;
  coverUrl: string;
  tracks: { title: string; artist: string; explicit: boolean }[];
  order: number;
}

export interface Tweet {
  _id?: string;
  tweetId: string;
  order: number;
}

export interface LatelyEntry {
  _id?: string;
  label: string;
  content: string;
  order: number;
}

export interface ThinkingEntry {
  _id?: string;
  title: string;
  date: string;
  content: string;
  order: number;
}

export interface SmallTruth {
  _id?: string;
  content: string;
  order: number;
}

export interface GlanceSettings {
  _id: string;
  bannerUrlTech: string;
  bannerUrlHuman: string;
  bioTech: string;
  bioHuman: string;
  latestQuoteTech: string;
  latestQuoteHuman: string;
  toolkitItems: { name: string; iconSlug: string }[];
}
