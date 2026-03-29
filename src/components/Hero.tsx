"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title entrance
      const chars = titleRef.current?.querySelectorAll(".char");
      if (chars) {
        gsap.from(chars, {
          y: 80,
          opacity: 0,
          rotateX: -40,
          stagger: 0.04,
          duration: 1.2,
          ease: "power3.out",
          delay: 3, // After loader
        });
      }

      gsap.from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 3.6,
      });

      gsap.from(badgeRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 3.8,
      });

      gsap.from(scrollRef.current, {
        opacity: 0,
        duration: 1,
        delay: 4.2,
      });

      // Parallax on scroll
      gsap.to(titleRef.current, {
        y: -80,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const title = "VIVIR AL CIEN";

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background gradient orbs */}
      <div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-[120px] opacity-20"
        style={{ background: "var(--vapor-300)" }}
      />
      <div
        className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full blur-[100px] opacity-15"
        style={{ background: "var(--accent)" }}
      />

      {/* Top badge */}
      <div
        ref={badgeRef}
        className="glass px-6 py-2 mb-12 text-xs tracking-[0.3em] uppercase"
        style={{ color: "var(--fg-muted)" }}
      >
        Libre & Loco · Filosofía & Transformación
      </div>

      {/* Main title */}
      <h1
        ref={titleRef}
        className="text-center leading-[0.85] mb-8"
        style={{
          fontFamily: "var(--font-clash)",
          fontSize: "clamp(3.5rem, 12vw, 11rem)",
          fontWeight: 600,
          perspective: "800px",
        }}
      >
        {title.split("").map((char, i) => (
          <span
            key={i}
            className="char inline-block text-gradient"
            style={{ display: char === " " ? "inline" : "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>

      {/* Subtitle */}
      <p
        ref={subtitleRef}
        className="text-center max-w-xl mx-auto px-6 text-lg md:text-xl leading-relaxed"
        style={{ color: "var(--fg-muted)" }}
      >
        No es una meta. Es la única forma de vivir.
      </p>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-12 flex flex-col items-center gap-3 scroll-indicator"
      >
        <span
          className="text-[10px] tracking-[0.3em] uppercase"
          style={{ color: "var(--fg-dim)" }}
        >
          Scroll
        </span>
        <div
          className="w-[1px] h-8"
          style={{
            background:
              "linear-gradient(to bottom, var(--vapor-300), transparent)",
          }}
        />
      </div>
    </section>
  );
}
