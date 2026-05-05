"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  src: string;
  poster: string;
  className?: string;
  priority?: boolean;
};

export function CinematicVideo({ src, poster, className = "", priority = false }: Props) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {!failed && (
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload={priority ? "auto" : "metadata"}
          poster={poster}
          onError={() => setFailed(true)}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
      {failed && (
        <Image
          src={poster}
          alt=""
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover"
        />
      )}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.84),rgba(0,0,0,.35)_48%,rgba(0,0,0,.8)),linear-gradient(180deg,rgba(0,0,0,.36),rgba(0,0,0,.18)_42%,#050505)]" />
    </div>
  );
}
