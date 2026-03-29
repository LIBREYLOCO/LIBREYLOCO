import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Libre & Loco | Filosofía y Transformación",
  description:
    "Construyo ecosistemas que integran educación, negocio y desarrollo personal para transformar vidas y generar legado.",
  openGraph: {
    title: "Libre & Loco | Filosofía y Transformación",
    description:
      "Escritor, conferencista y emprendedor. Filosofía de vida basada en Libertad, Legado, Liderazgo y Locura.",
    url: "https://libreyloco.com",
    siteName: "Libre & Loco",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Libre & Loco",
    description: "Vivir al cien no es una meta. Es la única forma de vivir.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Juan Carlos Gutiérrez Aladro",
  url: "https://libreyloco.com",
  description:
    "Escritor, conferencista y emprendedor. Filosofía de vida basada en Libertad, Legado, Liderazgo y Locura.",
  jobTitle: "Escritor, Conferencista y Emprendedor",
  sameAs: [
    "https://www.amazon.com.mx/stores/Juan-Carlos-Guti%C3%A9rrez-Aladro/author/B0DQFB4NX7",
    "https://instagram.com/vive_al_cien",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&f[]=satoshi@300,400,500,700&display=swap"
          rel="stylesheet"
        />

        {/* ElevenLabs Convai Widget script */}
        <script
          src="https://unpkg.com/@elevenlabs/convai-widget-embed"
          async
          type="text/javascript"
        />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {/* Hidden form for Netlify detection at build time */}
        <form name="contacto" data-netlify="true" netlify-honeypot="bot-field" hidden>
          <input type="text" name="name" />
          <input type="email" name="email" />
          <select name="subject"><option value=""></option></select>
          <textarea name="message"></textarea>
        </form>

        {children}

        {/* @ts-expect-error Custom element from ElevenLabs */}
        <elevenlabs-convai agent-id="agent_01jz3g2131e3n8f2c21zf7tkge"></elevenlabs-convai>
      </body>
    </html>
  );
}
