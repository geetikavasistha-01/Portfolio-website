import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import PageWrapper from '../components/layout/PageWrapper';
import { ShelfBook } from '../types';
import { useUIStore } from '../store/uiStore';
import { Navigate } from 'react-router-dom';
import { Check, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const isLightColor = (color?: string) => {
  if (!color) return false;
  const hex = color.replace('#', '');
  if (hex.length !== 6) return false;
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 150;
};

const partition = <T,>(arr: T[], size: number): T[][] => {
  return arr.reduce((acc: T[][], _, i) => {
    if (i % size === 0) acc.push(arr.slice(i, i + size));
    return acc;
  }, []);
};

export default function Shelf() {
  const [activeTab, setActiveTab] = useState<'bookshelf' | 'readingList'>('bookshelf');
  const [hoveredBookId, setHoveredBookId] = useState<string | null>(null);
  const { recruiterMode } = useUIStore();

  // If recruiter mode is enabled, redirect to home
  if (recruiterMode) {
    return <Navigate to="/" replace />;
  }

  // Fetch categorized books
  const { data: groupedBooks = {}, isLoading: booksLoading } = useQuery<{ [key: string]: ShelfBook[] }>({
    queryKey: ['shelf-books'],
    queryFn: async () => {
      const res = await api.get('/shelf/books');
      return res.data;
    }
  });

  // Fetch reading list books
  const { data: readingList = [], isLoading: listLoading } = useQuery<ShelfBook[]>({
    queryKey: ['shelf-reading-list'],
    queryFn: async () => {
      const res = await api.get('/shelf/reading-list');
      return res.data;
    }
  });

  const categories = Object.keys(groupedBooks);

  return (
    <PageWrapper>
      {/* Header Section */}
      <div className="flex flex-col select-none">
        <h1 className="text-3xl font-display text-text1">My Shelf</h1>
        <p className="text-sm text-text3 mt-1">Books on my reading rack</p>
        <div className="w-8 h-px bg-zinc-600 mt-3" />
      </div>

      {/* Navigation Tabs */}
      <div className="inline-flex gap-1 mt-6 border border-border p-1 rounded-lg bg-surface">
        <button
          onClick={() => setActiveTab('bookshelf')}
          className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
            activeTab === 'bookshelf'
              ? 'bg-text1 text-bg'
              : 'text-text3 hover:text-text1'
          }`}
        >
          Bookshelf
        </button>
        <button
          onClick={() => setActiveTab('readingList')}
          className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
            activeTab === 'readingList'
              ? 'bg-text1 text-bg'
              : 'text-text3 hover:text-text1'
          }`}
        >
          Reading List
        </button>
      </div>

      {/* Content Area */}
      <div className="mt-8 min-h-[400px]">
        {activeTab === 'bookshelf' ? (
          <div className="flex flex-col gap-10">
            {booksLoading && (
              <div className="flex flex-col gap-6 w-full animate-pulse mt-4">
                <div className="h-6 w-32 bg-surface2 rounded" />
                <div className="h-40 w-full bg-surface2 rounded-xl" />
              </div>
            )}

            {!booksLoading && categories.length === 0 && (
              <div className="text-center text-text3 text-sm py-12">
                No books seeded yet. Add some from the admin panel!
              </div>
            )}

            {!booksLoading && categories.map((category) => {
              const books = groupedBooks[category] || [];
              const rows = partition(books, 16); // max 16 books per row

              return (
                <div key={category} className="flex flex-col gap-4">
                  {/* Category Title & Count */}
                  <div className="flex items-center text-base font-medium text-text1">
                    <span>{category}</span>
                    <span className="text-[10px] bg-surface2 text-text3 px-2 py-0.5 rounded-full ml-2 font-mono">
                      {books.length}
                    </span>
                  </div>

                  {/* Physical Shelves */}
                  <div className="flex flex-col gap-8 mt-2">
                    {rows.map((rowBooks, rIdx) => (
                      <div key={rIdx} className="relative pb-[6px] min-h-[170px] flex items-end">
                        {/* Books container */}
                        <div className="flex items-end gap-[3px] px-4 w-full select-none z-10">
                          {rowBooks.map((book, bIdx) => {
                            const isPhysical = book.type === 'physical';
                            const spineBg = isPhysical ? (book.spineColor || '#1a3a5c') : '#3a3a3a';
                            const height = book.spineHeight || (isPhysical ? 140 : 100);
                            const width = book.spineWidth || (isPhysical ? 25 : 20);
                            const isLightSpine = isLightColor(spineBg);

                            return (
                              <motion.div
                                key={book._id || bIdx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: bIdx * 0.02, duration: 0.3 }}
                                className="relative cursor-pointer transition-all duration-150 ease-out group"
                                style={{
                                  height: `${height}px`,
                                  width: `${width}px`,
                                  backgroundColor: spineBg,
                                  borderRadius: '2px 2px 0 0',
                                }}
                                onMouseEnter={() => setHoveredBookId(book._id || String(bIdx))}
                                onMouseLeave={() => setHoveredBookId(null)}
                                onClick={() => book.externalUrl && window.open(book.externalUrl, '_blank')}
                              >
                                {/* Spine content */}
                                <div className="w-full h-full flex flex-col items-center justify-between py-2.5 overflow-hidden">
                                  {!isPhysical && (
                                    <span
                                      className="text-[6px] tracking-widest text-zinc-400 select-none pointer-events-none mb-1 font-semibold"
                                      style={{
                                        writingMode: 'vertical-rl',
                                        textOrientation: 'mixed',
                                        transform: 'rotate(180deg)',
                                      }}
                                    >
                                      PAPER
                                    </span>
                                  )}
                                  <span
                                    className="text-[9px] font-mono font-medium truncate select-none pointer-events-none text-center flex-1 max-h-[85%] px-0.5"
                                    style={{
                                      writingMode: 'vertical-rl',
                                      textOrientation: 'mixed',
                                      transform: 'rotate(180deg)',
                                      color: isLightSpine ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.7)',
                                    }}
                                  >
                                    {book.title}
                                  </span>
                                </div>

                                {/* Floating Tooltip */}
                                <AnimatePresence>
                                  {hoveredBookId === (book._id || String(bIdx)) && (
                                    <motion.div
                                      initial={{ opacity: 0, y: -4, scale: 0.95 }}
                                      animate={{ opacity: 1, y: 0, scale: 1 }}
                                      exit={{ opacity: 0, y: -4, scale: 0.95 }}
                                      transition={{ duration: 0.12 }}
                                      className="absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-[#1a1a1c] border border-zinc-700 rounded-lg p-3 w-[160px] shadow-2xl shadow-black/80 pointer-events-none z-50 text-center"
                                    >
                                      <h4 className="text-xs font-semibold text-zinc-100 leading-snug">{book.title}</h4>
                                      <p className="text-[10px] text-zinc-400 mt-1 truncate">{book.author}</p>
                                      {book.publisher && (
                                        <p className="text-[8px] text-zinc-500 mt-0.5 truncate">{book.publisher}</p>
                                      )}
                                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-t-[6px] border-t-[#1a1a1c] border-x-[6px] border-x-transparent" />
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </motion.div>
                            );
                          })}
                        </div>

                        {/* Shelf Wooden Line */}
                        <div
                          className="absolute bottom-0 left-0 right-0 h-[6px] rounded-sm z-0"
                          style={{
                            background: 'linear-gradient(180deg, #8B6914 0%, #6B4F10 50%, #4A3408 100%)',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.5)'
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Reading List Tab */
          <div className="flex flex-col max-w-[600px]">
            {listLoading && (
              <div className="flex flex-col gap-4 w-full animate-pulse mt-4">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="h-16 w-full bg-surface2 rounded-xl" />
                ))}
              </div>
            )}

            {!listLoading && readingList.length === 0 && (
              <div className="text-center text-text3 text-sm py-12">
                Your reading list is empty.
              </div>
            )}

            {!listLoading && readingList.map((book, idx) => (
              <div key={book._id || idx} className="flex gap-3 py-3 border-b border-border items-center">
                {/* Cover Thumbnail */}
                <div className="w-10 h-14 rounded overflow-hidden bg-surface2 border border-border flex-shrink-0 flex items-center justify-center">
                  {book.coverUrl ? (
                    <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
                  ) : (
                    <BookOpen size={16} className="text-text4" />
                  )}
                </div>

                {/* Info block */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-text1 truncate">
                    {book.externalUrl ? (
                      <a href={book.externalUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {book.title}
                      </a>
                    ) : (
                      book.title
                    )}
                  </h3>
                  <p className="text-xs text-text3 mt-0.5 truncate">{book.author}</p>
                </div>

                {/* Status Badge */}
                <div className="flex-shrink-0 flex items-center">
                  {book.status === 'reading' && (
                    <span className="inline-flex items-center gap-1.5 text-xs text-green-400 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      reading
                    </span>
                  )}
                  {book.status === 'want-to-read' && (
                    <span className="inline-flex items-center gap-1.5 text-xs text-zinc-400 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                      want to read
                    </span>
                  )}
                  {book.status === 'read' && (
                    <span className="inline-flex items-center gap-1.5 text-xs text-blue-400 font-medium">
                      <Check size={12} className="text-blue-400" />
                      finished
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
