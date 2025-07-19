"use client";
import { useEffect, useRef, useState } from "react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    } else if (!isPlaying && audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const handler = () => {
      if (audioRef.current && isPlaying) {
        audioRef.current.play();
      }
    };
    window.addEventListener("click", handler, { once: true });
    return () => window.removeEventListener("click", handler);
  }, [isPlaying]);

  return (
    <>
      <audio
        ref={audioRef}
        src="/Happy_tree.mp3"
        loop
        style={{ display: "none" }}
      />
      <button
        onClick={() => setIsPlaying((p) => !p)}
        aria-label={isPlaying ? "Mute music" : "Play music"}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1000,
          background: "rgba(255,255,255,0.85)",
          border: "1px solid #ccc",
          borderRadius: 9999,
          padding: "0.75em 0.9em",
          fontSize: "1.5em",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          cursor: "pointer",
          transition: "background 0.2s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {isPlaying ? (
          // Speaker icon (unmuted)
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
        ) : (
          // Muted speaker icon
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
        )}
      </button>
    </>
  );
} 