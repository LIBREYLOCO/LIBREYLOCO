"use client";

import { useRef, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";

const DirtyToCleanScene = dynamic(
  () => import("./DirtyToCleanScene"),
  { ssr: false }
);

interface DirtyToCleanSectionProps {
  onEnter: () => void;
}

export default function DirtyToCleanSection({ onEnter }: DirtyToCleanSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef({ value: 1.0 });

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    // 3D dirty→clean initial sweep
    tl.to(progressRef.current, {
      value: 0.15,
      duration: 2.5,
      ease: "power2.inOut",
    });

    // Then keep it alive — breathing between clean and semi-dirty
    tl.to(progressRef.current, {
      value: 0.55,
      duration: 4,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    // Content fades in together as a single dissolve
    tl.fromTo(
      contentRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 2, ease: "power1.inOut" },
      0.3
    );

    return () => { tl.kill(); };
  }, []);

  const handleEnter = useCallback(() => {
    if (!sectionRef.current) return;

    gsap.to(sectionRef.current, {
      opacity: 0,
      scale: 1.05,
      duration: 0.8,
      ease: "power3.inOut",
      onComplete: () => {
        if (sectionRef.current) {
          sectionRef.current.style.display = "none";
        }
        onEnter();
      },
    });
  }, [onEnter]);

  return (
    <div
      ref={sectionRef}
      className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden"
      style={{ background: "var(--bg-deep)" }}
    >
      {/* 3D Scene */}
      <DirtyToCleanScene
        className="absolute inset-0 w-full h-full"
        progressRef={progressRef}
      />

      {/* Overlay for readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(10,10,15,0.4) 0%, rgba(10,10,15,0.75) 70%)",
        }}
      />

      {/* All content — fades in together as one dissolve */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-4xl mx-auto text-center px-6"
        style={{ opacity: 0 }}
      >
        <span
          className="inline-block text-xs font-medium tracking-[0.3em] uppercase mb-8"
          style={{ color: "var(--vapor-200)" }}
        >
          Transformaci&oacute;n
        </span>

        <h2
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-none mb-8"
          style={{
            color: "var(--fg)",
            textShadow:
              "0 0 60px rgba(139,92,246,0.4), 0 0 120px rgba(6,255,165,0.15)",
          }}
        >
          Del caos<br />
          <span className="text-gradient">a la claridad</span>
        </h2>

        <p
          className="text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-12"
          style={{ color: "var(--fg)" }}
        >
          Cada idea nace en el desorden. Lo extraordinario no es evitar el caos
          &mdash;<br />
          es saber{" "}
          <span style={{ color: "var(--accent)" }}>atravesarlo</span>{" "}
          hasta que se convierte en visi&oacute;n.
        </p>

        <button
          onClick={handleEnter}
          className="group inline-flex items-center gap-3 glass-heavy px-8 py-4 rounded-full text-base font-semibold cursor-pointer transition-all duration-300 hover:scale-105"
          style={{
            color: "var(--accent)",
            border: "1px solid rgba(6,255,165,0.25)",
            boxShadow: "0 0 30px rgba(6,255,165,0.1)",
          }}
        >
          &iexcl;Vive la transformaci&oacute;n!
          <svg
            className="w-5 h-5 animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
