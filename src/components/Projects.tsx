"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Colegio NWL",
    description:
      "NWL forma personas, no solo alumnos. Su modelo integra desarrollo académico, emocional y personal.",
    logo: "/assets/projects/nwl_logo_new.png",
    stats: ["5 Campus", "Kinder a Preparatoria"],
    href: "https://nwl.com.mx/",
    color: "#BCD4FD",
    span: "md:col-span-2",
  },
  {
    title: "Airapí Memorial Park",
    description:
      "Un tributo a la vida: un espacio diseñado para despedir con paz, belleza y dignidad.",
    logo: "/assets/projects/airapi_logo_new.png",
    stats: ["3 Parques", "QRO · MID · MTY"],
    href: "http://www.airapi.mx/",
    color: "#C9C1FF",
    span: "md:col-span-1",
  },
  {
    title: "Forever Friends",
    description:
      "Honrar el amor incondicional que nos regalan nuestras mascotas con humanidad y corazón.",
    logo: "/assets/projects/forever_friends_logo_new.png",
    stats: ["3 Sedes", "QRO · VER · MTY"],
    href: "https://www.amaite.mx/",
    color: "#F9CCDD",
    span: "md:col-span-1",
  },
  {
    title: "Ocho Acostado",
    subtitle: "Infinite & Growth Intelligence",
    description:
      "Propiedad fraccionada en octavos: casas extraordinarias sin el costo total ni la gestión.",
    logo: "/assets/projects/ocho_acostado.png",
    stats: [],
    href: "/coming-soon",
    color: "#59E7CA",
    span: "md:col-span-1",
  },
  {
    title: "Altura",
    subtitle: "Growth & Brand Intelligence",
    description:
      "Agencia inhouse de publicidad: estrategia, creatividad y contenido alineados al negocio.",
    logo: "/assets/projects/altura_logo_new.png",
    stats: [],
    href: "/coming-soon",
    color: "#E88150",
    span: "md:col-span-1",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card, i) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
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
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-6">
          <span
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: "var(--vapor-200)" }}
          >
            Proyectos
          </span>
          <div
            className="flex-1 h-[1px]"
            style={{ background: "var(--glass-border)" }}
          />
        </div>

        <div className="flex flex-wrap items-baseline gap-4 mb-16">
          <h2
            className="text-3xl md:text-5xl font-medium"
            style={{ fontFamily: "var(--font-clash)" }}
          >
            Ecosistema <span className="text-gradient">vivo</span>
          </h2>
          <span className="text-sm" style={{ color: "var(--fg-dim)" }}>
            (Explora con curiosidad)
          </span>
        </div>

        {/* Projects grid - asymmetric like sutera */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.href}
              target={project.href.startsWith("http") ? "_blank" : undefined}
              rel={
                project.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className={`project-card glass group block p-8 transition-all duration-500 hover:border-opacity-40 ${project.span}`}
              style={
                {
                  "--card-color": project.color,
                  borderColor: "transparent",
                } as React.CSSProperties
              }
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  project.color + "44";
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${project.color}11`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "transparent";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {/* Logo */}
              <div className="relative w-16 h-16 mb-6 rounded-lg overflow-hidden bg-white/5">
                <Image
                  src={project.logo}
                  alt={project.title}
                  fill
                  loading="lazy"
                  className="object-contain p-2"
                  sizes="64px"
                />
              </div>

              {/* Title */}
              <h3
                className="text-xl md:text-2xl font-medium mb-1"
                style={{
                  fontFamily: "var(--font-clash)",
                  color: project.color,
                }}
              >
                {project.title}
              </h3>

              {project.subtitle && (
                <p
                  className="text-xs tracking-wider uppercase mb-4"
                  style={{ color: "var(--fg-dim)" }}
                >
                  {project.subtitle}
                </p>
              )}

              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: "var(--fg-muted)" }}
              >
                {project.description}
              </p>

              {/* Stats */}
              {project.stats.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-4">
                  {project.stats.map((stat) => (
                    <span
                      key={stat}
                      className="text-[10px] tracking-wider uppercase px-3 py-1 rounded-full"
                      style={{
                        background: project.color + "12",
                        color: project.color,
                      }}
                    >
                      {stat}
                    </span>
                  ))}
                </div>
              )}

              {/* Arrow */}
              <span
                className="text-xs tracking-wider uppercase transition-all duration-300 group-hover:tracking-[0.2em]"
                style={{ color: "var(--fg-dim)" }}
              >
                {project.href === "/coming-soon" ? "Próximamente" : "Visitar sitio →"}
              </span>
            </a>
          ))}

          {/* Coming soon card with 4L logo */}
          <div className="project-card glass p-8 flex flex-col items-center justify-center text-center md:col-span-1 min-h-[250px]">
            <div className="proximamente-logo relative w-16 h-16 mb-6">
              <Image
                src="/assets/logo_4l.png"
                alt="Próximamente"
                fill
                loading="lazy"
                className="object-contain"
                sizes="64px"
              />
            </div>
            <h3
              className="text-xl font-medium mb-2"
              style={{
                fontFamily: "var(--font-clash)",
                color: "var(--vapor-200)",
              }}
            >
              Próximamente...
            </h3>
            <p className="text-sm" style={{ color: "var(--fg-dim)" }}>
              La locura no tiene límites, y nosotros tampoco.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
