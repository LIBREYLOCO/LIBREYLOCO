"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".contact-reveal").forEach((el) => {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const formData = new FormData(form);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(Object.fromEntries(formData) as Record<string, string>).toString(),
    })
      .then(() => setSubmitted(true))
      .catch(() => alert("Hubo un error. Intenta de nuevo."));

    e.preventDefault();
  };

  return (
    <section ref={sectionRef} id="contacto" className="py-32 md:py-48 px-6 relative">
      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[200px] opacity-10"
        style={{ background: "var(--accent)" }}
      />

      <div className="max-w-4xl mx-auto relative">
        {/* Section header */}
        <div className="contact-reveal flex items-center gap-4 mb-6">
          <span
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: "var(--accent)" }}
          >
            Contacto
          </span>
          <div
            className="flex-1 h-[1px]"
            style={{ background: "var(--glass-border)" }}
          />
        </div>

        <h2
          className="contact-reveal text-3xl md:text-5xl font-medium mb-4 leading-tight"
          style={{ fontFamily: "var(--font-clash)" }}
        >
          ¿Tienes algo que{" "}
          <span className="text-gradient">contarme</span>?
        </h2>
        <p
          className="contact-reveal text-base md:text-lg mb-16"
          style={{ color: "var(--fg-muted)" }}
        >
          Ideas, proyectos, colaboraciones o simplemente una buena conversación.
        </p>

        {submitted ? (
          <div className="contact-reveal glass-heavy p-12 text-center">
            <div className="text-4xl mb-4">✓</div>
            <h3
              className="text-2xl font-medium mb-3"
              style={{ fontFamily: "var(--font-clash)", color: "var(--accent)" }}
            >
              Mensaje enviado
            </h3>
            <p style={{ color: "var(--fg-muted)" }}>
              Gracias por escribirme. Te responderé lo antes posible.
            </p>
          </div>
        ) : (
          <form
            name="contacto"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="contact-reveal space-y-6"
          >
            {/* Netlify hidden fields */}
            <input type="hidden" name="form-name" value="contacto" />
            <p className="hidden">
              <label>
                No llenes esto: <input name="bot-field" />
              </label>
            </p>

            {/* Name + Email row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs tracking-[0.2em] uppercase mb-3"
                  style={{ color: "var(--fg-dim)" }}
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full bg-transparent border-b px-0 py-3 text-base outline-none transition-colors duration-300 focus:border-[var(--vapor-300)] placeholder:text-[var(--fg-dim)]"
                  style={{
                    borderColor: "var(--glass-border)",
                    color: "var(--fg)",
                  }}
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs tracking-[0.2em] uppercase mb-3"
                  style={{ color: "var(--fg-dim)" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full bg-transparent border-b px-0 py-3 text-base outline-none transition-colors duration-300 focus:border-[var(--vapor-300)] placeholder:text-[var(--fg-dim)]"
                  style={{
                    borderColor: "var(--glass-border)",
                    color: "var(--fg)",
                  }}
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label
                htmlFor="subject"
                className="block text-xs tracking-[0.2em] uppercase mb-3"
                style={{ color: "var(--fg-dim)" }}
              >
                Asunto
              </label>
              <select
                id="subject"
                name="subject"
                required
                className="w-full bg-transparent border-b px-0 py-3 text-base outline-none transition-colors duration-300 focus:border-[var(--vapor-300)] cursor-pointer appearance-none"
                style={{
                  borderColor: "var(--glass-border)",
                  color: "var(--fg)",
                }}
                defaultValue=""
              >
                <option value="" disabled style={{ background: "var(--bg)", color: "var(--fg-dim)" }}>
                  Selecciona un tema
                </option>
                <option value="colaboracion" style={{ background: "var(--bg)" }}>Colaboración / Proyecto</option>
                <option value="conferencia" style={{ background: "var(--bg)" }}>Conferencia / Evento</option>
                <option value="libros" style={{ background: "var(--bg)" }}>Sobre mis libros</option>
                <option value="mentoria" style={{ background: "var(--bg)" }}>Mentoría</option>
                <option value="otro" style={{ background: "var(--bg)" }}>Otro</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-xs tracking-[0.2em] uppercase mb-3"
                style={{ color: "var(--fg-dim)" }}
              >
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full bg-transparent border-b px-0 py-3 text-base outline-none transition-colors duration-300 focus:border-[var(--vapor-300)] resize-none placeholder:text-[var(--fg-dim)]"
                style={{
                  borderColor: "var(--glass-border)",
                  color: "var(--fg)",
                }}
                placeholder="Cuéntame qué tienes en mente..."
              />
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                className="group relative px-10 py-4 rounded-full text-sm font-medium tracking-wider uppercase overflow-hidden transition-all duration-500 hover:scale-105 cursor-pointer"
                style={{
                  background: "var(--accent)",
                  color: "var(--bg)",
                }}
              >
                <span className="relative z-10">Enviar mensaje</span>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "linear-gradient(135deg, var(--accent), var(--vapor-300))",
                  }}
                />
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
