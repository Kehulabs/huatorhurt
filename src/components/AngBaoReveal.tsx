"use client";

import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import AuntyAvatar from "@/components/AuntyAvatar";
import { cnyAudio } from "@/lib/audio";

interface AngBaoRevealProps {
  name: string;
  energyScore: number;
  roastMessage: string;
  blessing: string;
  secretMessage: string;
}

function getScoreColor(score: number) {
  if (score >= 81) return { gradient: "from-yellow-300 via-amber-400 to-orange-500", glow: "rgba(251, 191, 36, 0.5)", label: "#FBBF24", bar: "linear-gradient(90deg, #F59E0B, #FBBF24, #FDE68A)" };
  if (score >= 61) return { gradient: "from-fuchsia-400 via-pink-400 to-rose-500", glow: "rgba(236, 72, 153, 0.4)", label: "#EC4899", bar: "linear-gradient(90deg, #DB2777, #EC4899, #F9A8D4)" };
  if (score >= 41) return { gradient: "from-cyan-400 via-blue-400 to-indigo-500", glow: "rgba(34, 211, 238, 0.4)", label: "#22D3EE", bar: "linear-gradient(90deg, #0891B2, #22D3EE, #67E8F9)" };
  if (score >= 21) return { gradient: "from-orange-400 via-red-400 to-rose-500", glow: "rgba(251, 146, 60, 0.4)", label: "#FB923C", bar: "linear-gradient(90deg, #EA580C, #FB923C, #FDBA74)" };
  return { gradient: "from-gray-400 via-slate-400 to-zinc-500", glow: "rgba(148, 163, 184, 0.3)", label: "#94A3B8", bar: "linear-gradient(90deg, #64748B, #94A3B8, #CBD5E1)" };
}

function getScoreLabel(score: number): { text: string; emoji: string } {
  if (score >= 81) return { text: "AUNTIE APPROVED", emoji: "👑" };
  if (score >= 61) return { text: "CAN MAKE IT LAH", emoji: "👍" };
  if (score >= 41) return { text: "SO-SO ONLY", emoji: "😐" };
  if (score >= 21) return { text: "NEED TO TRY HARDER", emoji: "😬" };
  return { text: "HOPELESS CASE", emoji: "💀" };
}

// Floating emojis for envelope phase — wholesome CNY vibes (no hints!)
const FLOAT_EMOJIS = ["🧧", "💰", "✨", "🎊", "🏮", "🎋", "🍊", "🎆"];

// Jagged tear clip paths for fortune cracker effect
const TEAR_LEFT_CLIP = "polygon(0% 0%, 52% 0%, 48% 6%, 53% 12%, 47% 18%, 52% 24%, 48% 30%, 53% 36%, 47% 42%, 52% 48%, 48% 54%, 53% 60%, 47% 66%, 52% 72%, 48% 78%, 53% 84%, 47% 90%, 52% 96%, 48% 100%, 0% 100%)";
const TEAR_RIGHT_CLIP = "polygon(52% 0%, 100% 0%, 100% 100%, 48% 100%, 52% 96%, 47% 90%, 53% 84%, 48% 78%, 52% 72%, 47% 66%, 53% 60%, 48% 54%, 52% 48%, 47% 42%, 53% 36%, 48% 30%, 52% 24%, 47% 18%, 53% 12%, 48% 6%)";

export default function AngBaoReveal({
  name,
  energyScore,
  roastMessage,
  blessing,
  secretMessage,
}: AngBaoRevealProps) {
  const [phase, setPhase] = useState<"envelope" | "opening" | "revealed">("envelope");
  const [displayScore, setDisplayScore] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);
  const [envelopeFlipped, setEnvelopeFlipped] = useState(false);
  const hasSecret = secretMessage.trim().length > 0;
  const celebrationPlayed = useRef(false);

  // Pre-generate random values for floating emojis (stable across renders)
  const floatingEmojis = useMemo(() =>
    Array.from({ length: 10 }, (_, i) => ({
      emoji: FLOAT_EMOJIS[i % FLOAT_EMOJIS.length],
      left: `${5 + (i * 9.3) % 90}%`,
      delay: `${(i * 0.7) % 4}s`,
      duration: `${3 + (i * 1.1) % 3}s`,
      size: 16 + (i * 3) % 16,
    })), []);

  // Pre-generate gold sparks for the fortune cracker tear
  const tearSparks = useMemo(() =>
    Array.from({ length: 18 }, (_, i) => {
      const angle = ((i / 18) * Math.PI * 2) + (Math.PI / 18 * (i % 3));
      const distance = 70 + (i * 29) % 130;
      return {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        delay: 0.42 + (i * 0.035),
        duration: 0.6 + (i * 0.04) % 0.5,
        size: 3 + (i * 2) % 7,
      };
    }), []);

  const handleTap = useCallback(() => {
    if (phase !== "envelope") return;
    // Audio: gong hit + start background music
    cnyAudio?.playGong();
    cnyAudio?.startBackground();
    setPhase("opening");
  }, [phase]);

  // Opening -> revealed after 2.2s
  useEffect(() => {
    if (phase !== "opening") return;
    // Play tear sound timed with animation (0.5s shake then tear)
    const tearTimer = setTimeout(() => cnyAudio?.playTear(), 450);
    const timer = setTimeout(() => setPhase("revealed"), 2200);
    return () => {
      clearTimeout(tearTimer);
      clearTimeout(timer);
    };
  }, [phase]);

  // Score count-up animation
  useEffect(() => {
    if (phase !== "revealed") return;
    // Play celebration fanfare on reveal
    if (!celebrationPlayed.current) {
      celebrationPlayed.current = true;
      cnyAudio?.playCelebration();
    }
    const duration = 1800;
    const startTime = performance.now();
    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress < 0.7
        ? (progress / 0.7) * 1.15
        : 1.15 - 0.15 * ((progress - 0.7) / 0.3);
      setDisplayScore(Math.round(Math.min(eased, 1.15) * energyScore));
      if (progress < 1) requestAnimationFrame(animate);
      else setDisplayScore(energyScore);
    }
    requestAnimationFrame(animate);
  }, [phase, energyScore]);

  // Stop background music on unmount
  useEffect(() => {
    return () => { cnyAudio?.stopBackground(); };
  }, []);

  const scoreStyle = getScoreColor(energyScore);
  const scoreLabel = getScoreLabel(energyScore);

  const muteButton = (
    <button
      onClick={(e) => {
        e.stopPropagation();
        const muted = cnyAudio?.toggleMute() ?? false;
        setAudioMuted(muted);
      }}
      className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full flex items-center justify-center
                 transition-all duration-200 active:scale-90"
      style={{
        background: "rgba(255, 255, 255, 0.06)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(8px)",
      }}
      aria-label={audioMuted ? "Unmute" : "Mute"}
    >
      <span className="text-base">{audioMuted ? "🔇" : "🔊"}</span>
    </button>
  );

  // ==========================================
  // PHASE 1: ENVELOPE
  // ==========================================
  if (phase === "envelope") {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[85dvh] gap-5 cursor-pointer select-none relative"
        onClick={handleTap}
      >
        {muteButton}

        {/* Floating emoji background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {floatingEmojis.map((e, i) => (
            <div
              key={i}
              className="absolute emoji-float"
              style={{
                left: e.left,
                bottom: "-10%",
                fontSize: e.size,
                ["--float-delay" as string]: e.delay,
                ["--float-duration" as string]: e.duration,
              }}
            >
              {e.emoji}
            </div>
          ))}
        </div>

        {/* Greeting text above envelope */}
        <div className="text-center z-10 space-y-1">
          <p className="text-white/30 text-xs tracking-wider">Someone sent you a</p>
          <p className="font-display text-2xl text-shimmer tracking-wide">CNY Angpow! 🎊</p>
        </div>

        {/* Envelope — flippable */}
        <div className="relative envelope-hover">
          {/* Warm gold glow */}
          <div
            className="absolute -inset-4 rounded-[28px] opacity-40"
            style={{
              background: "radial-gradient(ellipse at center, rgba(255, 215, 0, 0.25) 0%, transparent 70%)",
              filter: "blur(20px)",
              animation: "envelopeBreathe 2.5s ease-in-out infinite",
            }}
          />

          <div className="flip-container w-[min(270px,72vw)] z-10">
            <div className={`flip-card aspect-[3/4] ${envelopeFlipped ? "flipped" : ""}`}>
              {/* ===== FRONT: Main envelope face ===== */}
              <div
                className="flip-front w-full h-full rounded-3xl relative overflow-hidden envelope-breathe"
                style={{
                  background: "linear-gradient(160deg, #E8243C 0%, #C41E3A 25%, #9B1B30 50%, #6B0F1A 100%)",
                }}
              >
                <div
                  className="absolute inset-0 holo-sheen"
                  style={{
                    background: "linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.08) 45%, rgba(255,248,220,0.08) 50%, rgba(255,215,0,0.04) 55%, transparent 70%)",
                    backgroundSize: "200% 200%",
                  }}
                />
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, transparent, #FFD700, transparent)" }} />
                <div className="absolute top-4 left-4 text-sm opacity-30" style={{ color: "#FFD700" }}>✦</div>
                <div className="absolute top-4 right-4 text-sm opacity-30" style={{ color: "#FFD700" }}>✦</div>
                <div className="absolute bottom-16 left-4 text-[10px] opacity-20" style={{ color: "#FFD700" }}>✦</div>
                <div className="absolute bottom-16 right-4 text-[10px] opacity-20" style={{ color: "#FFD700" }}>✦</div>
                <div className="absolute top-5 left-0 right-0 text-center">
                  <p className="text-[10px] tracking-[0.4em]" style={{ color: "rgba(255, 215, 0, 0.35)" }}>恭喜发财</p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute -inset-8 rounded-full" style={{ border: "1.5px solid rgba(255, 215, 0, 0.2)", animation: "pulseRing 2s ease-in-out infinite" }} />
                    <div className="absolute -inset-14 rounded-full" style={{ border: "1px solid rgba(255, 215, 0, 0.1)", animation: "pulseRing 2s ease-in-out 0.5s infinite" }} />
                    <span className="text-7xl font-bold block" style={{ color: "#FFD700", textShadow: "0 0 30px rgba(255, 215, 0, 0.7), 0 0 60px rgba(255, 215, 0, 0.3)", animation: "symbolPulse 2s ease-in-out infinite" }}>福</span>
                  </div>
                </div>
                <div className="absolute bottom-5 left-0 right-0 text-center">
                  <p className="text-[10px] tracking-[0.35em] uppercase" style={{ color: "rgba(255, 215, 0, 0.3)" }}>specially for</p>
                  <p className="font-display text-xl tracking-wider mt-1 text-shimmer">{name.toUpperCase()}</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, transparent, #FFD700, transparent)" }} />
              </div>

              {/* ===== BACK: Decorative CNY pattern ===== */}
              <div
                className="flip-back w-full h-full rounded-3xl relative overflow-hidden"
                style={{
                  background: "linear-gradient(160deg, #B91C2F 0%, #8B0000 40%, #6B0F1A 100%)",
                }}
              >
                {/* Gold border frame */}
                <div className="absolute inset-3 rounded-2xl" style={{ border: "1.5px solid rgba(255, 215, 0, 0.2)" }} />
                <div className="absolute inset-5 rounded-xl" style={{ border: "1px solid rgba(255, 215, 0, 0.1)" }} />

                {/* Corner knot motifs */}
                <div className="absolute top-6 left-6 text-lg" style={{ color: "rgba(255, 215, 0, 0.3)" }}>◇</div>
                <div className="absolute top-6 right-6 text-lg" style={{ color: "rgba(255, 215, 0, 0.3)" }}>◇</div>
                <div className="absolute bottom-6 left-6 text-lg" style={{ color: "rgba(255, 215, 0, 0.3)" }}>◇</div>
                <div className="absolute bottom-6 right-6 text-lg" style={{ color: "rgba(255, 215, 0, 0.3)" }}>◇</div>

                {/* Central decorative content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
                  {/* Decorative top ornament */}
                  <div className="text-xs tracking-[0.5em] mb-3" style={{ color: "rgba(255, 215, 0, 0.25)" }}>
                    ✦ ✦ ✦
                  </div>

                  {/* Vertical blessing characters */}
                  <div className="flex flex-col items-center gap-2 mb-4">
                    {["大", "吉", "大", "利"].map((char, i) => (
                      <span
                        key={i}
                        className="text-3xl font-bold block"
                        style={{
                          color: "#FFD700",
                          textShadow: "0 0 20px rgba(255, 215, 0, 0.5)",
                          opacity: 0.7,
                        }}
                      >
                        {char}
                      </span>
                    ))}
                  </div>

                  {/* Translation */}
                  <p className="text-[9px] tracking-[0.3em] uppercase" style={{ color: "rgba(255, 215, 0, 0.3)" }}>
                    great luck &amp; prosperity
                  </p>

                  {/* Bottom ornament */}
                  <div className="text-xs tracking-[0.5em] mt-3" style={{ color: "rgba(255, 215, 0, 0.25)" }}>
                    ✦ ✦ ✦
                  </div>
                </div>

                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                  backgroundImage: `repeating-linear-gradient(45deg, #FFD700 0px, #FFD700 1px, transparent 1px, transparent 12px),
                                    repeating-linear-gradient(-45deg, #FFD700 0px, #FFD700 1px, transparent 1px, transparent 12px)`,
                }} />

                {/* Top & bottom accent lines */}
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, transparent, #FFD700, transparent)" }} />
                <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, transparent, #FFD700, transparent)" }} />
              </div>
            </div>
          </div>
        </div>

        {/* TAP TO OPEN + FLIP BUTTON */}
        <div className="text-center space-y-3 z-10">
          <p className="font-display text-xl tracking-[0.3em] text-shimmer">
            TAP TO OPEN
          </p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-xl" style={{ animation: "tapBounce 1s ease-in-out infinite" }}>👆</span>
          </div>

          {/* Flip envelope button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              cnyAudio?.playFlip();
              setEnvelopeFlipped(!envelopeFlipped);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-display text-[10px] tracking-[0.15em]
                       transition-all duration-200 hover:scale-105 active:scale-95 mt-1"
            style={{
              background: "rgba(255, 215, 0, 0.06)",
              border: "1px solid rgba(255, 215, 0, 0.15)",
              color: "rgba(255, 215, 0, 0.45)",
            }}
          >
            <span className="inline-block transition-transform duration-300" style={{ transform: envelopeFlipped ? "rotateY(180deg)" : "none" }}>🔄</span>
            {envelopeFlipped ? "FLIP BACK" : "FLIP ENVELOPE"}
          </button>

          <p className="text-[10px] tracking-wider" style={{ color: "rgba(255, 215, 0, 0.2)" }}>
            恭喜发财 · gong xi fa cai
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // PHASE 2: OPENING - FORTUNE CRACKER TEAR
  // ==========================================
  if (phase === "opening") {
    return (
      <div className="flex items-center justify-center min-h-[85dvh] overflow-hidden relative">
        {muteButton}

        {/* Golden flash overlay */}
        <div className="fixed inset-0 z-50 pointer-events-none golden-flash" />

        {/* Container — shakes then tears */}
        <div className="relative tear-container w-[min(270px,72vw)] aspect-[3/4]">

          {/* Golden crack line in center */}
          <div
            className="absolute left-1/2 top-0 w-[3px] h-full z-20 pointer-events-none crack-glow-line"
            style={{
              background: "linear-gradient(180deg, transparent 2%, #FFD700 15%, #FFF8DC 45%, #FFD700 55%, #FFF8DC 85%, transparent 98%)",
              transformOrigin: "center top",
            }}
          />

          {/* Golden rays spinning out from the crack */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="golden-rays" />
          </div>

          {/* Left half of envelope — tears left */}
          <div
            className="absolute inset-0 tear-half-left"
            style={{ clipPath: TEAR_LEFT_CLIP }}
          >
            <div
              className="w-full h-full rounded-3xl relative overflow-hidden"
              style={{
                background: "linear-gradient(160deg, #E8243C 0%, #C41E3A 25%, #9B1B30 50%, #6B0F1A 100%)",
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.06) 45%, transparent 70%)",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="text-7xl font-bold"
                  style={{
                    color: "#FFD700",
                    textShadow: "0 0 20px rgba(255, 215, 0, 0.6)",
                  }}
                >
                  福
                </span>
              </div>
            </div>
          </div>

          {/* Right half of envelope — tears right */}
          <div
            className="absolute inset-0 tear-half-right"
            style={{ clipPath: TEAR_RIGHT_CLIP }}
          >
            <div
              className="w-full h-full rounded-3xl relative overflow-hidden"
              style={{
                background: "linear-gradient(160deg, #E8243C 0%, #C41E3A 25%, #9B1B30 50%, #6B0F1A 100%)",
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.06) 45%, transparent 70%)",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="text-7xl font-bold"
                  style={{
                    color: "#FFD700",
                    textShadow: "0 0 20px rgba(255, 215, 0, 0.6)",
                  }}
                >
                  福
                </span>
              </div>
            </div>
          </div>

          {/* 福 expanding from the crack */}
          <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
            <span
              className="text-8xl font-bold fu-crack-reveal"
              style={{ color: "#FFD700" }}
            >
              福
            </span>
          </div>

          {/* Gold sparks flying from the tear */}
          {tearSparks.map((spark, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 rounded-full tear-spark z-20"
              style={{
                width: spark.size,
                height: spark.size,
                background: "radial-gradient(circle, #FFF8DC, #FFD700)",
                boxShadow: "0 0 6px 2px rgba(255, 215, 0, 0.8)",
                ["--spark-x" as string]: `${spark.x}px`,
                ["--spark-y" as string]: `${spark.y}px`,
                ["--spark-delay" as string]: `${spark.delay}s`,
                ["--spark-duration" as string]: `${spark.duration}s`,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  // ==========================================
  // PHASE 3: REVEALED
  // ==========================================
  return (
    <div className="flex flex-col items-center gap-5 py-4">
      {muteButton}

      {/* Score announcement */}
      <div
        className="w-full text-center py-2 stagger-up"
        style={{ animationDelay: "0.05s" }}
      >
        <p className="text-[10px] tracking-[0.3em] font-display" style={{ color: "rgba(255, 77, 109, 0.5)" }}>
          AUNTIE&apos;S VERDICT
        </p>
      </div>

      {/* ===== FLIP CARD ===== */}
      <div className="flip-container w-full card-entrance" style={{ animationDelay: "0.1s" }}>
        <div className={`flip-card ${flipped ? "flipped" : ""}`}>
          {/* ===== FRONT: ROAST CARD ===== */}
          <div
            className="flip-front w-full rounded-3xl overflow-hidden relative"
            style={{
              background: "linear-gradient(170deg, rgba(15, 2, 6, 0.97) 0%, rgba(30, 5, 12, 0.98) 50%, rgba(10, 1, 4, 0.99) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              boxShadow: `0 8px 60px rgba(0,0,0,0.5), 0 0 30px ${scoreStyle.glow}`,
            }}
          >
            {/* Top accent — coral to gold gradient */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px] z-10"
              style={{
                background: "linear-gradient(90deg, #FF4D6D, #FFD700, #FF4D6D)",
              }}
            />

            {/* Header */}
            <div
              className="px-5 py-3 flex items-center justify-between"
              style={{
                borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
              }}
            >
              <span className="font-display text-[10px] tracking-[0.3em]" style={{ color: "rgba(255, 77, 109, 0.4)" }}>
                HUATORHURT
              </span>
              <span className="text-[10px] tracking-wider" style={{ color: "rgba(255, 255, 255, 0.15)" }}>
                🧧 angpow
              </span>
            </div>

            {/* Recipient name */}
            <div className="px-5 pt-3 pb-0">
              <p className="text-[10px] tracking-[0.2em] font-display" style={{ color: "rgba(255, 255, 255, 0.15)" }}>
                FOR
              </p>
              <p className="font-display text-lg tracking-wider text-shimmer mt-0.5">
                {name.toUpperCase()}
              </p>
            </div>

            {/* === SCORE SECTION === */}
            <div className="px-5 py-5 text-center">
              {/* Score number */}
              <div className="relative inline-block">
                <span
                  className={`font-display text-[60px] sm:text-[72px] leading-none bg-gradient-to-b ${scoreStyle.gradient} bg-clip-text`}
                  style={{
                    WebkitTextFillColor: "transparent",
                    filter: `drop-shadow(0 0 25px ${scoreStyle.glow})`,
                  }}
                >
                  {displayScore}
                </span>
              </div>

              {/* Score label */}
              <div className="flex items-center justify-center gap-2 mt-1">
                <span className="text-xl">{scoreLabel.emoji}</span>
                <p
                  className="font-display text-sm tracking-[0.2em]"
                  style={{ color: scoreStyle.label }}
                >
                  {scoreLabel.text}
                </p>
                <span className="text-xl">{scoreLabel.emoji}</span>
              </div>

              {/* Progress bar */}
              <div
                className="relative w-full h-3 rounded-full overflow-hidden mt-4"
                style={{
                  background: "rgba(255,255,255,0.04)",
                }}
              >
                <div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    width: `${energyScore}%`,
                    background: scoreStyle.bar,
                    animation: "barFill 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
                    boxShadow: `0 0 12px ${scoreStyle.glow}`,
                  }}
                />
              </div>
              <p className="text-[10px] mt-1.5 font-display tracking-widest" style={{ color: "rgba(255,255,255,0.15)" }}>
                AUNTIE RATES YOU {energyScore}/100
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 px-5">
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.04)" }} />
              <span className="text-[10px]" style={{ color: "rgba(255,77,109,0.3)" }}>🔥</span>
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.04)" }} />
            </div>

            {/* Aunty + Roast message */}
            <div className="px-5 py-5 space-y-4">
              {/* Small aunty */}
              <div className="flex justify-center roast-entrance" style={{ animationDelay: "0.3s" }}>
                <AuntyAvatar size="small" showBubble={false} />
              </div>

              <div
                className="relative rounded-2xl px-5 py-5 roast-entrance"
                style={{
                  background: "rgba(255, 77, 109, 0.06)",
                  border: "1px solid rgba(255, 77, 109, 0.12)",
                  animationDelay: "0.4s",
                }}
              >
                {/* Decorative quote mark */}
                <span
                  className="absolute top-1 left-3.5 text-3xl leading-none pointer-events-none select-none"
                  style={{ color: "rgba(255, 77, 109, 0.12)", fontFamily: "Georgia, serif" }}
                >
                  &ldquo;
                </span>
                <div className="text-[15px] font-medium leading-relaxed text-center relative z-10" style={{ color: "rgba(255, 248, 231, 0.9)" }}>
                  {roastMessage.split("\n\n").map((part, i) => (
                    <p key={i} className={i > 0 ? "mt-3 text-[13px] font-normal" : ""} style={i > 0 ? { color: "rgba(255, 215, 0, 0.45)" } : undefined}>
                      {part}
                    </p>
                  ))}
                </div>
              </div>

              {/* Blessing */}
              <p
                className="text-center text-xs italic leading-relaxed blessing-entrance"
                style={{ color: "rgba(255, 215, 0, 0.35)" }}
              >
                &ldquo;{blessing}&rdquo;
              </p>
            </div>

            {/* Footer */}
            <div
              className="px-5 py-2.5 flex items-center justify-between"
              style={{
                borderTop: "1px solid rgba(255, 255, 255, 0.03)",
              }}
            >
              <span className="text-[8px] font-display tracking-[0.2em]" style={{ color: "rgba(255, 77, 109, 0.2)" }}>
                HUATORHURT&trade;
              </span>
              <span className="text-[8px] tracking-wider" style={{ color: "rgba(255,255,255,0.1)" }}>
                no refunds lol
              </span>
            </div>

            {/* Bottom accent */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[2px]"
              style={{
                background: "linear-gradient(90deg, #FFD700, #FF4D6D, #FFD700)",
              }}
            />
          </div>

          {/* ===== BACK: SECRET MESSAGE ===== */}
          <div
            className="flip-back w-full rounded-3xl overflow-hidden flex flex-col items-center justify-center relative"
            style={{
              background: "linear-gradient(170deg, rgba(15, 2, 6, 0.97) 0%, rgba(30, 5, 12, 0.98) 50%, rgba(10, 1, 4, 0.99) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              boxShadow: "0 8px 60px rgba(0,0,0,0.5), 0 0 30px rgba(255, 77, 109, 0.15)",
            }}
          >
            {/* Top accent */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px] z-10"
              style={{
                background: "linear-gradient(90deg, #FFD700, #FF4D6D, #FFD700)",
              }}
            />

            <div className="px-6 py-10 text-center space-y-6 w-full">
              <div className="space-y-3">
                <span className="text-3xl">🤫</span>
                <p className="font-display text-base tracking-[0.3em]" style={{ color: "rgba(255, 77, 109, 0.5)" }}>
                  SECRET NOTE
                </p>
                <div className="mx-auto w-12 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255, 77, 109, 0.2), transparent)" }} />
              </div>

              {hasSecret ? (
                <div
                  className="rounded-2xl px-5 py-5"
                  style={{
                    background: "rgba(255, 77, 109, 0.04)",
                    border: "1px solid rgba(255, 77, 109, 0.08)",
                  }}
                >
                  <p className="text-[15px] leading-relaxed italic" style={{ color: "rgba(255, 248, 231, 0.85)" }}>
                    &ldquo;{secretMessage}&rdquo;
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm italic" style={{ color: "rgba(255, 255, 255, 0.2)" }}>
                    No secret message was left.
                  </p>
                  <p className="text-xs" style={{ color: "rgba(255, 255, 255, 0.1)" }}>
                    Just pure, unfiltered roast. 💀
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <div className="mx-auto w-12 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.15), transparent)" }} />
                <p className="text-[9px] font-display tracking-[0.2em]" style={{ color: "rgba(255, 215, 0, 0.2)" }}>
                  恭喜发财 · HAPPY CNY 🧧
                </p>
              </div>
            </div>

            {/* Bottom accent */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[2px]"
              style={{
                background: "linear-gradient(90deg, #FF4D6D, #FFD700, #FF4D6D)",
              }}
            />
          </div>
        </div>
      </div>

      {/* ===== FLIP BUTTON ===== */}
      <button
        onClick={() => { cnyAudio?.playFlip(); setFlipped(!flipped); }}
        className="stagger-up w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl font-display text-sm tracking-[0.15em]
                   transition-all duration-200 hover:scale-[1.02] active:scale-[0.96]"
        style={{
          animationDelay: "0.35s",
          background: flipped
            ? "linear-gradient(135deg, rgba(255, 77, 109, 0.15) 0%, rgba(255, 77, 109, 0.08) 100%)"
            : "linear-gradient(135deg, rgba(255, 215, 0, 0.12) 0%, rgba(255, 77, 109, 0.08) 100%)",
          border: flipped
            ? "1.5px solid rgba(255, 77, 109, 0.3)"
            : "1.5px solid rgba(255, 215, 0, 0.25)",
          color: flipped ? "#FF8FA3" : "#FFD700",
          boxShadow: flipped
            ? "0 0 20px rgba(255, 77, 109, 0.15)"
            : "0 0 20px rgba(255, 215, 0, 0.1)",
        }}
      >
        <span className="text-lg">
          {flipped ? "↩️" : "🤫"}
        </span>
        {flipped ? "BACK TO ROAST" : "SEE SECRET NOTE"}
        <span className="text-lg">
          {flipped ? "" : "→"}
        </span>
      </button>

      {/* ===== ACTION BUTTON ===== */}
      <div className="w-full stagger-up" style={{ animationDelay: "0.45s" }}>
        <Link
          href="/"
          className="block w-full py-4 rounded-2xl font-display text-base tracking-[0.15em] text-center
                     hover:scale-[1.02] active:scale-[0.96]
                     transition-all duration-200"
          style={{
            background: "linear-gradient(135deg, #FF4D6D 0%, #FF8FA3 40%, #FF4D6D 70%, #E6375A 100%)",
            color: "#fff",
            boxShadow: "0 4px 25px rgba(255, 77, 109, 0.3)",
          }}
        >
          ROAST SOMEONE ELSE 🔥
        </Link>
      </div>
    </div>
  );
}
