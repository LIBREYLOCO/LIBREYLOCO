"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Intro() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".intro-reveal").forEach((el, i) => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          delay: i * 0.1,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 md:py-48 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section label */}
        <div className="intro-reveal flex items-center gap-4 mb-16">
          <span
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: "var(--vapor-200)" }}
          >
            No una empresa — Solo yo
          </span>
          <div
            className="flex-1 h-[1px]"
            style={{ background: "var(--glass-border)" }}
          />
        </div>

        {/* Main intro text */}
        <div className="intro-reveal mb-20">
          <p
            className="text-2xl md:text-4xl lg:text-5xl leading-snug font-light"
            style={{ fontFamily: "var(--font-clash)" }}
          >
            Soy{" "}
            <span style={{ color: "var(--vapor-200)" }}>
              Juan Carlos Gutiérrez Aladro
            </span>
            . Escritor, conferencista y emprendedor. Mi filosofía se centra en
            cuatro pilares que cambian{" "}
            <span className="text-gradient">todo</span>.
          </p>
        </div>

        {/* Social links */}
        <div className="intro-reveal flex gap-6 mb-24">
          {[
            { name: "Amazon", href: "https://www.amazon.com.mx/stores/Juan-Carlos-Guti%C3%A9rrez-Aladro/author/B0DQFB4NX7" },
            { name: "Instagram", href: "https://instagram.com/vive_al_cien" },
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

        {/* 4L Philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              number: "01",
              title: "Libertad",
              description:
                "No es hacer lo que quieras. Es decidir quién quieres ser y diseñar tu vida con intención.",
              color: "var(--vapor-100)",
            },
            {
              number: "02",
              title: "Liderazgo",
              description:
                "No comienza con personas, cargos o aplausos. Comienza contigo: con disciplina, coherencia y la valentía de exigirte más.",
              color: "var(--vapor-200)",
            },
            {
              number: "03",
              title: "Locura",
              description:
                "Es atreverte cuando otros dudan, avanzar cuando otros esperan y creer cuando aún no hay pruebas.",
              color: "var(--vapor-300)",
            },
            {
              number: "04",
              title: "Legado",
              description:
                "No es lo que acumulas, es lo que dejas. Es construir algo que siga hablando de ti cuando ya no estés.",
              color: "var(--accent)",
            },
          ].map((pillar) => (
            <div
              key={pillar.number}
              className="intro-reveal glass p-8 md:p-10 group hover:border-[var(--vapor-300)] transition-all duration-500"
              style={{ borderColor: "transparent" }}
            >
              <div className="flex items-start justify-between mb-6">
                <span
                  className="text-xs tracking-wider"
                  style={{ color: "var(--fg-dim)" }}
                >
                  {pillar.number}.
                </span>
                <div
                  className="w-2 h-2 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
                  style={{ background: pillar.color }}
                />
              </div>
              <h3
                className="text-2xl md:text-3xl mb-4 font-medium"
                style={{
                  fontFamily: "var(--font-clash)",
                  color: pillar.color,
                }}
              >
                {pillar.title}
              </h3>
              <p
                className="text-sm md:text-base leading-relaxed"
                style={{ color: "var(--fg-muted)" }}
              >
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
