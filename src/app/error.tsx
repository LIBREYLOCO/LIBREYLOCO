"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: "var(--bg)" }}
    >
      <div className="text-center max-w-xl">
        <span
          className="text-xs tracking-[0.3em] uppercase mb-6 block"
          style={{ color: "var(--vapor-300)" }}
        >
          Error
        </span>
        <h1
          className="text-4xl md:text-6xl font-medium mb-6"
          style={{ fontFamily: "var(--font-clash)" }}
        >
          Algo salió <span className="text-gradient">mal</span>
        </h1>
        <p
          className="text-lg mb-12"
          style={{ color: "var(--fg-muted)" }}
        >
          Ocurrió un error inesperado. Intenta de nuevo.
        </p>
        <button
          onClick={reset}
          className="glass px-8 py-4 rounded-full text-sm tracking-wider uppercase transition-all duration-300 hover:border-[var(--vapor-300)] cursor-pointer"
          style={{ color: "var(--fg-muted)" }}
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
}
