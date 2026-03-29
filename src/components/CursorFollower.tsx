"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

export default function CursorFollower() {
  const followerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);
  const rafId = useRef<number>(0);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const animate = useCallback(() => {
    // Symbol follows with slight delay
    pos.current.x = lerp(pos.current.x, mouse.current.x, 0.15);
    pos.current.y = lerp(pos.current.y, mouse.current.y, 0.15);

    // Ring follows with more delay
    ringPos.current.x = lerp(ringPos.current.x, mouse.current.x, 0.08);
    ringPos.current.y = lerp(ringPos.current.y, mouse.current.y, 0.08);

    if (followerRef.current) {
      followerRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
    }
    if (ringRef.current) {
      ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
    }

    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    // Hide on touch devices
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const handleEnter = () => {
      isHovering.current = true;
      if (followerRef.current) {
        gsap.to(followerRef.current, {
          scale: 2.2,
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
        });
      }
      if (ringRef.current) {
        gsap.to(ringRef.current, {
          scale: 1.8,
          opacity: 0,
          duration: 0.35,
          ease: "power2.out",
        });
      }
    };

    const handleLeave = () => {
      isHovering.current = false;
      if (followerRef.current) {
        gsap.to(followerRef.current, {
          scale: 1,
          opacity: 0.85,
          duration: 0.35,
          ease: "power2.out",
        });
      }
      if (ringRef.current) {
        gsap.to(ringRef.current, {
          scale: 1,
          opacity: 0.4,
          duration: 0.35,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Observe interactive elements
    const interactiveSelector = "a, button, [role='button'], input, textarea, select";
    const attachListeners = () => {
      document.querySelectorAll(interactiveSelector).forEach((el) => {
        el.addEventListener("mouseenter", handleEnter);
        el.addEventListener("mouseleave", handleLeave);
      });
    };

    attachListeners();

    // Re-attach when DOM changes
    const observer = new MutationObserver(() => attachListeners());
    observer.observe(document.body, { childList: true, subtree: true });

    rafId.current = requestAnimationFrame(animate);

    // Spin animation for the symbol
    if (followerRef.current) {
      const svg = followerRef.current.querySelector("svg");
      if (svg) {
        gsap.to(svg, {
          rotation: 360,
          duration: 6,
          repeat: -1,
          ease: "none",
        });
      }
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId.current);
      observer.disconnect();
      document.querySelectorAll(interactiveSelector).forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, [animate]);

  // Don't render on touch devices (SSR safe)
  return (
    <>
      {/* Main symbol — spark of "locura" */}
      <div
        ref={followerRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ opacity: 0.85, mixBlendMode: "screen" }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 6-pointed spark — represents creative madness */}
          <path
            d="M14 0 L15.5 11 L28 14 L15.5 17 L14 28 L12.5 17 L0 14 L12.5 11 Z"
            fill="url(#sparkGrad)"
            fillOpacity="0.9"
          />
          {/* Inner diagonal cross for extra energy */}
          <path
            d="M5.5 5.5 L12.5 12.5 M22.5 5.5 L15.5 12.5 M22.5 22.5 L15.5 15.5 M5.5 22.5 L12.5 15.5"
            stroke="url(#sparkGrad)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeOpacity="0.6"
          />
          {/* Center dot */}
          <circle cx="14" cy="14" r="1.5" fill="#06ffa5" fillOpacity="0.9" />
          <defs>
            <linearGradient id="sparkGrad" x1="0" y1="0" x2="28" y2="28">
              <stop offset="0%" stopColor="#c4b5fd" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#06ffa5" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Outer ring — trails behind with more delay */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        style={{ opacity: 0.4 }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: "1px solid rgba(139, 92, 246, 0.4)",
            boxShadow: "0 0 15px rgba(139, 92, 246, 0.1)",
          }}
        />
      </div>

      {/* Hide default cursor globally */}
      <style jsx global>{`
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
}
