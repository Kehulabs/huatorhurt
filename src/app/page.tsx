"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import AuntyAvatar from "@/components/AuntyAvatar";

const RELATIONSHIPS = [
  { label: "Friend", icon: "👯", sub: "the chosen family" },
  { label: "Sibling", icon: "👊", sub: "blood-bound rival" },
  { label: "Colleague", icon: "💼", sub: "9-to-5 survivor" },
  { label: "Parents", icon: "🫡", sub: "the OG investors" },
  { label: "Cousin", icon: "🤝", sub: "CNY benchmarking partner" },
  { label: "Relatives", icon: "🏠", sub: "see once a year, judged all year" },
  { label: "Boss (IF YOU DARE)", icon: "💀", sub: "career-ending move", danger: true },
  { label: "Your Partner", icon: "❤️‍🔥", sub: "love language: roast" },
];

const LIFE_STATUSES = [
  { label: "Single", icon: "🙃", sub: "saving money, apparently" },
  { label: "Dating", icon: "💕", sub: "spending money, definitely" },
  { label: "Married", icon: "💍", sub: "sharing money, reluctantly" },
  { label: "Hustling", icon: "🔥", sub: "no money, big dreams" },
  { label: "Student", icon: "📚", sub: "negative money, positive vibes" },
  { label: "It's Complicated", icon: "🌀", sub: "money can't fix this" },
];

const LOADING_MESSAGES = [
  "Consulting the 财神...",
  "Calculating roast intensity...",
  "Measuring audacity levels...",
  "Cross-referencing with auntie database...",
  "Calibrating emotional damage...",
];

export default function Home() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(true);
  const [form, setForm] = useState({
    name: "",
    age: 25,
    relationship: "",
    lifeStatus: "",
    secretMessage: "",
  });
  const [loadingMsg, setLoadingMsg] = useState(0);
  const [error, setError] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const holdTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((nextStep: number) => {
    setVisible(false);
    setTimeout(() => {
      setStep(nextStep);
      setVisible(true);
    }, 250);
  }, []);

  useEffect(() => {
    if (step === 1 && nameInputRef.current) {
      setTimeout(() => nameInputRef.current?.focus(), 300);
    }
  }, [step]);

  useEffect(() => {
    if (step === 5) {
      setTimeout(() => {
        document.getElementById("secret-msg")?.focus();
      }, 300);
    }
  }, [step]);

  useEffect(() => {
    if (step !== 6) return;
    const interval = setInterval(() => {
      setLoadingMsg((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [step]);

  useEffect(() => {
    if (step !== 6) return;
    let cancelled = false;

    async function submit() {
      try {
        const res = await fetch("/api/angbao", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name.trim(),
            age: form.age,
            relationship: form.relationship,
            lifeStatus: form.lifeStatus,
            secretMessage: form.secretMessage,
          }),
        });
        if (!res.ok) throw new Error("fail");
        const data = await res.json();
        if (!cancelled) {
          setShareUrl(`${window.location.origin}/open/${data.id}`);
          goTo(7);
        }
      } catch {
        if (!cancelled) {
          setError(true);
          setTimeout(() => goTo(0), 2000);
        }
      }
    }

    const delay = setTimeout(submit, 2500);
    return () => {
      cancelled = true;
      clearTimeout(delay);
    };
  }, [step, form, router, goTo]);

  const startHold = (direction: 1 | -1) => {
    holdTimer.current = setInterval(() => {
      setForm((f) => ({ ...f, age: Math.max(1, Math.min(150, f.age + direction)) }));
    }, 100);
  };
  const stopHold = () => {
    if (holdTimer.current) {
      clearInterval(holdTimer.current);
      holdTimer.current = null;
    }
  };

  const transitionClass = visible
    ? "opacity-100 translate-y-0 scale-100"
    : "opacity-0 translate-y-4 scale-[0.98]";

  return (
    <div className="relative min-h-[85vh] flex flex-col">
      {/* ===== PROGRESS DOTS ===== */}
      {step >= 1 && step <= 5 && (
        <div className="flex items-center justify-center gap-2 pt-4 pb-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className="transition-all duration-300 rounded-full"
              style={{
                width: step === s ? 24 : 6,
                height: 6,
                background:
                  step === s
                    ? "linear-gradient(90deg, #FF4D6D, #FFD700)"
                    : step > s
                      ? "rgba(255, 77, 109, 0.5)"
                      : "rgba(255, 255, 255, 0.1)",
                boxShadow: step === s ? "0 0 12px rgba(255, 77, 109, 0.4)" : "none",
              }}
            />
          ))}
        </div>
      )}

      {/* ===== BACK BUTTON ===== */}
      {step >= 1 && step <= 5 && (
        <button
          onClick={() => goTo(step - 1)}
          className="absolute top-4 left-0 text-white/25 hover:text-white/50
                     transition-colors text-sm flex items-center gap-1.5 z-10"
        >
          <span className="text-base leading-none">&larr;</span>
          <span className="text-[11px] font-medium tracking-wider">BACK</span>
        </button>
      )}

      {/* ===== STEP CONTENT ===== */}
      <div
        className={`flex-1 flex flex-col items-center justify-center transition-all duration-300 ease-out ${transitionClass}`}
      >
        {/* ========== STEP 0: LANDING ========== */}
        {step === 0 && (
          <div className="text-center px-4 w-full">
            {/* Brand hero */}
            <div className="space-y-5 mb-8">
              {/* Aunty character */}
              <div className="mb-1 pt-4">
                <AuntyAvatar size="large" showBubble={true} />
              </div>

              {/* Brand name — typographic hero with split treatment */}
              <div className="relative">
                <div className="flex items-center justify-center gap-3">
                  <span className="font-display text-shimmer text-[56px] leading-[0.85] tracking-tight">
                    HUAT
                  </span>
                  <span className="brand-or">OR</span>
                  <span className="font-display text-shimmer-coral text-[56px] leading-[0.85] tracking-tight">
                    HURT
                  </span>
                </div>
                <p
                  className="font-display text-sm tracking-[0.5em] mt-3"
                  style={{ color: "rgba(255, 255, 255, 0.2)" }}
                >
                  ANGPOWS
                </p>
              </div>

              {/* Tagline */}
              <p className="text-white/40 text-sm leading-relaxed max-w-[280px] mx-auto">
                No money inside. Just{" "}
                <span style={{ color: "#FF4D6D" }}>emotional damage</span>{" "}
                wrapped in a red packet.
              </p>
            </div>

            {/* CTA */}
            <div className="space-y-4">
              <button
                onClick={() => goTo(1)}
                className="font-display text-lg tracking-[0.15em] w-full py-4 rounded-2xl
                           hover:scale-[1.02] active:scale-[0.97] transition-all duration-200"
                style={{
                  background: "linear-gradient(135deg, #FFD700 0%, #FFF1A8 30%, #FFD700 60%, #DAA520 100%)",
                  color: "#3D0C00",
                  boxShadow: "0 6px 30px rgba(255, 215, 0, 0.25), 0 2px 8px rgba(0, 0, 0, 0.3)",
                }}
              >
                START ROASTING 🔥
              </button>

              <p className="text-white/15 text-[10px] tracking-[0.2em]">
                FREE · NO SIGNUP · JUST CHAOS
              </p>
            </div>
          </div>
        )}

        {/* ========== STEP 1: NAME ========== */}
        {step === 1 && (
          <div className="text-center space-y-8 w-full px-4">
            <div className="space-y-2">
              <p className="text-[11px] tracking-[0.3em] font-medium" style={{ color: "rgba(255, 77, 109, 0.6)" }}>
                STEP 1 OF 5
              </p>
              <h2 className="font-display text-white text-[32px] leading-tight tracking-tight">
                Who&apos;s getting{" "}
                <span className="text-shimmer-coral">roasted?</span>
              </h2>
            </div>

            <div className="relative">
              <input
                ref={nameInputRef}
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && form.name.trim()) goTo(2);
                }}
                placeholder="Type their name..."
                maxLength={50}
                className="w-full text-center text-2xl font-medium py-4 rounded-2xl
                           text-white placeholder:text-white/15
                           focus:outline-none focus:ring-2 focus:ring-[#FF4D6D]/30
                           transition-all duration-200"
                style={{
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              />
            </div>

            <button
              onClick={() => form.name.trim() && goTo(2)}
              disabled={!form.name.trim()}
              className={`font-display text-base tracking-[0.15em] w-full py-3.5 rounded-2xl
                          transition-all duration-300
                ${
                  form.name.trim()
                    ? "hover:scale-[1.02] active:scale-[0.97]"
                    : "cursor-not-allowed"
                }`}
              style={{
                background: form.name.trim()
                  ? "linear-gradient(135deg, #FFD700 0%, #FFF1A8 30%, #FFD700 60%, #DAA520 100%)"
                  : "rgba(255, 255, 255, 0.04)",
                color: form.name.trim() ? "#3D0C00" : "rgba(255, 255, 255, 0.1)",
                boxShadow: form.name.trim()
                  ? "0 4px 20px rgba(255, 215, 0, 0.2)"
                  : "none",
              }}
            >
              NEXT
            </button>
          </div>
        )}

        {/* ========== STEP 2: AGE ========== */}
        {step === 2 && (
          <div className="text-center space-y-8 w-full px-4">
            <div className="space-y-2">
              <p className="text-[11px] tracking-[0.3em] font-medium" style={{ color: "rgba(255, 77, 109, 0.6)" }}>
                STEP 2 OF 5
              </p>
              <h2 className="font-display text-white text-[32px] leading-tight tracking-tight">
                How old is{" "}
                <span className="text-shimmer">{form.name}?</span>
              </h2>
            </div>

            <div className="flex items-center justify-center gap-5">
              <button
                onClick={() => setForm({ ...form, age: Math.max(1, form.age - 1) })}
                onMouseDown={() => startHold(-1)}
                onMouseUp={stopHold}
                onMouseLeave={stopHold}
                onTouchStart={() => startHold(-1)}
                onTouchEnd={stopHold}
                className="w-14 h-14 rounded-2xl text-2xl text-white/50
                           hover:text-white/80 hover:scale-110 active:scale-90 transition-all duration-150
                           flex items-center justify-center select-none font-medium"
                style={{
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                −
              </button>

              <div
                className="w-28 h-28 rounded-3xl flex items-center justify-center relative"
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "2px solid rgba(255, 215, 0, 0.15)",
                  boxShadow: "0 0 40px rgba(255, 215, 0, 0.06), inset 0 0 30px rgba(0, 0, 0, 0.2)",
                }}
              >
                <span
                  className="font-display text-6xl text-shimmer leading-none"
                >
                  {form.age}
                </span>
              </div>

              <button
                onClick={() => setForm({ ...form, age: Math.min(150, form.age + 1) })}
                onMouseDown={() => startHold(1)}
                onMouseUp={stopHold}
                onMouseLeave={stopHold}
                onTouchStart={() => startHold(1)}
                onTouchEnd={stopHold}
                className="w-14 h-14 rounded-2xl text-2xl text-white/50
                           hover:text-white/80 hover:scale-110 active:scale-90 transition-all duration-150
                           flex items-center justify-center select-none font-medium"
                style={{
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                +
              </button>
            </div>

            <p className="text-white/20 text-xs">Hold to change faster</p>

            <button
              onClick={() => goTo(3)}
              className="font-display text-base tracking-[0.15em] w-full py-3.5 rounded-2xl
                         hover:scale-[1.02] active:scale-[0.97] transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #FFD700 0%, #FFF1A8 30%, #FFD700 60%, #DAA520 100%)",
                color: "#3D0C00",
                boxShadow: "0 4px 20px rgba(255, 215, 0, 0.2)",
              }}
            >
              NEXT
            </button>
          </div>
        )}

        {/* ========== STEP 3: RELATIONSHIP ========== */}
        {step === 3 && (
          <div className="text-center space-y-6 w-full px-2">
            <div className="space-y-2">
              <p className="text-[11px] tracking-[0.3em] font-medium" style={{ color: "rgba(255, 77, 109, 0.6)" }}>
                STEP 3 OF 5
              </p>
              <h2 className="font-display text-white text-[28px] leading-tight tracking-tight">
                They are your...
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {RELATIONSHIPS.map((rel) => (
                <button
                  key={rel.label}
                  onClick={() => {
                    setForm({ ...form, relationship: rel.label });
                    setTimeout(() => goTo(4), 200);
                  }}
                  className={`chip-press chip-card flex flex-col items-center gap-1.5 px-3 py-4 rounded-2xl
                              transition-all duration-200 text-center group
                    ${
                      form.relationship === rel.label
                        ? rel.danger
                          ? "ring-2 ring-red-500/50"
                          : "ring-2 ring-[#FF4D6D]/40"
                        : ""
                    }`}
                  style={{
                    background: rel.danger
                      ? "rgba(127, 29, 29, 0.3)"
                      : "rgba(255, 255, 255, 0.03)",
                    border: `1px solid ${
                      rel.danger
                        ? "rgba(239, 68, 68, 0.15)"
                        : "rgba(255, 255, 255, 0.06)"
                    }`,
                  }}
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                    {rel.icon}
                  </span>
                  <span
                    className={`font-display text-xs tracking-wider ${
                      rel.danger ? "text-red-300/90" : "text-white/70"
                    }`}
                  >
                    {rel.label.toUpperCase()}
                  </span>
                  <span
                    className={`text-[10px] leading-tight font-light ${
                      rel.danger ? "text-red-400/35" : "text-white/20"
                    }`}
                  >
                    {rel.sub}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ========== STEP 4: LIFE STATUS ========== */}
        {step === 4 && (
          <div className="text-center space-y-6 w-full px-2">
            <div className="space-y-2">
              <p className="text-[11px] tracking-[0.3em] font-medium" style={{ color: "rgba(255, 77, 109, 0.6)" }}>
                STEP 4 OF 5
              </p>
              <h2 className="font-display text-white text-[28px] leading-tight tracking-tight">
                <span className="text-shimmer">{form.name}</span> is currently...
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {LIFE_STATUSES.map((status) => (
                <button
                  key={status.label}
                  onClick={() => {
                    setForm({ ...form, lifeStatus: status.label });
                    setTimeout(() => goTo(5), 200);
                  }}
                  className={`chip-press chip-card flex flex-col items-center gap-1.5 px-3 py-4 rounded-2xl
                              transition-all duration-200 text-center group
                    ${
                      form.lifeStatus === status.label
                        ? "ring-2 ring-[#FF4D6D]/40"
                        : ""
                    }`}
                  style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                  }}
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                    {status.icon}
                  </span>
                  <span className="font-display text-xs tracking-wider text-white/70">
                    {status.label.toUpperCase()}
                  </span>
                  <span className="text-[10px] text-white/20 leading-tight font-light">
                    {status.sub}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ========== STEP 5: SECRET MESSAGE ========== */}
        {step === 5 && (
          <div className="text-center space-y-6 w-full px-4">
            <div className="space-y-2">
              <p className="text-[11px] tracking-[0.3em] font-medium" style={{ color: "rgba(255, 77, 109, 0.6)" }}>
                STEP 5 OF 5
              </p>
              <h2 className="font-display text-white text-[28px] leading-tight tracking-tight">
                Leave a{" "}
                <span className="text-shimmer">secret note</span>
              </h2>
              <p className="text-white/30 text-xs font-light">
                Hidden behind the roast card — they&apos;ll have to find it
              </p>
            </div>

            <div className="relative">
              <textarea
                id="secret-msg"
                value={form.secretMessage}
                onChange={(e) => {
                  const words = e.target.value.split(/\s+/).filter(Boolean);
                  if (words.length <= 50) {
                    setForm({ ...form, secretMessage: e.target.value });
                  }
                }}
                placeholder="Write something nice... or don't"
                rows={4}
                className="w-full text-center text-base py-4 px-4 rounded-2xl resize-none
                           text-white placeholder:text-white/15
                           focus:outline-none focus:ring-2 focus:ring-[#FF4D6D]/25
                           transition-all duration-200"
                style={{
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              />
              <p className="text-white/15 text-[10px] mt-2 text-right">
                {form.secretMessage.split(/\s+/).filter(Boolean).length}/50 words
              </p>
            </div>

            <button
              onClick={() => goTo(6)}
              className="font-display text-base tracking-[0.15em] w-full py-3.5 rounded-2xl
                         hover:scale-[1.02] active:scale-[0.97] transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #FFD700 0%, #FFF1A8 30%, #FFD700 60%, #DAA520 100%)",
                color: "#3D0C00",
                boxShadow: "0 4px 20px rgba(255, 215, 0, 0.2)",
              }}
            >
              {form.secretMessage.trim() ? "SEND IT 🧧" : "SKIP & SEND 🧧"}
            </button>
          </div>
        )}

        {/* ========== STEP 6: GENERATING ========== */}
        {step === 6 && (
          <div className="text-center space-y-8 px-4">
            <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full pulse-ring-expand" style={{ border: "1.5px solid rgba(255, 77, 109, 0.25)" }} />
              <div className="absolute inset-0 rounded-full pulse-ring-expand" style={{ border: "1.5px solid rgba(255, 215, 0, 0.15)", animationDelay: "0.5s" }} />
              <div
                className="text-6xl"
                style={{
                  animation: "wobble 1s ease-in-out infinite",
                  filter: "drop-shadow(0 0 20px rgba(255, 215, 0, 0.3))",
                }}
              >
                🧧
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="font-display text-white text-xl tracking-tight">
                {error ? "Something went wrong" : LOADING_MESSAGES[loadingMsg]}
              </h2>

              {!error && (
                <div className="flex justify-center gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background: "#FF4D6D",
                        animation: `tapBounce 0.8s ease-in-out ${i * 0.15}s infinite`,
                      }}
                    />
                  ))}
                </div>
              )}

              {error && (
                <p className="text-white/30 text-sm">Redirecting back...</p>
              )}
            </div>

            {!error && (
              <div
                className="rounded-xl px-4 py-2.5 mx-auto inline-flex items-center gap-2"
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                }}
              >
                <span className="text-white/20 text-[10px] tracking-wider font-medium">TARGET</span>
                <span className="text-white/50 text-[10px]">·</span>
                <span className="text-white/50 text-sm">
                  {form.name}, {form.age} · {form.lifeStatus}
                </span>
              </div>
            )}
          </div>
        )}

        {/* ========== STEP 7: SHARE LINK ========== */}
        {step === 7 && (
          <div className="text-center px-4 w-full">
            {/* Success state */}
            <div className="space-y-5 mb-8">
              <div className="check-pop text-5xl">🧧</div>
              <div>
                <h2 className="font-display text-white text-[28px] tracking-tight">
                  Angpow <span className="text-shimmer">ready</span>
                </h2>
                <p className="text-white/35 text-sm mt-2">
                  Send this to <span className="font-semibold" style={{ color: "#FF4D6D" }}>{form.name}</span> and watch them suffer
                </p>
              </div>
            </div>

            {/* Link box */}
            <div
              className="rounded-2xl px-4 py-3.5 flex items-center gap-3 mb-6"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
              }}
            >
              <p className="text-white/40 text-xs truncate flex-1 text-left font-light">
                {shareUrl}
              </p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="font-display text-[11px] tracking-wider px-4 py-2 rounded-lg shrink-0
                           transition-all duration-200 active:scale-95"
                style={{
                  background: copied
                    ? "rgba(34, 197, 94, 0.2)"
                    : "rgba(255, 215, 0, 0.12)",
                  color: copied ? "#4ade80" : "#FFD700",
                  border: `1px solid ${copied ? "rgba(34, 197, 94, 0.3)" : "rgba(255, 215, 0, 0.2)"}`,
                }}
              >
                {copied ? "COPIED ✓" : "COPY"}
              </button>
            </div>

            {/* Share + Roast another */}
            <div className="space-y-3">
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: `${form.name}, you received a CNY Angpow! 🧧`,
                      text: `Hey ${form.name}! Someone sent you a special CNY angpow 🧧 Open it to see what's inside!`,
                      url: shareUrl,
                    }).catch(() => {});
                  } else {
                    navigator.clipboard.writeText(shareUrl);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }
                }}
                className="font-display text-base tracking-[0.15em] w-full py-4 rounded-2xl
                           hover:scale-[1.02] active:scale-[0.97] transition-all duration-200"
                style={{
                  background: "linear-gradient(135deg, #FF4D6D 0%, #FF8FA3 40%, #FF4D6D 70%, #E6375A 100%)",
                  color: "#fff",
                  boxShadow: "0 4px 25px rgba(255, 77, 109, 0.3)",
                }}
              >
                SHARE IT 🔥
              </button>

              <button
                onClick={() => {
                  setForm({ name: "", age: 25, relationship: "", lifeStatus: "", secretMessage: "" });
                  setShareUrl("");
                  setCopied(false);
                  goTo(0);
                }}
                className="w-full py-3 text-white/25 text-xs font-display tracking-[0.15em]
                           hover:text-white/40 transition-colors"
              >
                ROAST SOMEONE ELSE →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
