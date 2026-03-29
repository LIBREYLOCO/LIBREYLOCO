"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-reveal", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={sectionRef} className="px-6 pb-8 pt-32">
      <div className="max-w-6xl mx-auto">
        {/* Divider */}
        <div className="vapor-divider mb-16" />

        {/* Big CTA text */}
        <div className="footer-reveal mb-20 text-center">
          <p
            className="text-4xl md:text-6xl lg:text-7xl font-medium leading-tight"
            style={{ fontFamily: "var(--font-clash)" }}
          >
            Así quiero seguir:
            <br />
            <span className="text-gradient">libre y loco</span>.
          </p>
          <p
            className="mt-6 text-lg"
            style={{ color: "var(--fg-muted)" }}
          >
            Con los pies en la tierra y el corazón en las personas.
          </p>
        </div>

        {/* Links grid */}
        <div className="footer-reveal grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Location */}
          <div>
            <p
              className="text-xs tracking-[0.2em] uppercase mb-3"
              style={{ color: "var(--fg-dim)" }}
            >
              Actualmente en
            </p>
            <p style={{ color: "var(--fg-muted)" }}>Madrid & Querétaro</p>
          </div>

          {/* Links */}
          <div>
            <p
              className="text-xs tracking-[0.2em] uppercase mb-3"
              style={{ color: "var(--fg-dim)" }}
            >
              Conectemos
            </p>
            <div className="flex flex-col gap-2">
              {[
                {
                  name: "Amazon (Libros)",
                  href: "https://www.amazon.com.mx/stores/Juan-Carlos-Guti%C3%A9rrez-Aladro/author/B0DQFB4NX7",
                },
                {
                  name: "Camino al Éxito",
                  href: "https://caminoalexitoplus.netlify.app/",
                },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm transition-colors duration-300 hover:text-[var(--vapor-200)]"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {link.name} ↗
                </a>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <p
              className="text-xs tracking-[0.2em] uppercase mb-3"
              style={{ color: "var(--fg-dim)" }}
            >
              Ecosistema
            </p>
            <div className="flex flex-col gap-2">
              {[
                { name: "NWL", href: "https://nwl.com.mx/" },
                { name: "Airapí", href: "http://www.airapi.mx/" },
                { name: "Amaité", href: "https://www.amaite.mx/" },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm transition-colors duration-300 hover:text-[var(--vapor-200)]"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {link.name} ↗
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-reveal flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <div className="flex items-center gap-3">
            <Image
              src="/assets/libreyloco_logo_gold.png"
              alt="Libre & Loco"
              width={32}
              height={32}
              loading="lazy"
              className="opacity-80"
            />
            <span
              className="text-xs tracking-wider"
              style={{ color: "var(--fg-dim)" }}
            >
              Libre & Loco © {new Date().getFullYear()}
            </span>
          </div>
          <span
            className="text-[10px] tracking-wider"
            style={{ color: "var(--fg-dim)" }}
          >
            Diseñado con intención por{" "}
            <span style={{ color: "var(--vapor-200)" }}>Ocho Acostado</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
