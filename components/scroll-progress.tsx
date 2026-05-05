"use client";

import { useEffect, useState } from "react";
import { navItems } from "@/lib/content";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? window.scrollY / total : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <>
      <div className="fixed left-0 top-0 z-50 h-[2px] w-full bg-white/5">
        <div className="h-full bg-gradient-to-r from-champagne to-aureate" style={{ width: `${progress * 100}%` }} />
      </div>
      <nav className="fixed bottom-5 left-1/2 z-40 hidden -translate-x-1/2 rounded-full border border-white/10 bg-black/45 px-3 py-2 backdrop-blur-xl md:block">
        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="rounded-full px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/62 transition hover:bg-white/10 hover:text-aureate"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
