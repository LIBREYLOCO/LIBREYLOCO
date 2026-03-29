"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obj = { val: 0 };

    // Spin the 4L logo continuously
    const spinTween = gsap.to(logoRef.current, {
      rotation: 360,
      duration: 3,
      repeat: -1,
      ease: "linear",
    });

    const tl = gsap.timeline({
      onComplete: () => {
        spinTween.kill();
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: "power3.inOut",
          onComplete,
        });
      },
    });

    tl.to(obj, {
      val: 100,
      duration: 2.5,
      ease: "power2.inOut",
      onUpdate: () => setCount(Math.round(obj.val)),
    });

    tl.to(
      barRef.current,
      {
        scaleX: 1,
        duration: 2.5,
        ease: "power2.inOut",
      },
      0
    );

    return () => {
      tl.kill();
      spinTween.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ background: "var(--bg-deep)" }}
    >
      {/* 4L Logo — spinning */}
      <div ref={logoRef} className="mb-16">
        <Image
          src="/assets/logo_4l.png"
          alt="Libre & Loco — 4L"
          width={160}
          height={160}
          className="drop-shadow-2xl"
          priority
        />
      </div>

      {/* Counter */}
      <div className="relative mb-8">
        <span
          ref={counterRef}
          className="text-7xl md:text-9xl font-light tabular-nums"
          style={{
            fontFamily: "var(--font-clash)",
            color: "var(--fg)",
          }}
        >
          {count}
          <span
            className="text-3xl md:text-5xl ml-1"
            style={{ color: "var(--vapor-200)" }}
          >
            %
          </span>
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-48 h-[1px] relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "var(--fg-dim)" }}
        />
        <div
          ref={barRef}
          className="absolute inset-0 origin-left"
          style={{
            background: "linear-gradient(90deg, var(--vapor-300), var(--accent))",
            transform: "scaleX(0)",
          }}
        />
      </div>
    </div>
  );
}
