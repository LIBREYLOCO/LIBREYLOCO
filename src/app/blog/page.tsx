import Link from "next/link";
import BlogClient from "./BlogClient";

export const metadata = {
  title: "Blog | Libre & Loco",
  description:
    "Reflexiones sobre libertad, liderazgo, locura y legado. Ideas que nacen de los libros y la experiencia de Juan Carlos Gutiérrez Aladro.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      {/* Header */}
      <header className="px-6 py-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-sm tracking-[0.3em] uppercase transition-colors duration-300 hover:text-[var(--vapor-200)]"
            style={{ color: "var(--fg-muted)" }}
          >
            ← Libre & Loco
          </Link>
          <Link
            href="/#contacto"
            className="text-sm transition-colors duration-300 hover:text-[var(--vapor-200)]"
            style={{ color: "var(--fg-muted)" }}
          >
            Contacto
          </Link>
        </div>
      </header>

      <main className="px-6 pb-32">
        <div className="max-w-6xl mx-auto">
          {/* Page title */}
          <div className="pt-16 pb-20">
            <h1
              className="text-5xl md:text-7xl font-medium mb-6"
              style={{ fontFamily: "var(--font-clash)" }}
            >
              <span className="text-gradient">Ideas</span> que mueven
            </h1>
            <p
              className="text-lg md:text-xl max-w-2xl"
              style={{ color: "var(--fg-muted)" }}
            >
              Reflexiones sobre los cuatro pilares: libertad, liderazgo, locura
              y legado. Nacen de los libros, los proyectos y la vida real.
            </p>
          </div>

          {/* Category filters + Posts grid (client component) */}
          <BlogClient />
        </div>
      </main>
    </div>
  );
}
