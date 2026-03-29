"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Word-by-word reveal
      gsap.utils.toArray<HTMLElement>(".manifesto-word").forEach((word) => {
        gsap.from(word, {
          opacity: 0.1,
          scrollTrigger: {
            trigger: word,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
        });
      });

      // Side images parallax
      gsap.utils.toArray<HTMLElement>(".manifesto-img").forEach((img) => {
        gsap.from(img, {
          y: 60,
          opacity: 0,
          scale: 0.95,
          scrollTrigger: {
            trigger: img,
            start: "top 85%",
            end: "top 40%",
            scrub: 1,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const words =
    "Construyo ecosistemas que integran educación, negocio y desarrollo personal para transformar vidas y generar legado. Diseño realidades donde la tecnología se siente natural y la filosofía impulsa la acción.".split(
      " "
    );

  return (
    <section ref={sectionRef} className="py-32 md:py-48 px-6 relative">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[180px] opacity-10"
        style={{ background: "var(--vapor-400)" }}
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-20">
          <span
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: "var(--vapor-200)" }}
          >
            Esencialmente
          </span>
          <div
            className="flex-1 h-[1px]"
            style={{ background: "var(--glass-border)" }}
          />
        </div>

        {/* Main manifesto text */}
        <div className="flex flex-wrap gap-x-[0.4em] gap-y-2 mb-20">
          {words.map((word, i) => (
            <span
              key={i}
              className="manifesto-word text-3xl md:text-5xl lg:text-6xl font-light"
              style={{ fontFamily: "var(--font-clash)" }}
            >
              {word}
            </span>
          ))}
        </div>

        {/* Three visual blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="manifesto-img glass-heavy p-6 flex flex-col items-center text-center">
            <div
              className="w-16 h-16 rounded-full mb-6 flex items-center justify-center text-2xl"
              style={{ background: "var(--accent-soft)" }}
            >
              📚
            </div>
            <h4
              className="text-lg font-medium mb-2"
              style={{ fontFamily: "var(--font-clash)" }}
            >
              Educación
            </h4>
            <p className="text-sm" style={{ color: "var(--fg-muted)" }}>
              Colegios y programas que forman personas, no solo alumnos.
            </p>
          </div>

          <div className="manifesto-img glass-heavy p-6 flex flex-col items-center text-center">
            <div
              className="w-16 h-16 rounded-full mb-6 flex items-center justify-center text-2xl"
              style={{ background: "rgba(139, 92, 246, 0.12)" }}
            >
              🕊️
            </div>
            <h4
              className="text-lg font-medium mb-2"
              style={{ fontFamily: "var(--font-clash)" }}
            >
              Memorial
            </h4>
            <p className="text-sm" style={{ color: "var(--fg-muted)" }}>
              Espacios de paz, belleza y dignidad para honrar la vida.
            </p>
          </div>

          <div className="manifesto-img glass-heavy p-6 flex flex-col items-center text-center">
            <div
              className="w-16 h-16 rounded-full mb-6 flex items-center justify-center text-2xl"
              style={{ background: "rgba(196, 181, 253, 0.12)" }}
            >
              ♾️
            </div>
            <h4
              className="text-lg font-medium mb-2"
              style={{ fontFamily: "var(--font-clash)" }}
            >
              Filosofía
            </h4>
            <p className="text-sm" style={{ color: "var(--fg-muted)" }}>
              Principios reales para vivir con intención, valentía y propósito.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
