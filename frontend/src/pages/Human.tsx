import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import GlanceCard from '../components/ui/GlanceCard';
import SectionAccent from '../components/ui/SectionAccent';
import { AnimeItem, SpotifyPlaylist, Tweet, LatelyEntry, ThinkingEntry, SmallTruth, ShelfBook, GlanceSettings, SpotifyTrack } from '../types';
import { Music, ExternalLink, ChevronDown, ChevronUp, Star, Play } from 'lucide-react';
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';
import { TwitterTweetEmbed } from 'react-twitter-embed';

const animeCategories = ['all', 'ghibli', 'drama', 'psychological', 'epic', 'slice of life', 'comedy'];

export default function Human() {
  const [selectedAnimeCat, setSelectedAnimeCat] = useState('all');
  const [expandedThinkingId, setExpandedThinkingId] = useState<string | null>(null);

  // Queries
  const { data: settings } = useQuery<GlanceSettings>({
    queryKey: ['glance-settings'],
    queryFn: async () => {
      const res = await api.get('/glance/settings');
      return res.data;
    }
  });

  const { data: playlists = [] } = useQuery<SpotifyPlaylist[]>({
    queryKey: ['human-playlists'],
    queryFn: async () => {
      const res = await api.get('/human/playlists');
      return res.data;
    }
  });

  const { data: animeList = [] } = useQuery<AnimeItem[]>({
    queryKey: ['human-anime'],
    queryFn: async () => {
      const res = await api.get('/human/anime');
      return res.data;
    }
  });

  const { data: tweets = [] } = useQuery<Tweet[]>({
    queryKey: ['human-tweets'],
    queryFn: async () => {
      const res = await api.get('/human/tweets');
      return res.data;
    }
  });

  const { data: lately = [] } = useQuery<LatelyEntry[]>({
    queryKey: ['human-lately'],
    queryFn: async () => {
      const res = await api.get('/human/lately');
      return res.data;
    }
  });

  const { data: thinking = [] } = useQuery<ThinkingEntry[]>({
    queryKey: ['human-thinking'],
    queryFn: async () => {
      const res = await api.get('/human/thinking');
      return res.data;
    }
  });

  const { data: truths = [] } = useQuery<SmallTruth[]>({
    queryKey: ['human-truths'],
    queryFn: async () => {
      const res = await api.get('/human/truths');
      return res.data;
    }
  });

  const { data: shelfBooks = {} } = useQuery<{ [key: string]: ShelfBook[] }>({
    queryKey: ['shelf-books'],
    queryFn: async () => {
      const res = await api.get('/shelf/books');
      return res.data;
    }
  });

  const { data: spotify } = useQuery<SpotifyTrack>({
    queryKey: ['spotify-now-playing-human'],
    queryFn: async () => {
      const res = await api.get('/spotify/now-playing');
      return res.data;
    },
    refetchInterval: 30000
  });

  // Extract flat papers list
  const papers: ShelfBook[] = Object.values(shelfBooks).flat().filter(book => book.type === 'paper');

  // Extract two books for "from my shelf"
  const teaserBooks: ShelfBook[] = Object.values(shelfBooks).flat().filter(book => book.type === 'physical').slice(0, 2);

  // Filter anime by genre
  const filteredAnime = animeList.filter(anime => {
    if (selectedAnimeCat === 'all') return true;
    return anime.genres.some(g => g.toLowerCase() === selectedAnimeCat.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-bg text-text1 py-12 px-4 select-none relative">
      <div className="max-w-[680px] mx-auto flex flex-col">

        {/* CARD 1: PERSONAL HERO */}
        <GlanceCard className="relative overflow-visible p-0 pb-6 border-zinc-800/40">
          <div className="relative w-full h-[180px] rounded-t-2xl overflow-hidden bg-zinc-800">
            {settings?.bannerUrlHuman ? (
              <img src={settings.bannerUrlHuman} alt="Personal Banner" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-tr from-zinc-800 to-zinc-700" />
            )}
            
            {/* Avatar */}
            <img
              src="/illustration - about page Background Removed.png"
              alt="Avatar"
              className="absolute bottom-[-40px] left-5 w-[80px] h-[80px] rounded-xl border-[3px] border-[#111115] bg-[#1a1a1c] object-cover shadow-lg"
            />
          </div>

          <div className="mt-14 px-6 flex flex-col">
            <div className="flex items-baseline lowercase">
              <h1 className="text-2xl font-normal text-text1">hey, i'm geetika</h1>
              <span className="text-xs italic text-text3 ml-2">*this is the quieter side.*</span>
            </div>
            <span className="text-xs text-text4 mt-1 font-mono">@geekykunoichi</span>

            <p className="text-sm text-zinc-300 mt-4 leading-relaxed">
              {settings?.bioHuman || 'no algorithms here. just what i listen to, watch, read, and think about when the screen is off.'}
            </p>

            {/* Elsewhere links */}
            <div className="mt-5">
              <span className="text-[10px] font-mono tracking-widest text-text4 uppercase">ELSEWHERE</span>
              <div className="flex flex-wrap gap-2 mt-2.5">
                <a
                  href="/glance"
                  className="flex items-center gap-2 border border-zinc-800 hover:border-zinc-600 bg-surface/30 rounded-full px-4 py-2 text-xs text-text2 hover:text-text1 transition-all font-medium"
                >
                  the technical me
                </a>
                <a
                  href="https://github.com/geetikavasistha-01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 border border-zinc-800 hover:border-zinc-600 bg-surface/30 rounded-full px-3 py-1.5 text-xs text-text2 hover:text-text1 transition-all"
                >
                  <FaGithub size={12} />
                </a>
                <a
                  href="https://linkedin.com/in/geetikavasisthampy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 border border-zinc-800 hover:border-zinc-600 bg-surface/30 rounded-full px-3 py-1.5 text-xs text-text2 hover:text-text1 transition-all"
                >
                  <FaLinkedin size={12} />
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 border border-zinc-800 hover:border-zinc-600 bg-surface/30 rounded-full px-3 py-1.5 text-xs text-text2 hover:text-text1 transition-all"
                >
                  <FaXTwitter size={12} />
                </a>
              </div>
            </div>

            {/* Sarahout / NGL anonymous link */}
            <p className="text-xs text-text3 mt-4">
              ask me an anonymous question @{' '}
              <a href="/ama" className="underline text-teal-400 hover:text-teal-300 font-medium">
                geekykunoichi/ama
              </a>
            </p>

            {/* Listening widget */}
            <div className="bg-surface2 rounded-xl p-4 flex items-center gap-3 mt-5 border border-border/40 max-w-[400px]">
              <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0 flex items-center justify-center">
                <img src={spotify?.albumArt || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=150&h=150&q=80'} alt="Album Art" className="w-full h-full object-cover" />
                {spotify?.isPlaying && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="flex gap-0.5 items-end justify-center h-4 w-4">
                      <span className="w-0.5 h-2.5 bg-green-400 animate-bounce [animation-delay:0.1s]" />
                      <span className="w-0.5 h-3.5 bg-green-400 animate-bounce [animation-delay:0.3s]" />
                      <span className="w-0.5 h-2 bg-green-400 animate-bounce [animation-delay:0.5s]" />
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <Music size={11} className={spotify?.isPlaying ? "text-green-400" : "text-text3"} />
                  <span className="text-[10px] tracking-wider uppercase text-zinc-500 font-semibold">
                    {spotify?.isPlaying ? 'now playing' : 'last played'}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-text1 truncate mt-0.5">{spotify?.title || 'White Ferrari'}</h4>
                <p className="text-xs text-text3 truncate">{spotify?.artist || 'Frank Ocean'}</p>
              </div>
              <a
                href={spotify?.spotifyUrl || spotify?.url || 'https://spotify.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text3 hover:text-text1 transition-colors p-1"
              >
                <ExternalLink size={14} />
              </a>
            </div>

          </div>
        </GlanceCard>

        {/* CARD 2: "on repeat" */}
        <GlanceCard className="border-zinc-800/40">
          <SectionAccent title="on repeat" color="zinc" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {playlists.map((pl) => (
              <div key={pl._id} className="bg-surface2/60 border border-border/40 rounded-xl overflow-hidden flex flex-col justify-between hover:border-zinc-700/80 transition-all">
                <div className="p-4 pb-0">
                  <h3 className="text-sm font-semibold text-text1">{pl.name}</h3>
                  <p className="text-xs italic text-text3 mt-0.5 leading-snug">{pl.description}</p>
                </div>

                {/* Track list */}
                <div className="px-4 py-3 flex flex-col gap-1.5">
                  {pl.tracks.slice(0, 4).map((track, tIdx) => (
                    <div key={tIdx} className="flex items-center gap-2 py-1 border-b border-border/20 last:border-0 min-w-0">
                      <span className="text-[10px] text-text4 font-mono w-4">{tIdx + 1}</span>
                      {track.explicit && (
                        <span className="text-[8px] bg-zinc-800 border border-zinc-700 text-zinc-400 px-1 rounded flex-shrink-0 font-mono font-semibold">
                          E
                        </span>
                      )}
                      <span className="text-xs text-text2 truncate max-w-[150px] font-mono">
                        {track.title} <span className="text-text4 font-normal">· {track.artist}</span>
                      </span>
                    </div>
                  ))}
                </div>

                {/* Playlist cover & controls */}
                <div className="p-3 bg-surface2/90 border-t border-border/30 flex items-center gap-3">
                  <img src={pl.coverUrl} alt={pl.name} className="w-10 h-10 rounded object-cover flex-shrink-0 border border-border/20" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] text-text2 truncate font-semibold font-mono">{pl.name}</p>
                    <p className="text-[9px] text-text4 truncate font-mono">Spotify Playlist</p>
                  </div>
                  <a
                    href={pl.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center text-black flex-shrink-0 shadow transition-all hover:scale-105"
                  >
                    <Play size={12} className="fill-black ml-0.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </GlanceCard>

        {/* CARD 3: "anime" */}
        <GlanceCard className="border-zinc-800/40">
          <SectionAccent title="anime" color="purple" />

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {animeCategories.map((cat) => {
              const isActive = selectedAnimeCat === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedAnimeCat(cat)}
                  className={`rounded-full px-3 py-1 text-[9px] tracking-wider uppercase transition-all border ${
                    isActive
                      ? 'bg-text1 text-bg border-text1 font-medium'
                      : 'border-border text-text3 hover:border-text3 hover:text-text1'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Posters Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
            {filteredAnime.map((anime) => (
              <div
                key={anime._id}
                className="relative overflow-hidden rounded-xl aspect-[2/3] hover:scale-[1.03] transition-all duration-200 cursor-pointer shadow-md group border border-border/30"
              >
                <img src={anime.posterUrl} alt={anime.title} className="absolute inset-0 w-full h-full object-cover group-hover:brightness-75 transition-all" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                
                {/* Rating Badge */}
                <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full select-none">
                  <Star size={10} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-[10px] font-semibold">{anime.rating}</span>
                </div>

                {/* Genre Badge */}
                <div className="absolute top-2 left-2 text-[8px] tracking-wider text-white bg-blue-600/70 backdrop-blur-sm px-2 py-0.5 rounded-full font-semibold uppercase">
                  {anime.genres[0]}
                </div>

                {/* Bottom title info */}
                <div className="absolute bottom-0 left-0 right-0 p-3 select-none">
                  <h4 className="text-xs font-semibold text-white leading-tight">{anime.title}</h4>
                  <p className="text-[9px] text-white/60 mt-0.5 font-mono">{anime.year} · {anime.type}</p>
                </div>
              </div>
            ))}
          </div>
        </GlanceCard>

        {/* CARD 4: "words, scattered" */}
        {tweets.length > 0 && (
          <GlanceCard className="border-zinc-800/40">
            <SectionAccent title="words, scattered" color="pink" />
            <div className="flex flex-col gap-4 mt-4 select-text">
              {tweets.map((tweet) => (
                <div key={tweet._id} className="w-full">
                  <TwitterTweetEmbed
                    tweetId={tweet.tweetId}
                    options={{ theme: 'dark', dnt: true, align: 'center' }}
                  />
                </div>
              ))}
            </div>
          </GlanceCard>
        )}

        {/* CARD 5: "lately" */}
        <GlanceCard className="border-zinc-800/40">
          <SectionAccent title="lately" color="zinc" />
          <div className="flex flex-col gap-3 mt-4">
            {lately.map((entry) => (
              <div key={entry._id} className="flex items-baseline gap-3 py-1 border-b border-border/10 last:border-0">
                <span className="text-[9px] tracking-widest text-text4 uppercase w-16 flex-shrink-0 font-semibold font-mono">
                  {entry.label}
                </span>
                <span className="text-sm text-text1 font-medium select-text">
                  {entry.content}
                </span>
              </div>
            ))}
          </div>
        </GlanceCard>

        {/* CARD 6: "from my shelf" */}
        <GlanceCard className="border-zinc-800/40">
          <SectionAccent title="from my shelf" color="zinc" />

          {/* Reading books list */}
          <div className="flex flex-col gap-2 mt-4">
            {teaserBooks.map((book) => (
              <div key={book._id} className="flex gap-3 items-center bg-surface2/60 border border-border/30 rounded-xl p-3 select-none">
                <div className="w-8 h-11 bg-zinc-800 rounded overflow-hidden flex-shrink-0 flex items-center justify-center">
                  {book.coverUrl ? (
                    <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
                  ) : (
                    <Music size={14} className="text-text4" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-semibold text-text1 truncate">{book.title}</h4>
                  <p className="text-[10px] text-text3 mt-0.5 truncate">{book.author}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Papers */}
          <div className="text-[10px] tracking-widest text-text3 font-semibold uppercase mb-3 mt-6">
            PAPERS I KEEP RETURNING TO
          </div>
          <div className="flex flex-col">
            {papers.map((paper) => (
              <div key={paper._id} className="flex justify-between items-center py-2.5 border-b border-border/40 last:border-0 select-text">
                <div className="min-w-0 flex-1 pr-4">
                  <h4 className="text-xs font-medium text-text1 leading-snug">{paper.title}</h4>
                  <p className="text-[10px] text-text3 mt-0.5 font-mono">{paper.author} · {paper.publisher}</p>
                </div>
                {paper.externalUrl && (
                  <a
                    href={paper.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text3 hover:text-text1 flex-shrink-0 p-1 transition-colors"
                  >
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            ))}
          </div>

          <a
            href="/shelf"
            className="mx-auto block mt-6 border border-zinc-700 hover:border-zinc-500 rounded-full px-6 py-2 text-sm text-text2 hover:text-text1 text-center max-w-[200px] transition-all"
          >
            see the full shelf ↗
          </a>
        </GlanceCard>

        {/* CARD 7: "thinking out loud" */}
        {thinking.length > 0 && (
          <GlanceCard className="border-zinc-800/40">
            <SectionAccent title="thinking out loud" color="zinc" />
            <div className="flex flex-col gap-2 mt-4">
              {thinking.map((entry) => {
                const isExpanded = expandedThinkingId === entry._id;
                return (
                  <div key={entry._id} className="bg-surface2/60 border border-border/30 rounded-xl overflow-hidden">
                    <div
                      onClick={() => setExpandedThinkingId(isExpanded ? null : (entry._id || ''))}
                      className="flex justify-between items-center px-4 py-3.5 cursor-pointer hover:bg-surface2 transition-all"
                    >
                      <div className="min-w-0 flex-1">
                        <span className="text-sm font-semibold text-text1 truncate block">{entry.title}</span>
                        <span className="text-[10px] text-text4 font-mono mt-0.5 block">{entry.date}</span>
                      </div>
                      {isExpanded ? <ChevronUp size={15} className="text-text3 ml-2" /> : <ChevronDown size={15} className="text-text3 ml-2" />}
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.18 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 pt-1 border-t border-border/20 text-xs text-text2 leading-relaxed select-text">
                            {entry.content}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </GlanceCard>
        )}

        {/* CARD 8: "the day job" */}
        <GlanceCard className="border-l-4 border-l-green-500 border-y-zinc-800/40 border-r-zinc-800/40">
          <SectionAccent title="the day job" color="green" className="border-none pl-0 mb-3" />
          <div className="text-xs text-text2 leading-relaxed space-y-3 italic select-text">
            <p>
              modeling coordinates under low-power boundaries. trotting locomotor gaits and joint encoders.
            </p>
            <p>
              translating spatial grids and telemetry metrics into clean patterns.
            </p>
          </div>
          <a
            href="/glance"
            className="border border-zinc-700 hover:border-zinc-500 rounded-full px-5 py-2 text-xs text-text2 hover:text-text1 mt-4 inline-block transition-all"
          >
            the technical side ↗
          </a>
        </GlanceCard>

        {/* CARD 9: "small truths" */}
        <GlanceCard className="border-zinc-800/40">
          <SectionAccent title="small truths" color="pink" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            {truths.map((truth) => (
              <div
                key={truth._id}
                className="bg-surface2/60 border border-border/30 rounded-xl p-4 text-xs text-text2 italic leading-relaxed hover:bg-zinc-800/40 transition-colors select-text"
              >
                "{truth.content}"
              </div>
            ))}
          </div>
        </GlanceCard>

        {/* FOOTER */}
        <div className="w-12 h-px bg-zinc-800 mx-auto my-8" />

        <div className="text-center italic font-display text-text3 text-sm">
          "{settings?.latestQuoteHuman || 'some things are better felt than explained.'}"
        </div>

        <a
          href="/glance"
          className="text-xs text-text3 hover:text-text1 block text-center mt-6 transition-colors underline"
        >
          back to the serious stuff →
        </a>

      </div>
    </div>
  );
}
