import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUIStore } from './store/uiStore';

// Layout & Global Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { SparklesCore } from './components/ui/sparkles';
import CLITerminal from './components/ui/CLITerminal';
import CommandPalette from './components/ui/CommandPalette';
import RecruiterToggle from './components/ui/RecruiterToggle';

// Pages
import Home from './pages/Home';
import Work from './pages/Work';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectPage from './pages/ProjectPage';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Shelf from './pages/Shelf';
import AMA from './pages/AMA';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Glance from './pages/Glance';
import Human from './pages/Human';
import { SparklesPreview } from './components/layout/SparklesPreview';

const queryClient = new QueryClient();

export default function App() {
  const { initTheme } = useUIStore();

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen relative bg-bg text-text1">
          {/* Ambient background sparkles */}
          <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
            <SparklesCore
              id="tsparticlesbackground"
              background="transparent"
              minSize={0.6}
              maxSize={1.5}
              particleDensity={70}
              className="w-full h-full"
              particleColor="#FFFFFF"
            />
          </div>

          {/* Navigation bar */}
          <Navbar />

          {/* Page Routing */}
          <main className="flex-1 w-full flex flex-col">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/work" element={<Work />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:slug" element={<ProjectPage />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/shelf" element={<Shelf />} />
              <Route path="/ama" element={<AMA />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/glance" element={<Glance />} />
              <Route path="/human" element={<Human />} />
              <Route path="/sparkles" element={<SparklesPreview />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Shared footer */}
          <Footer />

          {/* Interactive overlays */}
          <CLITerminal />
          <CommandPalette />
          <RecruiterToggle />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
