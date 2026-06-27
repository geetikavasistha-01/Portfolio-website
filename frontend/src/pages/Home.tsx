import React from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import Hero from '../components/home/Hero';
import CurrentlyBuilding from '../components/home/CurrentlyBuilding';
import SpotifyWidget from '../components/home/SpotifyWidget';
import LogCards from '../components/home/LogCards';
import GitHubHeatmap from '../components/home/GitHubHeatmap';
import FeaturedProjects from '../components/home/FeaturedProjects';
import LabNotebook from '../components/home/LabNotebook';
import LatestWriting from '../components/home/LatestWriting';
import Videos from '../components/home/Videos';
import AMAPreview from '../components/home/AMAPreview';
import OnLoop from '../components/home/OnLoop';
import SectionHeader from '../components/ui/SectionHeader';
import { useUIStore } from '../store/uiStore';

export default function Home() {
  const { recruiterMode } = useUIStore();

  return (
    <PageWrapper>
      {/* 1. Hero Profile */}
      <Hero />

      {/* 2. Currently Building Banner */}
      <CurrentlyBuilding />

      {/* 3. Spotify Widget */}
      <SectionHeader
        label="spotify status"
        rightElement={<span>now playing</span>}
      />
      <SpotifyWidget />

      {/* 4. Log Cards (Micro-journal) - Hidden in recruiter mode */}
      {!recruiterMode && (
        <>
          <SectionHeader
            label="log journal"
            rightElement={<span>micro drops</span>}
            subtext="Stray thoughts, technical discoveries, and things I chew on."
          />
          <LogCards />
        </>
      )}

      {/* 5. Contributions Heatmap */}
      <SectionHeader
        label="contributions"
        rightElement={<span>github metrics</span>}
      />
      <GitHubHeatmap />

      {/* 6. Featured Projects */}
      <SectionHeader
        label="featured work"
        rightElement={<span>things built</span>}
        subtext="Production applications, machine learning models, and open source libraries."
      />
      <FeaturedProjects />

      {/* 7. Lab Notebook screenshots - Hidden in recruiter mode */}
      {!recruiterMode && (
        <>
          <SectionHeader
            label="lab notebook"
            rightElement={<span>snapshots</span>}
            subtext="Working drafts, terminal printouts, and visual notes."
          />
          <LabNotebook />
        </>
      )}

      {/* 8. Latest Article */}
      <SectionHeader
        label="writing"
        rightElement={<span>blog feed</span>}
      />
      <LatestWriting />

      {/* 9. Videos */}
      <SectionHeader
        label="demonstrations"
        rightElement={<span>videos</span>}
      />
      <Videos />

      {/* 10. AMA Preview */}
      <SectionHeader
        label="questions & answers"
        rightElement={<span>ama preview</span>}
      />
      <AMAPreview />

      {/* 11. Anime / Recreation shelf - Hidden in recruiter mode */}
      {!recruiterMode && (
        <>
          <SectionHeader
            label="on loop"
            rightElement={<span>recreations</span>}
            subtext="What I keep coming back to when the monitors go dark."
          />
          <OnLoop />
        </>
      )}
    </PageWrapper>
  );
}
