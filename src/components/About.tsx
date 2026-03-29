"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".about-reveal").forEach((el) => {
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

      // Photo parallax
      gsap.to(".about-photo", {
        y: -40,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 md:py-48 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <div className="about-reveal flex items-center gap-4 mb-16">
          <span
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: "var(--vapor-200)" }}
          >
            Sobre mí
          </span>
          <div
            className="flex-1 h-[1px]"
            style={{ background: "var(--glass-border)" }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Photo */}
          <div className="lg:col-span-2 about-reveal">
            <div className="about-photo relative aspect-[3/4] rounded-2xl overflow-hidden glow-purple">
              <Image
                src="/assets/juan_carlos_photo.jpg"
                alt="Juan Carlos Gutiérrez Aladro"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              {/* Glass overlay at bottom */}
              <div
                className="absolute bottom-0 inset-x-0 p-6"
                style={{
                  background:
                    "linear-gradient(to top, rgba(10,10,15,0.9), transparent)",
                }}
              >
                <p
                  className="text-sm"
                  style={{ color: "var(--fg-muted)" }}
                >
                  Entre Madrid y Querétaro
                </p>
                <p
                  className="text-lg font-medium"
                  style={{ fontFamily: "var(--font-clash)" }}
                >
                  Escritor · Conferencista · Emprendedor
                </p>
              </div>
            </div>
          </div>

          {/* Bio content */}
          <div className="lg:col-span-3 flex flex-col justify-center">
            <h2
              className="about-reveal text-3xl md:text-5xl font-medium leading-tight mb-10"
              style={{ fontFamily: "var(--font-clash)" }}
            >
              Construyendo bases para una realidad donde{" "}
              <span className="text-gradient">la filosofía impulsa la acción</span>.
            </h2>

            <div
              className="about-reveal space-y-6 text-base md:text-lg leading-relaxed mb-10"
              style={{ color: "var(--fg-muted)" }}
            >
              <p>
                He sido emprendedor desde joven, fundando proyectos y dirigiendo
                equipos, con fracasos y aprendizajes que me impulsaron a crecer.
              </p>
              <p>
                Fundé colegios, creé funerarias de lujo como{" "}
                <span style={{ color: "var(--vapor-200)" }}>
                  Airapí y Amaité
                </span>
                , y escribí para transformar vidas con historias y principios
                reales.
              </p>
              <p>
                Me defino como alguien que no busca acumular, sino dejar huella
                con sentido. Vivo entre Madrid y Querétaro, amo caminar, leer y
                conversar con quienes me abren su historia.
              </p>
            </div>

            {/* Info pills */}
            <div className="about-reveal flex flex-wrap gap-3">
              {[
                "5 Campus NWL",
                "3 Parques Memoriales",
                "3 Libros publicados",
                "1 Juego de mesa",
              ].map((tag) => (
                <span
                  key={tag}
                  className="glass px-4 py-2 text-xs tracking-wider uppercase"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
