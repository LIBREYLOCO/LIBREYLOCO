"use client";

import { useEffect, useRef } from "react";

export default function ElevenLabsAgent() {
  const applied = useRef(false);

  useEffect(() => {
    if (applied.current) return;
    applied.current = true;

    const overrideStyles = () => {
      const el = document.querySelector("elevenlabs-convai");
      if (!el?.shadowRoot) return false;

      const style = document.createElement("style");
      style.textContent = `
        :host {
          z-index: 9996 !important;
        }
        button,
        [class*="button"],
        [class*="btn"],
        [class*="trigger"],
        [class*="launcher"] {
          background: rgba(10, 10, 15, 0.9) !important;
          backdrop-filter: blur(16px) !important;
          -webkit-backdrop-filter: blur(16px) !important;
          border: 1px solid rgba(139, 92, 246, 0.3) !important;
          box-shadow: 0 0 25px rgba(139, 92, 246, 0.12), 0 4px 24px rgba(0, 0, 0, 0.3) !important;
          transition: all 0.3s ease !important;
        }
        button:hover,
        [class*="button"]:hover {
          border-color: rgba(139, 92, 246, 0.5) !important;
          box-shadow: 0 0 40px rgba(139, 92, 246, 0.25) !important;
        }
        [class*="panel"],
        [class*="chat"],
        [class*="modal"],
        [class*="popup"],
        [class*="window"] {
          background: rgba(10, 10, 15, 0.95) !important;
          backdrop-filter: blur(24px) !important;
          border: 1px solid rgba(139, 92, 246, 0.2) !important;
          border-radius: 1rem !important;
          box-shadow: 0 0 60px rgba(139, 92, 246, 0.1), 0 20px 60px rgba(0, 0, 0, 0.5) !important;
        }
        svg path {
          fill: #a78bfa !important;
        }
      `;
      el.shadowRoot.appendChild(style);
      return true;
    };

    // Retry until shadow DOM is ready
    const interval = setInterval(() => {
      if (overrideStyles()) clearInterval(interval);
    }, 500);

    // Give up after 15s
    const timeout = setTimeout(() => clearInterval(interval), 15000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return null;
}
