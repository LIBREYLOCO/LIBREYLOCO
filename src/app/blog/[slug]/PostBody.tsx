"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function parseMarkdown(md: string): string {
  return md
    .trim()
    // Images: ![alt](src)
    .replace(
      /^!\[([^\]]*)\]\(([^)]+)\)$/gm,
      '<figure class="post-figure"><div class="post-img-wrapper"><img src="$2" alt="$1" class="post-img" loading="lazy" /><div class="post-img-overlay"></div></div><figcaption class="post-figcaption">$1</figcaption></figure>'
    )
    .replace(/^### (.+)$/gm, '<h3 class="post-h3">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="post-h2">$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(
      /^(\d+)\. \*\*(.+?)\*\* — (.+)$/gm,
      '<li class="post-li"><strong>$2</strong> — $3</li>'
    )
    .replace(
      /^- \*\*(.+?)\*\* — (.+)$/gm,
      '<li class="post-li"><strong>$1</strong> — $2</li>'
    )
    .replace(/^- (.+)$/gm, '<li class="post-li">$1</li>')
    .replace(
      /(<li class="post-li">[\s\S]*?<\/li>)\n(?!<li)/g,
      "$1</ul>\n"
    )
    .replace(/(?<!<\/li>)\n(<li class="post-li">)/g, '<ul class="post-ul">$1')
    .replace(/^(?!<[hulo]|<li|<\/[uo]|<fig)(.+)$/gm, (match) => {
      if (match.trim() === "") return "";
      return `<p class="post-p">${match}</p>`;
    })
    .replace(/<p class="post-p"><\/p>/g, "");
}

export default function PostBody({ content }: { content: string }) {
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils
        .toArray<HTMLElement>(".post-h2, .post-h3, .post-p, .post-li, .post-figure")
        .forEach((el) => {
          const isFigure = el.classList.contains("post-figure");
          gsap.from(el, {
            y: isFigure ? 40 : 20,
            opacity: 0,
            scale: isFigure ? 0.97 : 1,
            duration: isFigure ? 1 : 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          });
        });
    }, bodyRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={bodyRef}
      className="post-body"
      dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
      style={
        {
          "--post-spacing": "1.5rem",
        } as React.CSSProperties
      }
    />
  );
}
