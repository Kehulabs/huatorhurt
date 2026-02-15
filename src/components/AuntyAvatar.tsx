"use client";

import { useState, useEffect } from "react";

const AUNTY_LINES = [
  "Wah, still single ah?",
  "Your cousin same age already got house",
  "Eat more lah... actually nvm",
  "So what's your salary now?",
  "When getting married?",
  "Last time I your age already got 3 kids",
  "You lost weight or gained ah?",
  "Aiya why you study so long",
];

interface AuntyAvatarProps {
  size?: "large" | "small";
  showBubble?: boolean;
  className?: string;
}

function AuntySVG({ size }: { size: "large" | "small" }) {
  const s = size === "large" ? 140 : 56;
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="select-none"
    >
      {/* Permed hair - big curly volume */}
      <ellipse cx="70" cy="52" rx="42" ry="40" fill="#2A1A0E" />
      {/* Hair curls - top */}
      <circle cx="38" cy="30" r="14" fill="#3D2518" />
      <circle cx="55" cy="20" r="13" fill="#3D2518" />
      <circle cx="72" cy="17" r="14" fill="#3D2518" />
      <circle cx="89" cy="20" r="13" fill="#3D2518" />
      <circle cx="103" cy="30" r="13" fill="#3D2518" />
      {/* Hair curls - sides */}
      <circle cx="30" cy="48" r="12" fill="#3D2518" />
      <circle cx="110" cy="48" r="12" fill="#3D2518" />
      {/* Hair highlight curls */}
      <circle cx="50" cy="22" r="6" fill="#4A3020" />
      <circle cx="75" cy="19" r="6" fill="#4A3020" />
      <circle cx="95" cy="24" r="5" fill="#4A3020" />

      {/* Face */}
      <ellipse cx="70" cy="65" rx="30" ry="32" fill="#F5C5A3" />

      {/* Cheek blush */}
      <ellipse cx="48" cy="72" rx="8" ry="5" fill="#F4A0A0" opacity="0.5" />
      <ellipse cx="92" cy="72" rx="8" ry="5" fill="#F4A0A0" opacity="0.5" />

      {/* Glasses - thick round frames */}
      <circle cx="57" cy="62" r="12" stroke="#8B4513" strokeWidth="2.5" fill="none" />
      <circle cx="83" cy="62" r="12" stroke="#8B4513" strokeWidth="2.5" fill="none" />
      {/* Glasses bridge */}
      <path d="M69 62 Q70 58 71 62" stroke="#8B4513" strokeWidth="2" fill="none" />
      {/* Glasses arms */}
      <line x1="45" y1="60" x2="33" y2="56" stroke="#8B4513" strokeWidth="2" />
      <line x1="95" y1="60" x2="107" y2="56" stroke="#8B4513" strokeWidth="2" />

      {/* Eyes - judgmental side-eye */}
      <ellipse cx="57" cy="62" rx="5" ry="5.5" fill="white" />
      <ellipse cx="83" cy="62" rx="5" ry="5.5" fill="white" />
      {/* Pupils - looking to the side (judging) */}
      <circle cx="59" cy="62" r="3" fill="#1A1A1A" />
      <circle cx="85" cy="62" r="3" fill="#1A1A1A" />
      {/* Eye shine */}
      <circle cx="60" cy="61" r="1" fill="white" />
      <circle cx="86" cy="61" r="1" fill="white" />

      {/* Eyebrows - one raised */}
      <path d="M48 52 Q57 47 66 52" stroke="#2A1A0E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M74 49 Q83 44 92 50" stroke="#2A1A0E" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* Nose */}
      <path d="M68 70 Q70 74 72 70" stroke="#D4A076" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      {/* Mouth - slight smirk */}
      <path d="M60 80 Q65 84 70 83 Q75 82 80 78" stroke="#C47A5A" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Body/dress - cheongsam-inspired top */}
      <path
        d="M40 97 Q42 92 50 90 Q60 88 70 88 Q80 88 90 90 Q98 92 100 97 L105 140 L35 140 Z"
        fill="#C41E3A"
      />
      {/* Cheongsam collar */}
      <path d="M60 90 Q65 95 70 90 Q75 95 80 90" stroke="#FFD700" strokeWidth="1.5" fill="none" />
      {/* Gold frog button */}
      <circle cx="76" cy="100" r="2.5" fill="#FFD700" />
      <path d="M76 97 Q80 98 78 102" stroke="#FFD700" strokeWidth="1" fill="none" />

      {/* Arms crossed */}
      {/* Left arm */}
      <path
        d="M40 97 Q32 105 34 115 Q36 120 50 118 Q58 116 62 112"
        fill="#C41E3A"
        stroke="#A01830"
        strokeWidth="0.5"
      />
      {/* Right arm over left */}
      <path
        d="M100 97 Q108 105 106 115 Q104 120 90 118 Q78 116 72 112"
        fill="#C41E3A"
        stroke="#A01830"
        strokeWidth="0.5"
      />
      {/* Hands */}
      <ellipse cx="62" cy="113" rx="7" ry="5" fill="#F5C5A3" transform="rotate(-10 62 113)" />
      <ellipse cx="78" cy="113" rx="7" ry="5" fill="#F5C5A3" transform="rotate(10 78 113)" />

      {/* Gold necklace */}
      <path d="M55 90 Q60 96 70 97 Q80 96 85 90" stroke="#FFD700" strokeWidth="1.5" fill="none" />
      <circle cx="70" cy="97" r="3" fill="#FFD700" />
    </svg>
  );
}

export default function AuntyAvatar({ size = "large", showBubble = true, className = "" }: AuntyAvatarProps) {
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    if (!showBubble) return;
    const interval = setInterval(() => {
      setLineIndex((prev) => (prev + 1) % AUNTY_LINES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [showBubble]);

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative">
        {/* Speech bubble */}
        {showBubble && (
          <div
            className="absolute -top-14 left-1/2 -translate-x-1/2 w-max max-w-[220px] px-4 py-2 rounded-2xl text-center"
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              color: "#3D0C00",
              fontSize: size === "large" ? 13 : 10,
              fontWeight: 600,
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
              animation: "bubblePop 0.3s ease-out",
            }}
            key={lineIndex}
          >
            {AUNTY_LINES[lineIndex]}
            {/* Bubble tail */}
            <div
              className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-0 h-0"
              style={{
                borderLeft: "6px solid transparent",
                borderRight: "6px solid transparent",
                borderTop: "8px solid rgba(255, 255, 255, 0.95)",
              }}
            />
          </div>
        )}

        {/* Aunty character */}
        <div
          style={{
            filter: size === "large"
              ? "drop-shadow(0 4px 20px rgba(196, 30, 58, 0.3))"
              : "drop-shadow(0 2px 8px rgba(196, 30, 58, 0.2))",
          }}
        >
          <AuntySVG size={size} />
        </div>
      </div>
    </div>
  );
}
