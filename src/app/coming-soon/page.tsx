import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Próximamente | Libre & Loco",
  description: "Este proyecto está en desarrollo. Vuelve pronto para más novedades.",
};

export default function ComingSoonPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: "var(--bg)" }}
    >
      <div className="text-center max-w-xl">
        <span
          className="text-xs tracking-[0.3em] uppercase mb-6 block"
          style={{ color: "var(--vapor-200)" }}
        >
          Próximamente
        </span>
        <h1
          className="text-4xl md:text-6xl font-medium mb-6"
          style={{ fontFamily: "var(--font-clash)" }}
        >
          Algo <span className="text-gradient">grande</span> viene
        </h1>
        <p
          className="text-lg mb-12"
          style={{ color: "var(--fg-muted)" }}
        >
          Este proyecto está en desarrollo. La locura no tiene límites, y
          nosotros tampoco.
        </p>
        <Link
          href="/"
          className="glass px-8 py-4 rounded-full text-sm tracking-wider uppercase inline-block transition-all duration-300 hover:border-[var(--vapor-300)]"
          style={{ color: "var(--fg-muted)" }}
        >
          ← Volver al inicio
        </Link>
      </div>
    </div>
  );
}
