import { posts, getPostBySlug, getCategoryColor } from "@/data/posts";
import Link from "next/link";
import { notFound } from "next/navigation";
import PostBody from "./PostBody";
import type { Metadata } from "next";

export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const description = post.excerpt.length > 155
    ? post.excerpt.slice(0, 152) + "..."
    : post.excerpt;

  return {
    title: `${post.title} | Libre & Loco`,
    description,
    openGraph: {
      title: post.title,
      description,
      url: `https://libreyloco.com/blog/${slug}`,
      siteName: "Libre & Loco",
      locale: "es_MX",
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const color = getCategoryColor(post.category);

  // Find related posts (same category, different slug)
  const related = posts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 2);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      {/* Header */}
      <header className="px-6 py-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/blog"
            className="text-sm tracking-[0.3em] uppercase transition-colors duration-300 hover:text-[var(--vapor-200)]"
            style={{ color: "var(--fg-muted)" }}
          >
            ← Blog
          </Link>
          <Link
            href="/"
            className="text-sm transition-colors duration-300 hover:text-[var(--vapor-200)]"
            style={{ color: "var(--fg-muted)" }}
          >
            Inicio
          </Link>
        </div>
      </header>

      <article className="px-6 pb-32">
        <div className="max-w-4xl mx-auto">
          {/* Post header */}
          <div className="pt-16 pb-12">
            {/* Meta */}
            <div className="flex items-center gap-4 mb-8">
              <span
                className="text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-full"
                style={{
                  background: `color-mix(in srgb, ${color} 12%, transparent)`,
                  color: color,
                }}
              >
                {post.category}
              </span>
              <span
                className="text-[10px] tracking-wider"
                style={{ color: "var(--fg-dim)" }}
              >
                {new Date(post.date).toLocaleDateString("es-MX", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span
                className="text-[10px] tracking-wider"
                style={{ color: "var(--fg-dim)" }}
              >
                {post.readTime} min de lectura
              </span>
            </div>

            {/* Title */}
            <h1
              className="text-4xl md:text-6xl font-medium leading-tight mb-6"
              style={{ fontFamily: "var(--font-clash)" }}
            >
              {post.title}
            </h1>

            {/* Excerpt */}
            <p
              className="text-lg md:text-xl leading-relaxed"
              style={{ color: "var(--fg-muted)" }}
            >
              {post.excerpt}
            </p>

            {post.book && (
              <p
                className="mt-6 text-sm"
                style={{ color: "var(--fg-dim)" }}
              >
                Inspirado en el libro:{" "}
                <span style={{ color: color }}>{post.book}</span>
              </p>
            )}
          </div>

          {/* Divider */}
          <div className="vapor-divider mb-12" />

          {/* Post content */}
          <PostBody content={post.content} />

          {/* Divider */}
          <div className="vapor-divider my-16" />

          {/* Related posts */}
          {related.length > 0 && (
            <div>
              <h3
                className="text-2xl font-medium mb-8"
                style={{ fontFamily: "var(--font-clash)" }}
              >
                Sigue leyendo
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {related.map((r) => {
                  const rColor = getCategoryColor(r.category);
                  return (
                    <Link
                      key={r.slug}
                      href={`/blog/${r.slug}`}
                      className="glass p-6 group transition-all duration-500 block"
                    >
                      <span
                        className="text-[10px] tracking-[0.2em] uppercase"
                        style={{ color: rColor }}
                      >
                        {r.category}
                      </span>
                      <h4
                        className="text-lg font-medium mt-2 group-hover:text-[var(--vapor-200)] transition-colors duration-300"
                        style={{ fontFamily: "var(--font-clash)" }}
                      >
                        {r.title}
                      </h4>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Back to blog */}
          <div className="mt-16 text-center">
            <Link
              href="/blog"
              className="glass px-8 py-4 rounded-full text-sm tracking-wider uppercase inline-block transition-all duration-300 hover:border-[var(--vapor-300)]"
              style={{ color: "var(--fg-muted)" }}
            >
              Ver todos los artículos →
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
