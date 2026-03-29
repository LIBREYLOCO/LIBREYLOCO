"use client";

import { useState, useCallback } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Loader from "@/components/Loader";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Manifesto from "@/components/Manifesto";
import About from "@/components/About";
import Books from "@/components/Books";
import Game from "@/components/Game";
import Projects from "@/components/Projects";
import BlogPreview from "@/components/BlogPreview";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import DirtyToCleanSection from "@/components/3d/DirtyToCleanSection";
import CursorFollower from "@/components/CursorFollower";
import ElevenLabsAgent from "@/components/ElevenLabsAgent";

export default function Home() {
  const [phase, setPhase] = useState<"loading" | "chaos" | "site">("loading");

  const handleLoaderComplete = useCallback(() => {
    setPhase("chaos");
  }, []);

  const handleChaosComplete = useCallback(() => {
    setPhase("site");
  }, []);

  return (
    <>
      <CursorFollower />

      {/* ElevenLabs AI Agent — appears after loader */}
      {phase === "site" && <ElevenLabsAgent />}

      {/* Phase 1: Loader (0-100%) */}
      {phase === "loading" && (
        <Loader onComplete={handleLoaderComplete} />
      )}

      {/* Phase 2: Dirty → Clean fullscreen experience */}
      {phase === "chaos" && (
        <DirtyToCleanSection onEnter={handleChaosComplete} />
      )}

      {/* Phase 3: Main site — "VIVIR AL CIEN" */}
      <SmoothScroll>
        <main
          className="transition-opacity duration-700"
          style={{ opacity: phase === "site" ? 1 : 0 }}
        >
          <Hero />

          <div className="vapor-divider max-w-6xl mx-auto" />

          <Intro />

          <div className="vapor-divider max-w-6xl mx-auto" />

          <Manifesto />

          <div className="vapor-divider max-w-6xl mx-auto" />

          <About />

          <div className="vapor-divider max-w-6xl mx-auto" />

          <Books />

          <div className="vapor-divider max-w-6xl mx-auto" />

          <Game />

          <div className="vapor-divider max-w-6xl mx-auto" />

          <Projects />

          <div className="vapor-divider max-w-6xl mx-auto" />

          <BlogPreview />

          <div className="vapor-divider max-w-6xl mx-auto" />

          <Contact />

          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
