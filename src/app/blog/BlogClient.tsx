"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { posts, getCategoryColor } from "@/data/posts";
import type { BlogPost } from "@/data/posts";

const categories = [
  { name: "Todos", value: null, color: "var(--fg)" },
  { name: "Libertad", value: "libertad" as const, color: "var(--vapor-100)" },
  { name: "Liderazgo", value: "liderazgo" as const, color: "var(--vapor-200)" },
  { name: "Locura", value: "locura" as const, color: "var(--vapor-300)" },
  { name: "Legado", value: "legado" as const, color: "var(--accent)" },
];

export default function BlogClient() {
  const [activeCategory, setActiveCategory] = useState<BlogPost["category"] | null>(null);

  const filteredPosts = activeCategory
    ? posts.filter((p) => p.category === activeCategory)
    : posts;

  useEffect(() => {
    gsap.from(".blog-card-anim", {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.2,
    });
  }, [activeCategory]);

  return (
    <>
      {/* Category filters */}
      <div className="flex flex-wrap gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setActiveCategory(cat.value)}
            className="glass px-5 py-2 text-xs tracking-[0.15em] uppercase transition-all duration-300 hover:border-[var(--vapor-300)] cursor-pointer"
            style={{
              color: cat.color,
              borderColor:
                activeCategory === cat.value
                  ? "var(--vapor-300)"
                  : undefined,
              background:
                activeCategory === cat.value
                  ? "var(--glass-heavy)"
                  : undefined,
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Posts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post, i) => {
          const color = getCategoryColor(post.category);
          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="blog-card-anim group glass p-8 transition-all duration-500 hover:border-opacity-40 block"
              style={{
                marginTop: i === 1 ? "2rem" : 0,
              }}
            >
              {/* Category + date */}
              <div className="flex items-center justify-between mb-6">
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
                  {post.readTime} min
                </span>
              </div>

              {/* Title */}
              <h2
                className="text-xl md:text-2xl font-medium mb-4 leading-snug group-hover:text-[var(--vapor-200)] transition-colors duration-300"
                style={{ fontFamily: "var(--font-clash)" }}
              >
                {post.title}
              </h2>

              {/* Excerpt */}
              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: "var(--fg-muted)" }}
              >
                {post.excerpt}
              </p>

              {/* Book tag + arrow */}
              <div className="flex items-center justify-between">
                {post.book && (
                  <span
                    className="text-[10px] tracking-wider"
                    style={{ color: "var(--fg-dim)" }}
                  >
                    Del libro: {post.book}
                  </span>
                )}
                <span
                  className="text-xs tracking-wider uppercase group-hover:tracking-[0.2em] transition-all duration-300"
                  style={{ color: "var(--fg-dim)" }}
                >
                  Leer →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
