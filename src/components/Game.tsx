"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Game() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".game-reveal").forEach((el) => {
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
        });
      });

      // Logo floating
      gsap.to(".game-logo", {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 md:py-48 px-6 relative">
      {/* Background accent glow */}
      <div
        className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full blur-[200px] opacity-8"
        style={{ background: "var(--accent)" }}
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Section header */}
        <div className="game-reveal flex items-center gap-4 mb-6">
          <span
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: "var(--accent)" }}
          >
            Camino al Éxito
          </span>
          <div
            className="flex-1 h-[1px]"
            style={{ background: "var(--glass-border)" }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Logo + Images */}
          <div className="game-reveal">
            <div className="game-logo relative w-full max-w-md mx-auto mb-8">
              <Image
                src="/assets/game_logo_3d.png"
                alt="Camino al Éxito"
                width={500}
                height={400}
                className="w-full h-auto drop-shadow-2xl"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image
                  src="/assets/game_friends_playing.jpg"
                  alt="Amigos jugando Camino al Éxito"
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="250px"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image
                  src="/assets/game_infographic.jpg"
                  alt="Infografía de Camino al Éxito"
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="250px"
                />
              </div>
            </div>
          </div>

          {/* Right: Description */}
          <div>
            <h2
              className="game-reveal text-3xl md:text-5xl font-medium leading-tight mb-8"
              style={{ fontFamily: "var(--font-clash)" }}
            >
              No es solo un juego.
              <br />
              Es una{" "}
              <span style={{ color: "var(--accent)" }}>experiencia</span>.
            </h2>

            <div
              className="game-reveal space-y-5 text-base md:text-lg leading-relaxed mb-10"
              style={{ color: "var(--fg-muted)" }}
            >
              <p>
                Camino al Éxito te sacude, te reta y te hace reír mientras tomas
                decisiones que se sienten tan reales como la vida misma.
              </p>
              <p>
                Aquí puedes volverte millonario, quedarte sin un peso, perder la
                salud, recuperar la felicidad o tomar decisiones tan locas que
                todos en la mesa se quedan en silencio… y luego estallan de risa.
              </p>
              <p>
                Es intenso, ágil, caótico, emocionante y adictivo.{" "}
                <span style={{ color: "var(--fg)" }}>
                  Porque en Camino al Éxito, como en la vida, todo puede cambiar
                  en una sola tirada.
                </span>
              </p>
            </div>

            {/* CTAs */}
            <div className="game-reveal flex flex-wrap gap-4">
              <a
                href="https://caminoalexitoplus.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:scale-105"
                style={{
                  background: "var(--accent)",
                  color: "var(--bg)",
                }}
              >
                Juega gratis
              </a>
              <a
                href="/coming-soon"
                className="glass px-8 py-4 rounded-full text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:border-[var(--accent)]"
                style={{ color: "var(--fg-muted)" }}
              >
                Versión física →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
