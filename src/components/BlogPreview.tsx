"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { posts, getCategoryColor } from "@/data/posts";

gsap.registerPlugin(ScrollTrigger);

export default function BlogPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const latestPosts = posts.slice(0, 3);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".blog-preview-reveal").forEach((el) => {
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

  return (
    <section ref={sectionRef} className="py-32 md:py-48 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="blog-preview-reveal flex items-center gap-4 mb-6">
          <span
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: "var(--vapor-200)" }}
          >
            Blog
          </span>
          <div
            className="flex-1 h-[1px]"
            style={{ background: "var(--glass-border)" }}
          />
        </div>

        <div className="blog-preview-reveal flex flex-wrap items-baseline justify-between gap-4 mb-16">
          <h2
            className="text-3xl md:text-5xl font-medium"
            style={{ fontFamily: "var(--font-clash)" }}
          >
            Ideas que <span className="text-gradient">mueven</span>
          </h2>
          <Link
            href="/blog"
            className="text-sm tracking-wider uppercase transition-colors duration-300 hover:text-[var(--vapor-200)]"
            style={{ color: "var(--fg-dim)" }}
          >
            Ver todos →
          </Link>
        </div>

        {/* 3 latest posts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestPosts.map((post, i) => {
            const color = getCategoryColor(post.category);
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="blog-preview-reveal group glass p-8 transition-all duration-500 block"
                style={{
                  marginTop: i === 1 ? "2rem" : 0,
                }}
              >
                {/* Category badge */}
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
                <h3
                  className="text-lg md:text-xl font-medium mb-3 leading-snug group-hover:text-[var(--vapor-200)] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-clash)" }}
                >
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p
                  className="text-sm leading-relaxed line-clamp-3"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {post.excerpt}
                </p>

                {/* Read more */}
                <span
                  className="inline-block mt-4 text-xs tracking-wider uppercase group-hover:tracking-[0.2em] transition-all duration-300"
                  style={{ color: "var(--fg-dim)" }}
                >
                  Leer →
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
