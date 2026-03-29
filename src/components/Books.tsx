"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const books = [
  {
    title: "VIVE AL CIEN",
    description:
      "Impulsa a tomar las riendas de tu vida y vivir con intención, valentía y propósito.",
    cover: "/assets/vive_al_cien_cover.jpg",
    href: "https://www.amazon.com.mx/VIVE-AL-CIEN-Libertad-Liderazgo-ebook/dp/B0DQF13MQ3",
    color: "var(--vapor-300)",
    aspect: "aspect-[2/3]",
  },
  {
    title: "AÚN",
    description:
      "Transforma la forma en que entiendes el fracaso. Lo que parece un punto final puede ser solo una pausa.",
    cover: "/assets/aun_cover.png",
    href: "https://www.amazon.com.mx/A%C3%9AN-Tres-letras-transforman-vida/dp/B0FNQNZB16",
    color: "var(--accent)",
    aspect: "aspect-[2/3]",
  },
  {
    title: "EL QUIOSCO DE LAS IDEAS LOCAS",
    description:
      "Libro divertido para grandes pequeños emprendedores donde la imaginación manda.",
    cover: "/assets/ideas_locas_cover.jpg",
    href: "https://www.amazon.com.mx/El-Quiosco-las-Ideas-Locas-ebook/dp/B0FN87CPJ2",
    color: "var(--vapor-100)",
    aspect: "aspect-[2/3]",
  },
];

export default function Books() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".book-card").forEach((card, i) => {
        gsap.from(card, {
          y: 80,
          opacity: 0,
          rotateY: i % 2 === 0 ? -5 : 5,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          delay: i * 0.15,
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
            Mis libros
          </span>
          <div
            className="flex-1 h-[1px]"
            style={{ background: "var(--glass-border)" }}
          />
        </div>

        <h2
          className="text-3xl md:text-5xl font-medium mb-16"
          style={{ fontFamily: "var(--font-clash)" }}
        >
          Historias que{" "}
          <span className="text-gradient">transforman</span>
        </h2>

        {/* Books grid - asymmetric */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {books.map((book, i) => (
            <a
              key={book.title}
              href={book.href}
              target="_blank"
              rel="noopener noreferrer"
              className="book-card group block"
              style={{ marginTop: i === 1 ? "3rem" : 0 }}
            >
              {/* Cover */}
              <div
                className={`relative ${book.aspect} rounded-xl overflow-hidden mb-6 transition-transform duration-500 group-hover:scale-[1.02]`}
              >
                <Image
                  src={book.cover}
                  alt={book.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at center, ${book.color}22, transparent 70%)`,
                  }}
                />
              </div>

              {/* Info */}
              <h3
                className="text-xl md:text-2xl font-medium mb-3 transition-colors duration-300"
                style={{
                  fontFamily: "var(--font-clash)",
                  color: book.color,
                }}
              >
                {book.title}
              </h3>
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: "var(--fg-muted)" }}
              >
                {book.description}
              </p>
              <span
                className="text-xs tracking-wider uppercase transition-colors duration-300 group-hover:text-[var(--accent)]"
                style={{ color: "var(--fg-dim)" }}
              >
                Ordena ya →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
